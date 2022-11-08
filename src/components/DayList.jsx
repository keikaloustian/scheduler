import React from 'react';
import DayListItem from './DayListItem';


export default function DayList(props) {

  const daysArray = props.days.map((dayObj) => {
    return <DayListItem
      key={dayObj.id}
      name={dayObj.name}
      spots={dayObj.spots}
      selected={props.value === dayObj.name}
      setDay={() => props.onChange(dayObj.name)}
    />
  });

  return (
    <ul>
      {daysArray}
    </ul>
  );
}