import React, { useState } from 'react';

type stateType = {
    habitId: number
    addMessageCallback: {(msg: object): void;}
}

type form = {
    text: string;
}
const NewMessageForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({text: ''});

  // event handlers for textarea
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.addMessageCallback(formFields);

    setFormFields({text: ''})
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h6 className="text-center">{props.habitId !== -1 ? `Message for Habit# ${props.habitId}` : "Pick a friend's habit"}</h6>
      <div className="form-group">
        <label>Message:</label>
        <textarea id="text"
                  name="text"
                  onChange={onTextareaChange}
                  value={formFields.text}
                  className="form-control" 
                  placeholder="You got this!"
                />
        <div className="text-center">
          <button
            type="submit"
            className={props.habitId !== -1 ? "btn btn-outline-success mt-3" : "btn btn-outline-success mt-3 disabled"}
          >Add Message</button>
        </div>
      </div>
    </form>
  )
}

export default NewMessageForm;