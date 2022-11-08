import React from "react";
import 'components/InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';


function InterviewerList(props) {
  
  const interviewersArray = props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        key={interviewerObj.id}
        selected={props.value === interviewerObj.id}
        setInterviewer={() => props.onChange(interviewerObj.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersArray}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};



export default InterviewerList;