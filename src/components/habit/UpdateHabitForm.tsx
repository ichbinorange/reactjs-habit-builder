import React, { useState } from 'react';

type stateType = {
  id: number;
  title: string;
  goal: string;
  description: string;
  streak: string;
  habitBuilt: boolean;
  updateHabitCallback: {(habit: object): void;};
  cancelUpdateHabitCallback: {(habit: object): void;};
}

type form = {
  title: string;
  goal: string;
  description: string;
  streak: string;
  habitBuilt: boolean;
}

const STREAK_LIST: Array<string> = ["daily", "weekly", "monthly", "yearly"]

const UpdateHabitForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({
    title: props.title,
    goal: props.goal,
    description: props.description,
    streak: props.streak,
    habitBuilt: props.habitBuilt
  });

  // event handlers for input
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  // event handlers for textarea
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  // event handlers for select
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  // event handlers for checkbox
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setFormFields({...formFields, habitBuilt: event.target.checked});
  };

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.updateHabitCallback(formFields);

    setFormFields({
      title: '',
      goal: '',
      description: '',
      streak: '',
      habitBuilt: props.habitBuilt,
    })
  }

  return (
    <form onSubmit={onFormSubmit} className="justify-content-center">
      <h2 className="new-card-form__header">Update Habit# {props.id}</h2>
      <div className="form-group">
        <input id="toggleSwitch" 
                name="toggleSwitch" 
                onChange={onCheckboxChange}
                defaultChecked={formFields.habitBuilt}
                className="toggle-switch-checkbox mr-2" 
                type="checkbox" />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">It's part of my life Now!</label>
        <br/>
        <label className="exampleInputEmail1">Title:</label>
        <input id="title"
                name="title"
                onChange={onInputChange}
                value={formFields.title}
                className="form-control w-100" 
                type="text"
                />
        <label className="exampleInputEmail1">Goal:</label>
        <input id="goal"
                name="goal"
                onChange={onInputChange}
                value={formFields.goal}
                className="form-control w-100" 
                type="text"
                />
        <label className="exampleInputEmail1">Description:</label>
        <textarea id="description"
                name="description"
                onChange={onTextareaChange}
                value={formFields.description}
                className="form-control w-100" 
                placeholder="description"
                />
        <label className="exampleFormControlSelect1">Streak:</label>
        <select className="form-control w-100"
                name="streak"
                value={formFields.streak}
                onChange={onSelectChange} 
                >
          {
            STREAK_LIST.map((s, i) => (
              <option key={i}
                      value={s} 
                      >{s}</option>
            ))
          }
        </select>
        <div className="text-center">
          <button
              onClick={(e: React.MouseEvent<HTMLElement>) => props.cancelUpdateHabitCallback}
              className="btn btn-outline-info mt-3 mr-3 btn-sm"
          >Cancel</button>
          <button
            type="submit"
            className="btn btn-outline-success mt-3 btn-sm"
          >Save</button>
        </div>
      </div>
    </form>
  )
}

export default UpdateHabitForm;