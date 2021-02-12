import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import './SearchResult.css';

type stateType = {
    email: string;
    addFriendCallback: {(receiver: friend): void};
    currentUser: any,
}

type friend = {
    id: number;
    imageUrl: string;
    name: string;
    email: string;
}

const SearchResult: React.FC<stateType> = (props) => {
    const [findFriend, setFindFriend] = useState<friend>({id: -1, imageUrl: '', name: '', email: ''})
    const [errorMessage, setErrorMessage] = useState<String>('');

    useEffect(() => {
        console.log(props.email)
        axios.get(`${API_BASE_URL}/enjoyer/email/${props.email}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
          .then((response) => {
            const apiUser = response.data;
            if (props.currentUser.id !== apiUser.id) {
                setFindFriend({id: apiUser.id, imageUrl: apiUser.imageUrl, name: apiUser.name, email: apiUser.email})
                setErrorMessage('')
            } else {
                setErrorMessage(`Error: Ha, don't search yourself.`)
            }
          })
          .catch((error) => {
            setErrorMessage(`Error: Unable to find the email`)
        });
    }, []); 

    return (
        <div>
            {findFriend.email.length === 0 ? errorMessage : 
            <div className="card d-inline-flex mt-2">
                <div className="card-body">
                    <img className="rounded-circle border border-secondary mr-1" src={findFriend.imageUrl} alt={findFriend.name}/>
                    {findFriend.name}
                    <button onClick={(e: React.MouseEvent<HTMLElement>) => props.addFriendCallback(findFriend)}
                            className="btn btn-outline-success ml-1 btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default SearchResult;
