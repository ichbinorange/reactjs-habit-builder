import React, { useState } from 'react';

type stateType = {
    habit: selectHabit;
    addMessageCallback: {(msg: object): void;};
    deselectFriendHabitCallback: {(habit: {habitId: number, friendName: string, friendImageUrl: string}): void;};
}

type form = {
    text: string;
    imageUrl: string;
}

type selectHabit = {
  habitId: number; 
  friendName: string; 
  friendImageUrl: string;
}

const NewMessageForm: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({text: '', imageUrl: 'https://images.pexels.com/photos/2740955/pexels-photo-2740955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'});

  // event handlers for textarea
  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  // event handlers for input
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(formFields)
    props.addMessageCallback(formFields);

    setFormFields({text: '', imageUrl: ''})
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
                  rows={4}
                  onChange={onTextareaChange}
                  value={formFields.text}
                  className="form-control" 
                  placeholder="You got this!"
                />
        <label className="exampleInputEmail1 mt-3">Add an image:</label>
        <input id="imageUrl"
                name="imageUrl"
                onChange={onInputChange}
                className="form-control" 
                placeholder="An image url or default image..."
                />
        <div className="mt-3 text-center">
          Default image:
          <img className="rounded w-75" src="https://images.pexels.com/photos/2740955/pexels-photo-2740955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="default encourage image"/>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={"btn btn-outline-success mt-3 btn-sm"}
            disabled={props.habit.habitId === -1}
            >Send Message
          </button>
        </div>
      </div>
    </form>
  )
}

export default NewMessageForm;