import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import HabitList from '../habit/HabitList';
import HabitTrackerForm from './HabitTrackerForm';
import HabitTrackerList from './HabitTrackerList';
import VerticalBar from './VerticalBar';
import './HabitTracker.css';

type stateType = {
  currentUser: any,
  location?: any,
}

const HabitTracker: React.FC<stateType> = (props) => {
  const [selectedHabitId, setSelectedHabitId] = useState<number>(-1);
  const [habitTrackerList, setHabitTrackerList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  const getHabitIdUrlParameter = (localdata: string) => {
    const splitted = localdata.split("/")
    const habitId = Number(splitted[splitted.length-1])
    if (!isNaN(habitId)) {
      setSelectedHabitId(habitId);
    }
  };

  // Invoke selected habit card
  useEffect(() => {
    getHabitIdUrlParameter(props.location.pathname);
  }, [selectedHabitId]);

  const addHabitTracker = (habitTracker: any) => {
    axios.post(`${API_BASE_URL}/habit/${habitTracker.habitId}/habitTracker`, habitTracker, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        const updatedHabitTracker = [...habitTrackerList, response.data];
        setHabitTrackerList(updatedHabitTracker);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(`Unable to add a new habit record`);
      });
  }

  const toSelectHabit = (habitId: number) => {
    setSelectedHabitId(habitId)
  }

  const cancelSelectHabit = () => {
    setSelectedHabitId(-1)
  }

  return (
    <div className="container">
      <h1 className="mb-5 text-center">Habit Tracker</h1>
      <div className="row">
        <div className="col-3">
          <h5 className="mb-2 text-center">Habit List</h5>
          <div className="d-flex justify-content-between">
            <p>{selectedHabitId === -1 ? "Pick one Habit" : `Selected Habit#${selectedHabitId}`}</p>
            <Link to="/habitTracker">
              <button className={selectedHabitId === -1 ? "btn btn-outline-secondary btn-sm disabled": "btn btn-outline-secondary btn-sm"}
                    onClick={cancelSelectHabit}>
                    Overview
              </button>
            </Link>
          </div>
          {selectedHabitId === -1 ? null :
          <div>
            <HabitList currentUser={props.currentUser}
                        habitPage={false}
                        selectHabit={toSelectHabit}
                        habitId={selectedHabitId} />
            <hr className="style1"></hr>
          </div>}
          <HabitList currentUser={props.currentUser}
                      selectHabit={toSelectHabit}
                      habitPage={false}
                      habitId={-1} />
        </div>
        <div className="col-6">
          <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
            <VerticalBar currentUser={props.currentUser}
                          habitId={selectedHabitId} /> 
          </div>
          <hr className="style1"></hr>
          <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
            <div className="card-body">
              <HabitTrackerForm habitId={selectedHabitId}
                                addHabitTrackerCallback={addHabitTracker}/>
            </div>
          </div>
        </div>
        <div className="col-3">
          <h5 className="mb-2 text-center">{selectedHabitId === -1 ? "Habit Records" : `Records for Habit#${selectedHabitId}`}</h5>
          <HabitTrackerList currentUser={props.currentUser}
                            habitId={selectedHabitId}/>
        </div>
    </div>
  </div>
  );
}

export default HabitTracker;