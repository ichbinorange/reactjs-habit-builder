import React, { useState } from 'react';

type stateType = {
  id: number;
  title: string;
  goal: string;
  description: string;
  streak: string;
  updateHabitCallback: {(habit: object): void;};
}

type form = {
  title: string;
  goal: string;
  description: string;
  streak: string;
}

const STREAK_LIST: Array<string> = ["daily", "weekly", "monthly", "yearly"]

const UpdateHabitForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({
    title: props.title,
    goal: props.goal,
    description: props.description,
    streak: props.streak
  });

  // event handlers for input
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  // event handlers for select
  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.updateHabitCallback(formFields);

    setFormFields({
      title: '',
      goal: '',
      description: '',
      streak: ''
    })
  }

  return (
    <form onSubmit={onFormSubmit} className="justify-content-center">
      <h2 className="new-card-form__header">Update Habit# {props.id}</h2>
      <div className="form-group">
        <label className="exampleInputEmail1">Title:</label>
        <input id="title"
                name="title"
                onChange={onInputChange}
                value={formFields.title}
                className="form-control w-50" 
                type="text"
                />
        <label className="exampleInputEmail1">Goal:</label>
        <input id="goal"
                name="goal"
                onChange={onInputChange}
                value={formFields.goal}
                className="form-control w-50" 
                type="text"
                />
        <label className="exampleInputEmail1">Description:</label>
        <input id="description"
                name="description"
                onChange={onInputChange}
                value={formFields.description}
                className="form-control w-50" 
                type="text"
                />
        <label className="exampleFormControlSelect1">Streak:</label>
        <select className="form-control w-50"
                name="streak"
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

        <button
          type="submit"
          className="btn btn-outline-success mt-3"
        >Save</button>
      </div>
    </form>
  )
}

export default UpdateHabitForm;