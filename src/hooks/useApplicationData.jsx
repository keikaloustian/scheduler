import { useState, useEffect } from "react";
import axios from 'axios';
// import { getSpotsForDay } from "helpers/selectors";

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
  // const freeSpots = getSpotsForDay(state, state.day);

  // const weekdayIndex = {
  //   'Monday': 0,
  //   'Tuesday': 1,
  //   'Wednesday': 2,
  //   'Thursday': 3,
  //   'Friday': 4
  // }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        setState({ ...state, appointments });
        // console.log(state);
      })
      // .then(() => {
      //   const currentDayIndex = weekdayIndex[state.day];
      //   const dayObj = {
      //     ...state.days[currentDayIndex],
      //     spots: getSpotsForDay(state, state.day)
      //   }
      //   console.log(dayObj)

      //   const daysArray = [ ...state.days];
      //   daysArray.splice(currentDayIndex, 1, dayObj);

      //   setState(prev => {
      //     return {
      //       ...prev,
      //       days: daysArray
      //     }
      //   })
      // })
  }

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        setState({ ...state, appointments });
      })
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}