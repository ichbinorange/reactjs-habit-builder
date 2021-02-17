import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import HabitCard from './HabitCard';

type stateType = {
  currentUser: any;
  habitPage: boolean;
  habitId: number;
  selectHabit: {(habitId: number): void;};
}

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

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
  }, []); // [habitList] to infinity loop

  const deleteHabit = (habitId: number) => {
    const updatedHabitList = habitList.filter((habit: any) => {
      return habit.id !== habitId;
    });

    if (updatedHabitList.length < habitList.length) {
      axios.delete(`${API_BASE_URL}/habit/${habitId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
          setErrorMessage(`Successfully deleted habit#${ habitId }`);
        })
        .catch((error) => {
          setErrorMessage(`Unable to delete habit ${ habitId }`);
        })
      setHabitList(updatedHabitList);
    }
  }

  const filterHabitComponent = habitList.filter((habit: any) => habit.id === props.habitId).map((filteredHabit: any) => {
    return (
      <HabitCard
        key={filteredHabit.id}
        id={filteredHabit.id}
        title={filteredHabit.title}
        goal={filteredHabit.goal}
        description={filteredHabit.description}
        streak={filteredHabit.streak}
        habitBuilt={filteredHabit.habitBuilt}
        createdDate={(new Date(filteredHabit.createdDate)).toLocaleDateString('en-US', DATE_OPTIONS)}
        deleteHabitCallback={deleteHabit}
        selectHabit={props.selectHabit}
        habitPage={props.habitPage}
      />
    )
  })

  const habitComponents = habitList.map((habit: any) => {
    return (
      <HabitCard
        key={habit.id}
        id={habit.id}
        title={habit.title}
        goal={habit.goal}
        description={habit.description}
        streak={habit.streak}
        habitBuilt={habit.habitBuilt}
        createdDate={(new Date(habit.createdDate)).toLocaleDateString('en-US', DATE_OPTIONS)}
        deleteHabitCallback={deleteHabit}
        selectHabit={props.selectHabit}
        habitPage={props.habitPage}
      />
    )
  })

  return (
    <div>
        {props.habitId === -1 ? habitComponents : filterHabitComponent}
    </div>
  )
}

export default HabitList;