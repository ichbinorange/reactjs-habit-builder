import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';

type stateType = {
  currentUser: any;
  key: number;
  id: number;
  requesterId: number;
  receiverId: number;
  createdDate: string;
  activated: boolean;
  deleteFriendshipCallback: {(friendship_id: number): void;};
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
  
const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric'};

const FriendCard: React.FC<stateType> = (props) => {
  const [friend, setFriend] = useState<friend>({
    id: -1,
    name: '',
    about: '',
    email: '',
    emailVerified: false,
    imageUrl: '',
    password: '',
    provider: '',
    providerId: -1,
    createdDate: '',
    lastModifiedDate: '',
  })
  const [errorMessage, setErrorMessage] = useState<String>('');

  useEffect(() => {
    if (props.requesterId !== -1) {
        axios.get(`${API_BASE_URL}/enjoyer/${props.requesterId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
          .then((response) => {
            const apiFriend = response.data;
            setFriend({...apiFriend});
          })
          .catch((error) => {
            setErrorMessage(error.message);
      });
    } else if (props.receiverId !== -1) {
        axios.get(`${API_BASE_URL}/enjoyer/${props.receiverId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
          .then((response) => {
            const apiFriend = response.data;
            setFriend({...apiFriend});
          })
          .catch((error) => {
            setErrorMessage(error.message);
      });
    }
  }, [friend]); 

  console.log(props.currentUser.id)
  console.log(props.requesterId)
  console.log(props.receiverId)
  console.log(friend.imageUrl)
  console.log(friend.name)
  return (
    <div className="card w-100 d-inline-flex bd-highlight m-1">
      <div className="card-body">
        <div>
            <img className="rounded-circle border border-secondary mr-1" src={friend.imageUrl} alt={friend.name}/>
            {friend.name}
            <button
                onClick={() => props.deleteFriendshipCallback(props.id)}
                className="btn btn-outline-danger btn-sm ml-1"
                data-testid={props.id}>Delete
            </button>
            <p className="mt-1">{props.activated ? `Friend since: ${(new Date(props.createdDate)).toLocaleString('en-US', DATE_OPTIONS)}` : 
                (props.currentUser.id === props.receiverId ? (<button>Confirm</button>) : "Request pending")}</p>
        </div>
      </div>
    </div>
  )
}

export default FriendCard;