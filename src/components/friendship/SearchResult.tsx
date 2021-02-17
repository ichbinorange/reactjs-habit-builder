import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { API_BASE_URL } from '../util/BaseUrl';
import './SearchResult.css';
import './FriendCard.css';

type stateType = {
    email: string;
    addFriendCallback: {(receiver: friend): void};
    resetCallback: {(): void};
    friendList: apiFriendship;
    currentUser: any,
}

type friend = {
    id: number;
    imageUrl: string;
    name: string;
    email: string;
    about: string;
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

const SearchResult: React.FC<stateType> = (props) => {
    const [findFriend, setFindFriend] = useState<friend>({id: -1, imageUrl: '', name: '', email: '', about: ''})
    const [errorMessage, setErrorMessage] = useState<String>('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/enjoyer/email/${props.email}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
          .then((response) => {
            const apiUser = response.data;
            if (props.currentUser.id !== apiUser.id) {
                setFindFriend({...apiUser})
                setErrorMessage('')
            } else {
                setErrorMessage(`Error: Ha, don't search yourself.`)
            }
          })
          .catch((error) => {
            setErrorMessage(`Error: Unable to find the email`)
        });
    }, []); 

    const addFriend = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        props.addFriendCallback(findFriend)
        setFindFriend({id: -1, imageUrl: '', name: '', email: '', about: ''})
        props.resetCallback()
    }

    const disableAddFriendButton = () => {
        let disable: boolean = false;
        let activated: boolean = false;
        // check currentUser's requester list 
        const userRequester = props.friendList.requester.filter((friendship) => friendship.receiver.id === findFriend.id) 
        if (userRequester.length === 1) {
            disable = true;
            if (userRequester[0].activated) {
                activated = true;
            } 
        }
        // check currentUser's receiver list 
        const userReceiver = props.friendList.receiver.filter((friendship) => friendship.requester.id === findFriend.id) 
        if (userReceiver.length === 1) {
            disable = true;
            if (userReceiver[0].activated) {
                activated = true;
            } 
        }
        return {disable, activated}
    }

    return (
        <div>
            {findFriend.email.length === 0 ?<div className="alert alert-warning alert-dismissible p-1 mt-2 mb-1">{errorMessage}</div> : 
            <div className="card d-inline-flex mt-2">
                <div className="card-body p-1">
                    <img className="pro-img rounded-circle border border-secondary mr-1" src={findFriend.imageUrl} alt={findFriend.name}/>
                    {findFriend.name}
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id={`tooltip-$"top"`}>{disableAddFriendButton().activated ? `${findFriend.name} is your friend already` : (disableAddFriendButton().disable ? "Friend request pending" : "add friend")}</Tooltip>}>
                        <Button onClick={addFriend}
                                variant="outline-success ml-2 btn-sm"
                                disabled={disableAddFriendButton().disable}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                        </Button>
                    </OverlayTrigger>
                </div>
                <div className="card-body p-1">
                    <h6 className="card-title font-weight-bold"> About {findFriend.name}</h6>
                    <p className="card-text font-weight-light">{findFriend.about === null ? "TBD..." : findFriend.about}</p>
                </div>
            </div>}
        </div>
    )
}

export default SearchResult;
