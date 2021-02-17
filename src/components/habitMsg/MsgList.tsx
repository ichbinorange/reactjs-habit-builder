import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import MsgCard from './MsgCard';

type stateType = {
  currentUser: any;
}

type apiMsg = {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  text: string;
  imageUrl: string;
  habit: apiHabit;
  friend: apiFriend; 
}

type apiHabit = {
    id: number;
    title: string;
    goal: string;
    description: string;
    enjoyer: object;
    habitBuilt: boolean;
    streak: string;
    createdDate: string;
    lastModifiedDate: string;
}

type apiFriend = {
    id: number;
    name: string
    about: string;
    email: string;
    emailVerified: boolean;
    imageUrl: string;
    password: string;
    provider: string;
    providerId: number;
    createdDate: string;
    lastModifiedDate: string;
}

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

const MsgList: React.FC<stateType> = (props) => {
  const [habitMsgList, setHabitMsgList] = useState<Array<apiMsg>>([]);
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/habitMsgs/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        const apiHabitMsgList = response.data;
        if (apiHabitMsgList.length !== 0) {
          setHabitMsgList([...apiHabitMsgList]);
        } else {
          setHabitMsgList(apiHabitMsgList)
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }, []); // [habitMsgList] turn it off for mac less works to read data from server, should turn it on when final depoly

  const deleteHabitMsg = (habitMsgId: number) => {
    axios.delete(`${API_BASE_URL}/habitMsg/${habitMsgId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        setErrorMessage(`HabitMsg ${ habitMsgId } deleted`);
      })
      .catch((error) => {
        setErrorMessage(`Unable to delete habitMsg ${ habitMsgId }`);
    })
  }

  const msgComponents = habitMsgList.map((habitMsg: apiMsg) => {
    return (
      <MsgCard key={habitMsg.id}
               id={habitMsg.id}
               imageUrl={habitMsg.imageUrl}
               createdDate={habitMsg.createdDate}
               text={habitMsg.text}
               habit={habitMsg.habit}
               friend={habitMsg.friend}
               deleteMsgCallback={deleteHabitMsg}
      />
    )
  })

  return (
    <div>
        {msgComponents}
    </div>
  )
}

export default MsgList;