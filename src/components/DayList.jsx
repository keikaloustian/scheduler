import React from 'react';
import DayListItem from './DayListItem';


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


export default function DayList(props) {

  const daysParsed = props.days.map((dayObj) => {
    return <DayListItem
      key={dayObj.id}
      name={dayObj.name}
      spots={dayObj.spots}
      selected={props.selected === dayObj.name}
      setDay={props.setDay}
    />
  });

  return (
    <ul>
      {daysParsed}
    </ul>
  );
}