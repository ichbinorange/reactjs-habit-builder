import React from 'react';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import '../friendship/FriendCard.css';

type stateType = {
    key: number;
    id: number;
    createdDate: string;
    text: string;
    imageUrl: string;
    habit: apiHabit;
    friend: apiFriend; 
    deleteMsgCallback: {(habitMsgId: number): void;}
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

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

const MsgCard: React.FC<stateType> = (props) => {
  return (
    <div className="card w-100 p-2 bd-highlight mb-2 text-left">
      <div className="card-body p-0">
        <div className="p-0 font-weight-bold">From: 
          <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-$"top"`}>{props.friend.email}</Tooltip>}>
              <Button variant="outline-light">
              <img className="pro-img rounded-circle border border-secondary" src={props.friend.imageUrl} alt={props.friend.name}/>
              </Button>
          </OverlayTrigger>
        {props.friend.name}</div>
        <div>For #{props.habit.id} - {props.habit.title}</div>

        <div className="card">
          <img className="card-img-top" src={props.imageUrl} alt="Card image cap"/>
          <div className="card-body">
            <p className="card-text">{props.text}</p>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between p-0">
        <div>
          {(new Date(props.createdDate)).toLocaleString('en-US', DATE_OPTIONS)}
        </div>
        <button
            onClick={() => props.deleteMsgCallback(props.id)}
            className="btn btn-outline-danger btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </button>
      </div>
    </div>
    )
}

export default MsgCard;