import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import FriendHabitsCard from './FriendHabitsCard';

type stateType = {
  key: number;
  friendId: number;
  habitPage: boolean;
  habitId: number;
  selectFriendHabitCallback: {(habit: {habitId: number, friendName: string, friendImageUrl: string}): void;};
}

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

const HabitList: React.FC<stateType> = (props) => {
  const [habitList, setHabitList] = useState<Array<object>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/habits/${props.friendId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
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
  }, []); // [habitList] turn it off for mac less works to read data from server, should turn it on when final depoly

  const friendHabitComponents = habitList.map((habit: any) => {
    return (
      <FriendHabitsCard key={habit.id}
                        id={habit.id}
                        friendName={habit.enjoyer.name}
                        friendImageUrl={habit.enjoyer.imageUrl}
                        title={habit.title}
                        goal={habit.goal}
                        habitBuilt={habit.habitBuilt}
                        createdDate={(new Date(habit.createdDate)).toLocaleDateString('en-US', DATE_OPTIONS)}
                        selectFriendHabitCallback={props.selectFriendHabitCallback}
      />
    )
  })

  return (
    <div>
        {friendHabitComponents}
    </div>
  )
}

export default HabitList;