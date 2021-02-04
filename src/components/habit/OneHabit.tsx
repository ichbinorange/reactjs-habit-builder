import React from 'react';

type stateType = {
    key: number;
    id: number;
    title: string;
    goal: string;
    description: string;
    streak: string;
    deleteHabitCallback: {(habit_id: number): void;};
}

const OneHabit: React.FC<stateType> = (props) => {
  return (
    <div className="card">
      <div className="card__content">
        <div className="card__content-text">{props.title}</div>
        <div className="card__content-text">{props.goal}</div>
        <div className="card__content-text">{props.description}</div>
        <div className="card__content-text">{props.streak}</div>
        <button
          onClick={() => props.deleteHabitCallback(props.id)}
          className="card__delete"
          data-testid={props.id}>
          Delete
        </button>
      </div>
    </div>
    )
}

export default OneHabit;