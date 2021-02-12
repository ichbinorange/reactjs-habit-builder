import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../util/BaseUrl';
import Search from './Search';
import SearchResult from './SearchResult';
import NewMessageForm from './NewMessageForm';
import FriendList from './FriendList';

type stateType = {
  currentUser: any,
}

type friend = {
  id: number;
  imageUrl: string;
  name: string;
  email: string;
}

const Friendship: React.FC<stateType> = (props) => {
  const [selectedHabitId, setSelectedHabitId] = useState<number>(-1)
  const [searchEmail, setSearchEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<String>('');

  const setEmail = (query: string) => {
    setSearchEmail(query)
  }

  const resetSearch = () => {
    setSearchEmail('')
  }

  const addFriend = (receiver: friend) => {
    axios.post(`${API_BASE_URL}/friendship/requester/${props.currentUser.id}/receiver/${receiver.id}`, receiver, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => { 
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(`Unable to add this friend`);
    });
  }
  
  const addMessage = (msg: any) => {
    axios.post(`${API_BASE_URL}/habit/${selectedHabitId}/habitMsg/${props.currentUser.id}`, msg, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        // msg is not for current user but for friends, no need for msg list 
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(`Unable to add a new habit`);
    });
  }

  return (
      <div className="container">
        <h1 className="mb-5 text-center">Support your Friends</h1>
        <div className="row">
          <div className="col-3 text-center">
            <h5 className="mb-2">Friend List</h5>
            <div>
              <FriendList currentUser={props.currentUser}/>
            </div>
          </div>
          <div className="col-5 text-center">
            <p>friends' habit cards</p>
          </div>
          <div className="col-4 text-center">
            <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
              <Search searchEmailCallback={setEmail}
                      resetCallback={resetSearch} /> 
              {searchEmail.length !== 0 ? <SearchResult email={searchEmail} 
                                                        addFriendCallback={addFriend}
                                                        currentUser={props.currentUser}/> : null} 
            </div>
            <hr className="style1"></hr>
            <div className="card w-100 d-inline-flex p-2 bd-highlight m-2">
              <div className="card-body">
                <NewMessageForm habitId={selectedHabitId}
                                addMessageCallback={addMessage}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Friendship;