import React, { useState, useEffect } from 'react';
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
  const [selectedHabit, setSelectedHabit] = useState<any>(null);
  const [habitTrackerList, setHabitTrackerList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  const getHabitIdUrlParameter = (localdata: string) => {
    const splitted = localdata.split("/")
    const habitId = Number(splitted[splitted.length-1])
    if (!isNaN(habitId)) {
      setSelectedHabitId(habitId);
      return habitId
    }
    return false;
  };

  // when link from habit page, this useEffect render info for single habit component
  useEffect(() => {
    const habitId = getHabitIdUrlParameter(props.location.pathname);
    if ( habitId != null) {
      axios.get(`${API_BASE_URL}/habit/${habitId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        const apiHabit = {...response.data};
        setSelectedHabit({...apiHabit});
        console.log(selectedHabit)
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    }
  }, []);

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

  return (
    <div className="container">
      <h1 className="mb-5 text-center">Habit Tracker</h1>
      <div className="row">
        <div className="col-3">
          <h5 className="mb-2 text-center">Habit List</h5>
          <p>Select function...coming soon</p>
          <HabitList currentUser={props.currentUser}
                      habitPage={false}
                      habitId={selectedHabitId} />
          <hr className="style1"></hr>
          <HabitList currentUser={props.currentUser}
                      habitPage={false}
                      habitId={-1} />
        </div>
        <div className="col-6">
          <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
            <VerticalBar /> 
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
          <h5 className="mb-2 text-center">Habit Records</h5>
          <HabitTrackerList currentUser={props.currentUser}/>
          {/* habitTrackerPage={true} */}
        </div>
    </div>
  </div>
  );
}

export default HabitTracker;