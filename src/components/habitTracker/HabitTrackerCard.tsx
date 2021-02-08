import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';

type stateType = {
  key?: number;
  id: number;
  record: boolean;
  memo: string;
  deleteHabitTrackerCallback?: {(habit_id: number): void;};
  // habitTrackerPage: boolean;
  }
  
const HabitTrackerCard: React.FC<stateType> = (props) => {
  return (
    <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
                <h5 className="display-5">Record# {props.id}</h5>
            </div>
            <div>
                <p>Note: {props.memo}
                <br/>Created date:</p> {/* <p>{props.createdDate}</p> */}
            </div>
      </div>
    </div>
  )
}

export default HabitTrackerCard;