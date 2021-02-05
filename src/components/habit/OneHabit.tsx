import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import UpdateHabitForm from './UpdateHabitForm';

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
  const [update, setUpdate] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>('');

  const updateHabit = (habitobj: any) => {
    axios.put(`${API_BASE_URL}/habit/${props.id}`, {...habitobj, id: props.id}, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        setErrorMessage(`Habit ${ props.id} updated`);
        setUpdate(false)
      })
      .catch((error) => {
        setErrorMessage(`Unable to update habit ${ props.id }`);
      })
  }

  return (
    <div className="card w-25 d-inline-flex p-2 bd-highlight m-2">
      <div className="card-body">
        {update ? <UpdateHabitForm id={props.id}
                                    title={props.title}
                                    goal={props.goal}
                                    description={props.description}
                                    streak={props.streak}
                                    updateHabitCallback={updateHabit}/> : (
        <div>
          <h5 className="card-title">Title: {props.title}</h5>
          <h6 className="card-text">Goal: {props.goal}</h6>
          <p className="card-text">Streak: {props.streak}</p>
          <p className="card-text">{props.description}</p>
        </div>
        )}
        <button
          onClick={() => props.deleteHabitCallback(props.id)}
          className="btn btn-outline-danger"
          data-testid={props.id}>
          Delete
        </button>
        {update ? null : <button
            onClick={(e: React.MouseEvent<HTMLElement>) => setUpdate(true)}
            className="btn btn-outline-info m-3"
        >Edit</button>}
      </div>
    </div>
    )
}

export default OneHabit;