import React from 'react';

type stateType = {
  key?: number;
  id: number;
  habitId: number;
  workTime: number;
  memo: string;
  createdDate: string;
  deleteHabitTrackerCallback: {(habitTracker_id: number): void;};
}
  
const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

const HabitTrackerCard: React.FC<stateType> = (props) => {
  return (
    <div className="card w-100 d-inline-flex p-1 bd-highlight mt-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
                <h5 className="display-5">Habit#{props.habitId}</h5>
                <p className="display-5">Record ID: {props.id}</p>
            </div>
            <div>
                <p>Date: {(new Date(props.createdDate)).toLocaleString('en-US', DATE_OPTIONS)}
                <br/>Spending Time(hr): {props.workTime}
                <br/>Note: {props.memo}</p> 
            </div>
      </div>
      <div className="text-center mb-1">
        <button
            onClick={() => props.deleteHabitTrackerCallback(props.id)}
            className="btn btn-outline-danger btn-sm"
            data-testid={props.id}>Delete
        </button>
      </div>
    </div>
  )
}

export default HabitTrackerCard;