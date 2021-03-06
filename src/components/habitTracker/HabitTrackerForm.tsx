import React, { useState } from 'react';

type stateType = {
  habitId: number;
  addHabitTrackerCallback: {(habit: object): void;};
}

type form = {
  habitId: number,
  workTime: number,
  memo: string,
}

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

const HabitTrackerForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({
    habitId: -1,
    workTime: 0,
    memo: '',
  });

  // event handlers for input
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }
  // event handlers for textarea
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.addHabitTrackerCallback({...formFields, habitId: props.habitId});

    setFormFields({
      habitId: -1,
      workTime: 0,
      memo: '',
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h3>New Record {props.habitId !== -1 ? `for Habit# ${props.habitId}` : "- Pick a habit"}</h3>
      <div className="form-group">
        <h6>Today is {new Date().toLocaleDateString('en-US', DATE_OPTIONS)}</h6>
        <label className="text-left m-2">Time spent(hr):</label>
        <input type="number" 
                placeholder="Choose one..." 
                step="0.5" 
                min="0.5" 
                max="24" 
                id="workTime"
                name="workTime"
                onChange={onInputChange}
                required/>
        <br/>
        <label className="text-left m-2">Note:</label>
        <textarea id="memo"
                  name="memo"
                  rows={6}
                  onChange={onTextareaChange}
                  value={formFields.memo}
                  className="form-control" 
                  placeholder="I had tomato and zucchini today"
                  />
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-outline-success mt-3 btn-sm"
            disabled={props.habitId === -1}>
            Add Record</button>
        </div>
      </div>
    </form>
  )
}

export default HabitTrackerForm;