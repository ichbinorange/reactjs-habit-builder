import React, { useState } from 'react';

type stateType = {
  habitId: number;
  addHabitTrackerCallback: {(habit: object): void;};
}

type form = {
  habitId: number,
  record: boolean,
  memo: string,
}

const HabitTrackerForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({
    habitId: -1,
    record: false,
    memo: '',
  });

  // event handlers for checkbox
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setFormFields({...formFields, record: event.target.checked});
  };

  // event handlers for textarea
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.addHabitTrackerCallback({...formFields, habitId: props.habitId});

    setFormFields({
      habitId: -1,
      record: false,
      memo: '',
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h3>New Record {props.habitId !== -1 ? `for Habit# ${props.habitId}` : "- Pick a habit"}</h3>
      <div className="form-group">
        <div className="text-left">
          <input id="toggleSwitch" 
                  name="toggleSwitch" 
                  onChange={onCheckboxChange}
                  defaultChecked={formFields.record}
                  className="toggle-switch-checkbox mr-2" 
                  type="checkbox" />
          <label className="toggle-switch-label" htmlFor="toggleSwitch">Check!</label>
        </div>
        <label className="">Note:</label>
        <textarea id="memo"
                  name="memo"
                  onChange={onTextareaChange}
                  value={formFields.memo}
                  className="form-control" 
                  placeholder="I had tomato and zucchini today"
                  />
        <div className="text-center">
          <button
            type="submit"
            className={props.habitId !== -1 ? "btn btn-outline-success mt-3" : "btn btn-outline-success mt-3 disabled"}
          >Add Record</button>
        </div>
      </div>
    </form>
  )
}

export default HabitTrackerForm;