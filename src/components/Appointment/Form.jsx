import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [nameError, setNameError] = useState('');
  const [interviewerError, setInterviewerError] = useState('');

  const reset = () => {
    setStudent('');
    setInterviewer('null');
  };

  const cancel = () => {
    reset();
    props.onCancel(); 
    setNameError('');
    setInterviewerError('');
  }

  function validate() {
    if (student === "") {
      setNameError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setInterviewerError("Please select an interviewer");
      return;
    }

    props.onSave(student, interviewer);
    setNameError('');
    setInterviewerError('');
  } 


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()} >
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        { nameError && <section className="appointment__validation">{nameError}</section> }
        { interviewerError && <section className="appointment__validation">{interviewerError}</section> }
        <InterviewerList
          onChange={setInterviewer}
          value={interviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};