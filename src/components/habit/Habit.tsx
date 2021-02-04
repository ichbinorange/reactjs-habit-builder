import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../util/BaseUrl';
import { getHabits } from '../util/ApiUtils';
// import { postHabit } from '../util/ApiUtils';
import NewHabitForm from './NewHabitForm';
import OneHabit from './OneHabit';

type stateType = {
  currentUser: any,
}

const Habit: React.FC<stateType> = (props) => {
  const [habitList, setHabitList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/habits`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
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
  }, []);
  
  const addHabit = (habit: any) => {
    console.log(props.currentUser)
    console.log(API_BASE_URL)
    axios.post(`${API_BASE_URL}/enjoyer/${props.currentUser.id}/habit`, habit, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        const updatedHabit = [...habitList, response.data];
        setHabitList(updatedHabit);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(`Unable to add a new habit`);
      });
  }

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
        deleteHabitCallback={deleteHabit}
      />
    )
  })

  return (
    <div>
      <h1>habits</h1>
      <NewHabitForm addHabitCallback={addHabit}/>
      <div className="validation-errors-display">
        <h2 className="validation-errors-display__list">
          {errorMessage}
        </h2>
      </div>
      <div className="habit">
        {habitComponents}
      </div>
    </div>
  );
}

export default Habit;