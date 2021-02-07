import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import { API_BASE_URL } from '../util/BaseUrl';
import UpdateHabitForm from './UpdateHabitForm';
import HabitTracker from '../habitTracker/HabitTracker';

type stateType = {
    key?: number;
    id: number;
    title: string;
    goal: string;
    description: string;
    streak: string;
    habitBuilt: boolean;
    deleteHabitCallback: {(habit_id: number): void;};
    habitPage: boolean;
}

const HabitCard: React.FC<stateType> = (props) => {
  const [update, setUpdate] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
  }, [update]);

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

  const cancelUpdateHabit = () => {
    setUpdate(false)
  }

  return (
    <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
      <div className="card-body">
        {update ? <UpdateHabitForm id={props.id}
                                    title={props.title}
                                    goal={props.goal}
                                    description={props.description}
                                    streak={props.streak}
                                    habitBuilt={props.habitBuilt}
                                    updateHabitCallback={updateHabit}
                                    cancelUpdateHabitCallback={cancelUpdateHabit} /> : (
        <div>
          <div className={props.habitBuilt ? "d-flex justify-content-between": "d-flex justify-content-end"}>
            <span className="badge badge-pill badge-success mb-3">{props.habitBuilt ? "It's part of My Life": ""}</span>
            <Switch>
              {props.habitPage ?
                <div>
                  <Link to={`/habitTracker/habit/${props.id}`}>View Record</Link>
                  <Route className="mb-2"
                        path={`/habitTracker/habit/${props.id}`}
                        component={ HabitTracker }
                        currentHabit={ props.id }></Route> 
                </div> :
                <div>
                  <Link to='/habit'>Read More</Link>
                  <Route path="/habit" className="mb-2"></Route>
                </div>
              }
            </Switch>
          </div>
          <div className="d-flex justify-content-between">
              <h5 className="display-5">Habit#{props.id} - {props.title}</h5>
          </div>
          <div>
              <h6>Goal: {props.goal}</h6>
              <p>Streak: {props.streak}
              <br/>Start date:</p> {/* <p>{props.createdDate}</p> */}
          </div>
          {props.habitPage ?
          <div>
              <hr className="my-1"></hr>
              <p>{props.description}</p>
          </div> : null}
        </div>
        )}
        {props.habitPage ?
        <div>
            <button
                onClick={() => props.deleteHabitCallback(props.id)}
                className="btn btn-outline-danger"
                data-testid={props.id}>Delete
            </button>
            {update ? null : <button
                onClick={(e: React.MouseEvent<HTMLElement>) => setUpdate(true)}
                className="btn btn-outline-info m-3">Edit
            </button>}
        </div> : null}
      </div>
    </div>
    )
}

export default HabitCard;