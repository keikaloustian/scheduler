import { useState, useEffect } from "react";
import axios from 'axios';
import { getAppointmentsForDay, updateSpotsInDays } from "helpers/selectors";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

    useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      
      setState(prev => ({
        ...prev,
        days,
        appointments,
        interviewers,
      }))
    })
  }, [])


  const setDay = (day) => setState({ ...state, day });



  function bookInterview(id, interview) {

    // Update appointments and capture in temporary state object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const intermediateState = {
      ...state,
      appointments
    }

    // Determine no. of spots and obtain updated days array
    const newDays = updateSpotsInDays(intermediateState, intermediateState.day);

    const updatedState = { ...intermediateState, days: newDays };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        setState(updatedState);
      })
    
  }

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {

        // Update appointments and capture in temporary state object
        const appointment = {
          ...state.appointments[id],
          interview: null,
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        const intermediateState = {
          ...state,
          appointments,
        };

        // Determine no. of spots and obtain updated days array
        const newDays = updateSpotsInDays(
          intermediateState,
          intermediateState.day
        );

        const updatedState = { ...intermediateState, days: newDays };
        setState(updatedState);
      })
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}