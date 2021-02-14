import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import NewHabitForm from './NewHabitForm';
import HabitList from './HabitList';
import MsgList from '../habitMsg/MsgList';

type stateType = {
  currentUser: any,
}

const Habit: React.FC<stateType> = (props) => {
  const [habitList, setHabitList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  const addHabit = (habit: any) => {
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

  // fake function to save line 44
  const toSelectHabit = (habitId: number) => {
    return null
  }

  return (
    <div className="container">
      <h1 className="mb-5 text-center">Your Habits</h1>
      <div className="validation-errors-display">
        <h2 className="validation-errors-display__list">{errorMessage}</h2>
      </div>
      <div className="row">
        <div className="col-3">
          <NewHabitForm addHabitCallback={addHabit}/>
        </div>
        <div className="col-6">
          <HabitList currentUser={props.currentUser}
                      selectHabit={toSelectHabit}
                      habitPage={true}
                      habitId={-1}/>
        </div>
        <div className="col-3">
          <h5 className="text-center mb-3">Messages from friends</h5>
          <MsgList currentUser={props.currentUser} />
        </div>
      </div>
    </div>
  );
}

export default Habit;