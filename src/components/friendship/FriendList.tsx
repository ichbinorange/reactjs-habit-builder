import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import FriendCard from './FriendCard';

type stateType = {
  currentUser: any;
}

type friendship = {
    id: number;
    requester: friend;
    receiver: friend;
    activated: boolean;
    createdDate: string;
    lastModifiedDate: string; 
}

type friend = {
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

type returnUpdateInfo ={
  friendshipId: number;
  receiverId: number;
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

  const deleteFriendship = (friendshipId: number) => {
    axios.delete(`${API_BASE_URL}/friendship/${friendshipId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        setErrorMessage(`Friendship ${ friendshipId } deleted`);
      })
      .catch((error) => {
        setErrorMessage(`Unable to delete friendship ${ friendshipId }`);
    })
  }
  const confirmFriendship = (update: returnUpdateInfo) => {
    axios.put(`${API_BASE_URL}/friendship/${update.friendshipId}/receiver/${update.receiverId}`, update, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        setErrorMessage(`Friendship ${ update.friendshipId } is confirmed`);
      })
      .catch((error) => {
        setErrorMessage(`Unable to confirm friendship ${ update.friendshipId }`);
    })
  }

  const requesterComponents = friendList.requester.map((friendship) => {
    console.log(friendList)
    console.log(friendship)
    return (
      <FriendCard currentUser={props.currentUser}
                  key={friendship.id}
                  id={friendship.id}
                  requesterId={-1}
                  receiverId={friendship.receiver.id}
                  createdDate={friendship.createdDate}
                  activated={friendship.activated}
                  deleteFriendshipCallback={deleteFriendship}
                  confirmFriendshipCallback={confirmFriendship}/>
    )
  })

  const receiverComponents = friendList.receiver.map((friendship) => {
    return (
      <FriendCard currentUser={props.currentUser}
                  key={friendship.id}
                  id={friendship.id}
                  requesterId={friendship.requester.id}
                  receiverId={-1}
                  activated={friendship.activated}
                  createdDate={friendship.createdDate}
                  deleteFriendshipCallback={deleteFriendship}
                  confirmFriendshipCallback={confirmFriendship}/>
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