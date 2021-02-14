import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import { API_BASE_URL } from '../util/BaseUrl';

// type from parent component
type stateType = {
  currentUser: any;
  key: number;
  id: number;
  requesterId: number;
  receiverId: number;
  createdDate: string;
  activated: boolean;
  deleteFriendshipCallback: {(friendshipId: number): void;};
  confirmFriendshipCallback: {(update: returnUpdateInfo): void;};
}

// type for update(confirm) the friendship
type returnUpdateInfo ={
  friendshipId: number;
  receiverId: number;
}

// type for data from server
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
  }, []); 

  return (
    <div className="card w-100 d-inline-flex bd-highlight m-1">
      <div className="card-body p-2">
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-$"top"`}>{friend.email}</Tooltip>}>
            <Button variant="outline-light">
              <img className="rounded-circle border border-secondary" src={friend.imageUrl} alt={friend.name}/>
            </Button>
        </OverlayTrigger>
        {friend.name}
        <button
            onClick={() => props.deleteFriendshipCallback(props.id)}
            className="btn btn-outline-danger btn-sm ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
            </svg>
        </button>
        <div className="mt-1">{props.activated ? `Friend since: ${(new Date(props.createdDate)).toLocaleString('en-US', DATE_OPTIONS)}` : 
          (
            <div>
              {props.receiverId !== -1 ? "Request pending" : 
              <button className="btn btn-outline-success btn-sm"
                      onClick={() => props.confirmFriendshipCallback({friendshipId: props.id,
                        receiverId: props.currentUser.id})}>Confirm
              </button> }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendCard;