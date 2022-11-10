import React from 'react';
import classNames from 'classnames';
import "components/DayListItem.scss";


export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  })

  const formatSpots = (numSpots) => {
    if (numSpots === 0) {
      return <h3>no spots remaining</h3>;
    }
    if (numSpots === 1) {
      return <h3>{numSpots} spot remaining</h3>;
    }
    if (numSpots > 1) {
      return <h3>{numSpots} spots remaining</h3>;
    }
  }

  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2>{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
}