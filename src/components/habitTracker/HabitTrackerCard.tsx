import React from 'react';
import '../habit/Habit.css';

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
            <h5 className="display-5">#{props.habitId}</h5>
            <div className="display-5">Record ID: {props.id}</div>
        </div>
        <div>
            Time spent(hr): {props.workTime}
            <br/>Note: {props.memo}
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between p-0 mt-2">
        <div>
          {(new Date(props.createdDate)).toLocaleString('en-US', DATE_OPTIONS)}
        </div>

        <div>
            <button type="button" className="btn btn-outline-danger mr-2 btn-sm btn-size" data-toggle="modal" data-target={`#habitTracker#${props.id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            <div className="modal" id={`habitTracker#${props.id}`}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    Delete Habit Record#{props.id} for Habit#{props.habitId}
                  </div>
                  <div className="modal-footer p-0">
                    <button type="button" 
                            className="btn btn-outline-danger btn-sm" 
                            data-dismiss="modal"
                            onClick={() => props.deleteHabitTrackerCallback(props.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default HabitTrackerCard;