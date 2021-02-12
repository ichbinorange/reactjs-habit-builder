import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import FriendCard from './FriendCard';

type stateType = {
  currentUser: any;
}

type friendship = {
    id: number;
    requesterId: number;
    receiverId: number;
    activated: boolean;
    createdDate: string;
    lastModifiedDate: string; 
}

type apiFriendship = {
    requester: Array<friendship>;
    receiver: Array<friendship>;
}

const FriendList: React.FC<stateType> = (props) => {
  const [friendList, setFriendList] = useState<apiFriendship>({requester: [], receiver: []});
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/friendship/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
    .then((response) => {
        const apiFriendList = response.data;
        if (apiFriendList.length !== 0) {
        setFriendList({...apiFriendList});
        } else {
        setFriendList(apiFriendList)
        }
    })
    .catch((error) => {
        setErrorMessage(error.message);
    });
  }, []); 

  const deleteFriendship = (friendship_id: number) => {
    axios.delete(`${API_BASE_URL}/friendship/${friendship_id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        setErrorMessage(`Friendship ${ friendship_id } deleted`);
      })
      .catch((error) => {
        setErrorMessage(`Unable to delete friendship ${ friendship_id }`);
    })
  }

  const requesterComponents = friendList.requester.map((friendship) => {
    return (
      <FriendCard currentUser={props.currentUser}
                  key={friendship.id}
                  id={friendship.id}
                  requesterId={-1}
                  receiverId={friendship.receiverId}
                  createdDate={friendship.createdDate}
                  activated={friendship.activated}
                  deleteFriendshipCallback={deleteFriendship}/>
    )
  })

  const receiverComponents = friendList.receiver.map((friendship) => {
    return (
      <FriendCard currentUser={props.currentUser}
                  key={friendship.id}
                  id={friendship.id}
                  requesterId={friendship.requesterId}
                  receiverId={-1}
                  activated={friendship.activated}
                  createdDate={friendship.createdDate}
                  deleteFriendshipCallback={deleteFriendship}/>
    )
  })

  return (
    <div>
        {requesterComponents}
        <br/>
        {receiverComponents}
    </div>
  )
}

export default FriendList;