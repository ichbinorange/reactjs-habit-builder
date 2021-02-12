import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import FriendCard from './FriendCard';

type stateType = {
  currentUser: any;
  friendList: apiFriendship;
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

type returnUpdateInfo ={
  friendshipId: number;
  receiverId: number;
}

const FriendList: React.FC<stateType> = (props) => {
  const [errorMessage, setErrorMessage] = useState<String>('');

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

  const requesterComponents = props.friendList.requester.map((friendship) => {
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

  const receiverComponents = props.friendList.receiver.map((friendship) => {
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