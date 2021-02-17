import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';

import { API_BASE_URL } from '../util/BaseUrl';
import UpdateHabitForm from './UpdateHabitForm';
import HabitTracker from '../habitTracker/HabitTracker';
import './Habit.css';

type stateType = {
    key?: number;
    id: number;
    title: string;
    goal: string;
    description: string;
    streak: string;
    habitBuilt: boolean;
    createdDate: string;
    deleteHabitCallback: {(habitId: number): void;};
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
    <div className="card w-100 d-inline-flex p-2 bd-highlight mb-2">
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
              <h5 className="card-title">#{props.id} - {props.title}</h5>
              <h6>Goal: {props.goal}</h6>
          </div>
          {props.habitPage ?
          <div className="card-text">
              <hr className="my-1"></hr>
              <p>{props.description}</p>
          </div> : null}
        </div>
        )}
      </div>
      <div className="card-footer d-flex justify-content-between p-0">
        <div>Start date: {props.createdDate}</div>
        {props.habitPage ?
        <div className="d-flex justify-content-end">
          {/* delete button */}
          <div>
            <button type="button" className="btn btn-outline-danger mr-2 btn-sm btn-size" data-toggle="modal" data-target={`#habit#${props.id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            <div className="modal" id={`habit#${props.id}`}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    Delete Habit#{props.id} - {props.title}
                  </div>
                  <div className="modal-footer p-0">
                    <button type="button" 
                            className="btn btn-outline-danger btn-sm" 
                            data-dismiss="modal"
                            onClick={() => props.deleteHabitCallback(props.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {update ? null : 
          // edit button
          <button
              onClick={(e: React.MouseEvent<HTMLElement>) => setUpdate(true)}
              className="btn btn-outline-info btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
          </button>}
        </div> : null}
      </div>
    </div>
    )
}

export default HabitCard;