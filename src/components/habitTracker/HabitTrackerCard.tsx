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
    <div className="card w-100 d-inline-flex bd-highlight p-2 m-1">
      <div className="card-body p-0">
        <div className="d-flex justify-content-between">
            <h5 className="display-5">Habit#{props.habitId}</h5>
            <div className="display-5">Record ID: {props.id}</div>
        </div>
        <div>
            Time spent(hr): {props.workTime}
            <br/>Note: {props.memo}
        </div>
        <div className="text-center p-2">
          <button
              onClick={() => props.deleteHabitTrackerCallback(props.id)}
              className="btn btn-outline-danger btn-sm">
              Delete
          </button>
        </div>
      </div>
      <div className="card-footer text-center p-0">
        {(new Date(props.createdDate)).toLocaleString('en-US', DATE_OPTIONS)}
      </div>
    </div>
  )
}

export default HabitTrackerCard;