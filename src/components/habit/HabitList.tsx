import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import OneHabit from './OneHabit';

type stateType = {
  currentUser: any;
  habitPage: boolean;
}

const HabitList: React.FC<stateType> = (props) => {
  const [habitList, setHabitList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/habits/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
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
  }, []); // [habitList] turn it off for mac less works to read data from server, should turn it on when final depoly

  const deleteHabit = (habit_id: number) => {
    const updatedHabitList = habitList.filter((habit: any) => {
      return habit.id !== habit_id;
    });

    if (updatedHabitList.length < habitList.length) {
      axios.delete(`${API_BASE_URL}/habit/${habit_id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
          setErrorMessage(`Habit ${ habit_id } deleted`);
        })
        .catch((error) => {
          setErrorMessage(`Unable to delete habit ${ habit_id }`);
        })
      setHabitList(updatedHabitList);
    }
  }

  const habitComponents = habitList.map((habit: any) => {
    return (
      <OneHabit
        key={habit.id}
        id={habit.id}
        title={habit.title}
        goal={habit.goal}
        description={habit.description}
        streak={habit.streak}
        habitBuilt={habit.habitBuilt}
        deleteHabitCallback={deleteHabit}
        habitPage={props.habitPage}
      />
    )
  })

  return (
    <div>
        {habitComponents}
    </div>
  )
}

export default HabitList;