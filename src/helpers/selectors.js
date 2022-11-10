// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1, 2]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [1, 2]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

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
