import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from "react-bootstrap";

import { API_BASE_URL } from '../util/BaseUrl';
import NewHabitForm from './NewHabitForm';
import HabitList from './HabitList';
import MsgList from '../habitMsg/MsgList';
import './Habit.css';

type stateType = {
  currentUser: any,
}

const Habit: React.FC<stateType> = (props) => {
  const [addHabitList, setAddHabitList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  const addHabit = (habit: any) => {
    axios.post(`${API_BASE_URL}/enjoyer/${props.currentUser.id}/habit`, habit, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        // add this to temp update habit list for useEffect
        const updatedHabit = [...addHabitList, response.data];
        setAddHabitList(updatedHabit);

        setErrorMessage('Successufully add a new Habit');
        onShowAlert();
      })
      .catch((error) => {
        setErrorMessage(`Unable to add a new habit`);
      });
  }

  const onShowAlert = () => {
    setErrorVisible(true) // true
    const timer = window.setTimeout(()=>{
      setErrorVisible(false) // false
    },4000);
    return () => clearTimeout(timer);
  }

  // fake function to save line 53
  const toSelectHabit = (habitId: number) => {
    return null
  }

  return (
    <div className="container component-bkgd pt-5 p-4">
      {errorVisible && errorMessage.includes('Successuful') ? <Alert variant="success" className="text-center" >{errorMessage}</Alert> : null}
      <h1 className="mb-5 text-center">Your Habits</h1>
      <div className="row">
        <div className="col-3">
          <NewHabitForm addHabitCallback={addHabit}/>
        </div>
        <div className="col-6">
          <HabitList currentUser={props.currentUser}
                      addHabitList={addHabitList}
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