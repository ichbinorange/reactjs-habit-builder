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
    createdDate: string;
    deleteHabitCallback: {(habit_id: number): void;};
    selectHabit: {(habitId: number): void;};
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

  const streakBadge = (badge: string) => {
    if (badge.startsWith("d")) {
      return (
        <span className="badge badge-pill badge-primary text-capitalize">
          {badge}
        </span>
      )
    } else if (badge.startsWith("w")) {
      return (
        <span className="badge badge-pill badge-warning text-capitalize">
          {badge}
        </span>
      )
    } else if (badge.startsWith("m")) {
      return (
        <span className="badge badge-pill badge-secondary text-capitalize">
          {badge}
        </span>
      )
    } else {
      return (
        <span className="badge badge-pill badge-dark text-capitalize">
          {badge}
        </span>
      )
    }
  }

  const cancelUpdateHabit = () => {
    setUpdate(false)
  }

  return (
    <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
      <div className="card-body p-1">
        {update ? <UpdateHabitForm id={props.id}
                                    title={props.title}
                                    goal={props.goal}
                                    description={props.description}
                                    streak={props.streak}
                                    habitBuilt={props.habitBuilt}
                                    updateHabitCallback={updateHabit}
                                    cancelUpdateHabitCallback={cancelUpdateHabit} /> : (
        <div>
          <div className="d-flex">
            <div className="p-1">
              {streakBadge(props.streak)}
            </div>
            <div className={props.habitBuilt ? "p-1": ""}>
              <span className="badge badge-pill badge-success">
                {props.habitBuilt ? (props.habitPage ? 
                  <div>  
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                      <path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    </svg>
                    It's part of My Life
                  </div> : 
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                      <path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    </svg>
                  </div>): ""}
              </span>
            </div>
            <div className="ml-auto p-1">
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
                    <Link to="/habitTracker">
                      <button className="btn btn-outline-secondary btn-sm"
                              onClick={(e: React.MouseEvent<HTMLElement>) => props.selectHabit(props.id)}>Select
                      </button>
                    </Link>
                  </div>
                }
              </Switch>
            </div>
          </div>

          <div>
              <h5 className="display-5">Habit#{props.id} - {props.title}</h5>
              <h6>Goal: {props.goal}</h6>
          </div>
          {props.habitPage ?
          <div>
              <hr className="my-1"></hr>
              <p>{props.description}</p>
          </div> : null}
          {props.habitPage ?
          <div className="d-flex justify-content-end">
              <button
                  onClick={() => props.deleteHabitCallback(props.id)}
                  className="btn btn-outline-danger mr-2 btn-sm"
                  data-testid={props.id}>Delete
              </button>
              {update ? null : <button
                  onClick={(e: React.MouseEvent<HTMLElement>) => setUpdate(true)}
                  className="btn btn-outline-info btn-sm">Edit
              </button>}
          </div> : null}
        </div>
        )}
      </div>
      <div className="card-footer text-center p-0">
        Start date: {props.createdDate}
      </div>
    </div>
    )
}

export default HabitCard;