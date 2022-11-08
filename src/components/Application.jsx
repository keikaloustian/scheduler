import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });






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
    .then(response =>  {
      setState({ ...state, appointments });
    })
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
  




  const appointments = getAppointmentsForDay(state, state.day);
  
  const appointmentsArray = appointments.map((appointmentObj) => {
    const interview = getInterview(state, appointmentObj.interview);
    const interviewers = getInterviewersForDay(state, state.day)

    return <Appointment
      key={appointmentObj.id}
      id={appointmentObj.id}
      time={appointmentObj.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  })




  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
        days={state.days}
        value={state.day}
        onChange={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
