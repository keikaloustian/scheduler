import React from "react";
import 'components/InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";


// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];


export default function InterviewerList(props) {
  
  // Interviewer data currently received as prop (to later come from API)
  const interviewersArray = props.interviewers.map((interviewerObj) => {
    return (
      <InterviewerListItem
        name={interviewerObj.name}
        avatar={interviewerObj.avatar}
        key={interviewerObj.id}
        setInterviewer={() => props.setInterviewer(interviewerObj.id)}
        selected={props.interviewer === interviewerObj.id}
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