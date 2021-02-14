import React, { useState } from 'react';

type stateType = {
    habit: selectHabit;
    addMessageCallback: {(msg: object): void;};
    deselectFriendHabitCallback: {(habit: {habitId: number, friendName: string, friendImageUrl: string}): void;};
}

type form = {
    text: string;
}

type selectHabit = {
  habitId: number; 
  friendName: string; 
  friendImageUrl: string;
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
      <h6 className="text-center">{props.habit.habitId === -1 ? "Pick a friend's habit" :
        <div className="text-left">
          <div className="d-flex justify-content-between">
            <h5>Message</h5>
            <button
              onClick={(e: React.MouseEvent<HTMLElement>) => props.deselectFriendHabitCallback({habitId: -1, friendName: '', friendImageUrl: ''})}
              className="btn btn-outline-secondary mr-2 btn-sm">
              Cancel
            </button>
          </div>
          <div className="mt-2">
            To: <img className="rounded-circle border border-secondary mr-1 ml-1" src={props.habit.friendImageUrl} alt={props.habit.friendName}/>
            {props.habit.friendName}'s Habit#{props.habit.habitId}
          </div>
        </div>}</h6>
      <div className="form-group text-left">
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
            className={props.habit.habitId !== -1 ? "btn btn-outline-success mt-3 btn-sm" : "btn btn-outline-success mt-3 btn-sm disabled"}
            >Add Message
          </button>
        </div>
      </div>
    </form>
  )
}

export default NewMessageForm;