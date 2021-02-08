import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';

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
  const [selectedHabit, setSelectedHabit] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<String>('');
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
      <h3>New Record for Habit# {props.habitId != -1 ? props.habitId : null}</h3>
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
            className="btn btn-outline-success mt-3"
          >Add Record</button>
        </div>
      </div>
    </form>
  )
}

export default HabitTrackerForm;