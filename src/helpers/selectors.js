export default function getAppointmentsForDay(state, day) {
  
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
    return appointmentIDs.includes(appointmentObj.id)
  })

  return output;
}
