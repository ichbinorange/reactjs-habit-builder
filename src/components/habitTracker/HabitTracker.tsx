import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import HabitList from '../habit/HabitList';

type stateType = {
  currentUser: any,
}

const HabitTracker: React.FC<stateType> = (props) => {
  console.log(props)
  return (
    <div className="container">
      <h1 className="mb-5 text-center">Habit Tracker</h1>
      <div className="row">
        <div className="col-sm">
          <HabitList currentUser={props.currentUser}
                      habitPage={false} />
        </div>
        <div className="col-sm">
          habit graph on the top, and habit recor form on the bottom
        </div>
        <div className="col-sm">
          habit data
        </div>
    </div>
  </div>
  );
}

export default HabitTracker;