import React, { useState } from 'react';
import FriendCard from './FriendCard';

type stateType = {
  currentUser: any;
  friendList: apiFriendship;
  deleteFriendshipCallback: {(friendshipId: number): void;};
  confirmFriendshipCallback: {(update: returnUpdateInfo): void;};
}
// type for update(confirm) the friendship
type returnUpdateInfo ={
  friendshipId: number;
  receiverId: number;
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
  imageUrl: string;
}

type friendship = {
  id: number;
  requester: apiFriend;
  receiver: apiFriend;
  activated: boolean;
  createdDate: string;
}

const FriendList: React.FC<stateType> = (props) => {
  const [errorMessage, setErrorMessage] = useState<String>('');

  const requesterComponents = props.friendList.requester.map((friendship) => {
    return (
      <FriendCard currentUser={props.currentUser}
                  key={friendship.id}
                  id={friendship.id}
                  requesterId={-1}
                  receiverId={friendship.receiver.id}
                  createdDate={friendship.createdDate}
                  activated={friendship.activated}
                  deleteFriendshipCallback={props.deleteFriendshipCallback}
                  confirmFriendshipCallback={props.confirmFriendshipCallback}/>
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
                  deleteFriendshipCallback={props.deleteFriendshipCallback}
                  confirmFriendshipCallback={props.confirmFriendshipCallback}/>
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