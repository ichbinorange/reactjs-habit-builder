import React from 'react';

type stateType = {
    key: number;
    id: number;
    createdDate: string;
    text: string;
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
    <div className="card w-100 p-2 bd-highlight m-2 text-left">
      <div className="card-body p-1">
        <h6 className="display-5">From: <img className="rounded-circle border border-secondary mr-1" src={props.friend.imageUrl} alt={props.friend.name}/>{props.friend.name}
        <br/>For habit#{props.habit.id} - {props.habit.title}</h6>
        <p>Time: {(new Date(props.createdDate)).toLocaleString('en-US', DATE_OPTIONS)}
        <br/>Message: {props.text}</p> 
      </div>
      <div className="text-center">
        <button
            onClick={() => props.deleteMsgCallback(props.id)}
            className="btn btn-outline-danger btn-sm">
            Delete
        </button>
      </div>
    </div>
    )
}

export default MsgCard;