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

const TIME_LIST: Array<number> = Array.from(Array(25).keys()).slice(1,25)

const HabitTrackerForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({
    habitId: -1,
    workTime: 0,
    memo: '',
  });

  // event handlers for select
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
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
      workTime: 0,
      memo: '',
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h3>New Record {props.habitId !== -1 ? `for Habit# ${props.habitId}` : "- Pick a habit"}</h3>
      <div className="form-group">
        <label className="text-left m-2">Time spent(hr):</label>
        <select className="form-control"
                defaultValue={1}
                name="workTime"
                onChange={onSelectChange} 
                >
          {
            TIME_LIST.map((s, i) => (
              <option key={i}
                      value={s} 
                      >{s}</option>
            ))
          }
        </select>
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