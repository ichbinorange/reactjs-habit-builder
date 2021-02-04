import React, { useState } from 'react';

type stateType = {
  addHabitCallback: {(habit: object): void;};
}

type form = {
  title: string,
  goal: string,
  description: string,
  streak: string,
}

const STREAK_LIST: Array<string> = ["daily", "weekly", "monthly", "yearly"]

const NewHabitForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({
    title: '',
    goal: '',
    description: '',
    streak: ''
  });

  // event handlers
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.addHabitCallback(formFields);

    setFormFields({
      title: '',
      goal: '',
      description: '',
      streak: ''
    })
  }

  return (
    <form
      className="new-card-form"
      onSubmit={onFormSubmit}
    >
      <h2 className="new-card-form__header">Add a New Habit</h2>
      <div className="new-card-form__form">
        <label className="new-card-form__form-label">Title:</label>
        <input id="title"
                name="title"
                onChange={onInputChange}
                value={formFields.title}
                className="new-card-form__form-textarea" 
                placeholder="title"
                type="text"
                />
        <label className="new-card-form__form-label">Goal:</label>
        <input id="goal"
                name="goal"
                onChange={onInputChange}
                value={formFields.goal}
                className="new-card-form__form-textarea" 
                placeholder="goal"
                type="text"
                />
        <label className="new-card-form__form-label">Description:</label>
        <input id="description"
                name="description"
                onChange={onInputChange}
                value={formFields.description}
                className="new-card-form__form-textarea" 
                placeholder="description"
                type="text"
                />
        <label className="new-card-form__form-label">Streak:</label>
        <select className="new-card-form__form-select"
                name="streak"
                onChange={s => onInputChange} 
                >
          {
            STREAK_LIST.map((s, i) => (
              <option key={i}
                      value={s} 
                      >{s}</option>
            ))
          }
        </select>

        <input
          type="submit"
          value="Add Habit"
          className="new-card-form__form-button"
        />
      </div>
    </form>
  )
}

export default NewHabitForm;