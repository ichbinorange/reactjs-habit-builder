import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import HabitTrackerCard from './HabitTrackerCard';

type stateType = {
  currentUser: any;
  // habitTrackerPage: boolean;
}

const HabitTrackerList: React.FC<stateType> = (props) => {
  const [habitTrackerList, setHabitList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/habitTrackers/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        const apiHabitList = response.data;
        if (apiHabitList.length !== 0) {
          setHabitList([...apiHabitList]);
        } else {
          setHabitList(apiHabitList)
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []); // [habitTrackerList] turn it off for mac less works to read data from server, should turn it on when final depoly

  const deleteHabitTracker = (habit_id: number) => {
    const updatedHabitList = habitTrackerList.filter((habitTracker: any) => {
      return habitTracker.id !== habit_id;
    });

    if (updatedHabitList.length < habitTrackerList.length) {
      axios.delete(`${API_BASE_URL}/habitTracker/${habit_id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
          setErrorMessage(`Habit ${ habit_id } deleted`);
        })
        .catch((error) => {
          setErrorMessage(`Unable to delete habit ${ habit_id }`);
        })
      setHabitList(updatedHabitList);
    }
  }

  const habitTrackerComponents = habitTrackerList.map((habitTracker: any) => {
    return (
      <HabitTrackerCard key={habitTracker.id}
                        id={habitTracker.id}
                        record={habitTracker.record}
                        memo={habitTracker.memo}
                        deleteHabitTrackerCallback={deleteHabitTracker}/>
                        // habitTrackerPage={props.habitTrackerPage}
    )
  })

  return (
    <div>
        {habitTrackerComponents}
    </div>
  )
}

export default HabitTrackerList;