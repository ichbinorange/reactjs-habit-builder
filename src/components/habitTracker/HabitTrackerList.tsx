import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import HabitTrackerCard from './HabitTrackerCard';

type stateType = {
  currentUser: any;
  habitId: number;
  addHabitTracker: Array<object>;
}

const HabitTrackerList: React.FC<stateType> = (props) => {
  const [habitTrackerList, setHabitTrackerList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
      axios.get(`${API_BASE_URL}/habitTrackers/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
          const apiHabitTrackerList = response.data;
          if (apiHabitTrackerList.length !== 0) {
            setHabitTrackerList([...apiHabitTrackerList]);
          } else {
            setHabitTrackerList(apiHabitTrackerList)
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
      });
  }, [props.addHabitTracker]); 

  const deleteHabitTracker = (habitTrackerId: number) => {
    const updatedHabitTrackerList = habitTrackerList.filter((habitTracker: any) => {
      return habitTracker.id !== habitTrackerId;
    });

    if (updatedHabitTrackerList.length < habitTrackerList.length) {
      axios.delete(`${API_BASE_URL}/habitTracker/${habitTrackerId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
          setErrorMessage(`Habit ${ habitTrackerId } deleted`);
        })
        .catch((error) => {
          setErrorMessage(`Unable to delete habitTracker ${ habitTrackerId }`);
        })
      setHabitTrackerList(updatedHabitTrackerList);
    }
  }

  const filterHabitComponents = habitTrackerList.filter((habitTracker: any) => habitTracker.habit.id === props.habitId).map((filteredHabitTracker: any) => {
    return (
      <HabitTrackerCard key={filteredHabitTracker.id}
                        id={filteredHabitTracker.id}
                        habitId={filteredHabitTracker.habit.id}
                        habitTitle={filteredHabitTracker.habit.title}
                        workTime={filteredHabitTracker.workTime}
                        memo={filteredHabitTracker.memo}
                        createdDate={filteredHabitTracker.createdDate}
                        deleteHabitTrackerCallback={deleteHabitTracker}/>
    )
  })

  const habitTrackerComponents = habitTrackerList.map((habitTracker: any) => {
    return (
      <HabitTrackerCard key={habitTracker.id}
                        id={habitTracker.id}
                        habitId={habitTracker.habit.id}
                        habitTitle={habitTracker.habit.title}
                        workTime={habitTracker.workTime}
                        memo={habitTracker.memo}
                        createdDate={habitTracker.createdDate}
                        deleteHabitTrackerCallback={deleteHabitTracker}/>
    )
  })

  return (
    <div>
      {props.habitId === -1 ? habitTrackerComponents : filterHabitComponents}
    </div>
  )
}

export default HabitTrackerList;