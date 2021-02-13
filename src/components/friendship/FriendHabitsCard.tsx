import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';

type stateType = {
    key: number;
    id: number;
    friendName: string;
    friendImageUrl: string;
    title: string;
    goal: string;
    habitBuilt: boolean;
    createdDate: string;
    selectFriendHabitCallback: {(habit: {habitId: number, friendName: string, friendImageUrl: string}): void;};
}

const FriendHabitsCard: React.FC<stateType> = (props) => {

  return (
    <div className="card w-100 p-2 bd-highlight m-2 text-left">
      <div className="card-body p-1">
        <div className="d-flex justify-content-end">
            <button className="btn btn-outline-secondary btn-sm"
                    onClick={(e: React.MouseEvent<HTMLElement>) => props.selectFriendHabitCallback({habitId: props.id, friendName: props.friendName, friendImageUrl: props.friendImageUrl})}>Send Message
            </button>
        </div>
        <span className="badge badge-pill badge-success mb-3">
            {!props.habitBuilt ? "" : 
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16">
                <path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                </svg>
                It's part of My Life
            </div> 
            }
        </span>
        <h5 className="display-5"><img className="rounded-circle border border-secondary mr-1" src={props.friendImageUrl} alt={props.friendName}/>{props.friendName}'s Habit#{props.id}
        <br/>Title: {props.title}</h5>
        <h6>Goal: {props.goal}
        <br/>Start date: {props.createdDate}</h6> 
      </div>
    </div>
    )
}

export default FriendHabitsCard;