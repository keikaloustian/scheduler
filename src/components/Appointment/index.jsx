import React from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
  }

  function confirmDeletion() {
    transition(CONFIRM);
  }

  function deleteAppointment() {
    
    transition(DELETING);

    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
  }

  function edit() {
    transition(EDIT);
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDeletion}
          onEdit={edit}
        />
      )}

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      }

      {mode === SAVING && 
        <Status
          message={'Saving...'}
        />
      }

      {mode === DELETING && 
        <Status
          message={'Deleting...'}
        />
      }

      {mode === CONFIRM &&
        <Confirm 
          message={'Are you sure you want to delete?'}
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      }

      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      }



      
    </article>
  );
};