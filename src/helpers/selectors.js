export function getAppointmentsForDay(state, day) {
  if (!state.days.length) {
    return [];
  }

  let appointmentIDs = [];
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      appointmentIDs = eachDay.appointments;
    }
  }

  const appointmentsArray = Object.values(state.appointments);

  let output = appointmentsArray.filter((appointmentObj) => {
    return appointmentIDs.includes(appointmentObj.id);
  });

  return output;
}

export function updateSpotsInDays(state, day) {
  const appointments = getAppointmentsForDay(state, day);
  let numSpots = 0;
  for (let appointment of appointments) {
    if (!appointment.interview) {
      numSpots++;
    }
  }

  const weekdayIndices = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday': 3,
    'Friday': 4
  }
  const dayIndex = weekdayIndices[day]; 

  const newDay = {
    ...state.days[dayIndex],
    spots: numSpots
  };

  const newDays = state.days.map((dayObj) => {
    if (dayObj.name === state.day) {
      return newDay;
    } else {
      return dayObj;
    }
  });

  return newDays;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;

  const interviewer = state.interviewers[interviewerID];

  return { ...interview, interviewer };
}

export function getInterviewersForDay(state, day) {
  if (!state.days.length) {
    return [];
  }

  let interviewerIDs = [];
  for (let eachDay of state.days) {
    if (eachDay.name === day) {
      interviewerIDs = eachDay.interviewers;
    }
  }

  const interviewersArray = Object.values(state.interviewers);

  let output = interviewersArray.filter((interviewerObj) => {
    return interviewerIDs.includes(interviewerObj.id);
  });

  return output;
}
