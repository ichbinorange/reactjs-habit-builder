import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [datePickerFormat, setDatePickerFormat] = useState<string>("month")
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  const getHabitIdUrlParameter = (localdata: string) => {
    const splitted = localdata.split("/")
    const habitId = Number(splitted[splitted.length-1])
    if (!isNaN(habitId)) {
      setSelectedHabitId(habitId);
    }
  };

  const onShowAlert = () => {
    setErrorVisible(true) // true
    const timer = window.setTimeout(()=>{
      setErrorVisible(false) // false
    },4000);
    return () => clearTimeout(timer);
  }

  // Invoke selected habit card
  useEffect(() => {
    getHabitIdUrlParameter(props.location.pathname);
  }, [selectedHabitId]);

  const addHabitTracker = (habitTracker: any) => {
    axios.post(`${API_BASE_URL}/habit/${habitTracker.habitId}/habitTracker`, habitTracker, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        const updatedHabitTracker = [...habitTrackerList, response.data];
        setHabitTrackerList(updatedHabitTracker);
        setErrorMessage('Successufully add a new Habit Record');
        onShowAlert();
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

  const selectDateFormat = (format: string) => {
    setDatePickerFormat(format)
  }

  const datePicker = (format: string) => {
    if (format.length === 5) {
      return (
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
        />
      );
    } else {
      return (
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showYearPicker
          dateFormat="yyyy"
        />
      );
    }
  };

  return (
    <div className="container component-bkgd pt-5 p-4">
      {errorVisible && errorMessage.includes('Successuful') ? <Alert variant="success" className="text-center" >{errorMessage}</Alert> : null}
      <h1 className="mb-5 text-center">Habit Tracker</h1>
      <div className="row">
        <div className="col-3">
          <div className="d-flex justify-content-between">
            <p className="pl-3">{selectedHabitId === -1 ? "Pick one Habit" : `Selected Habit#${selectedHabitId}`}</p>
            <Link to="/habitTracker">
              <button className="btn btn-outline-secondary btn-sm"
                      disabled={selectedHabitId === -1}
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
          <h5 className="mb-2 text-center">Habit List</h5>
          <HabitList currentUser={props.currentUser}
                      habitPage={false}
                      selectHabit={toSelectHabit}
                      habitId={-1}/>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-end mb-2">
            {datePicker(datePickerFormat)}
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <button className="btn btn-outline-secondary btn-sm active"
                      onClick={(e: React.MouseEvent<HTMLElement>) => selectDateFormat("month")}>Month
                      <input type="radio" name="options" id="option1" data-autocomplete="off" ></input>
              </button> 
              <button className="btn btn-outline-secondary btn-sm"
                      onClick={(e: React.MouseEvent<HTMLElement>) => selectDateFormat("year")}>Year
                      <input type="radio" name="options" id="option2" data-autocomplete="off"></input>
              </button>
            </div>
          </div>
          <div className="card w-100 d-inline-flex p-2 bd-highlight mb-2">
            <VerticalBar currentUser={props.currentUser}
                          habitId={selectedHabitId} 
                          datePickerFormat={datePickerFormat}
                          datePicker={startDate}/> 
          </div>
          <hr className="style1"></hr>
          <div className="card w-100 d-inline-flex p-2 bd-highlight mb-2">
            <div className="card-body p-1">
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