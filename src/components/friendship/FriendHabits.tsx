import React, { useState, useEffect } from 'react';
import FriendHabitsList from './FriendHabitsList';

type stateType = {
  currentUser: any;
  friendList: apiFriendship;
  selectFriendHabitCallback: {(habit: {habitId: number, friendName: string, friendImageUrl: string}): void;};
}

// user data structure from server
type apiFriendship = {
    requester: Array<friendship>;
    receiver: Array<friendship>;
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

type friendship = {
    id: number;
    requester: apiFriend;
    receiver: apiFriend;
    activated: boolean;
    createdDate: string;
    lastModifiedDate: string; 
}

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

const FriendHabits: React.FC<stateType> = (props) => {

  const requesterComponents = props.friendList.requester.filter((friendship) => friendship.activated === true).map((friendship) => {
    return (
        <FriendHabitsList key={friendship.receiver.id}
                          friendId={friendship.receiver.id}
                          selectFriendHabitCallback={props.selectFriendHabitCallback}
                          habitPage={false}
                          habitId={-1}/>
    )
  })

  const receiverComponents = props.friendList.receiver.filter((friendship) => friendship.activated === true).map((friendship) => {
    return (
        <FriendHabitsList key={friendship.requester.id}
                          friendId={friendship.requester.id}
                          selectFriendHabitCallback={props.selectFriendHabitCallback}
                          habitPage={false}
                          habitId={-1}/>
    )
  })

  return (
    <div>
        {requesterComponents}
        {receiverComponents}
    </div>
  )
}

export default FriendHabits;