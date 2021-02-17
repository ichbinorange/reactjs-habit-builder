import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from "react-bootstrap";

import { API_BASE_URL } from '../util/BaseUrl';
import Search from './Search';
import SearchResult from './SearchResult';
import NewMessageForm from '../habitMsg/NewMessageForm';
import FriendList from './FriendList';
import FriendHabits from './FriendHabits';

type stateType = {
  currentUser: any,
}

type friend = {
  id: number;
  imageUrl: string;
  name: string;
  email: string;
}

// user data structure from server
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

type apiFriendship = {
  requester: Array<friendship>;
  receiver: Array<friendship>;
}

type selectHabit = {
  habitId: number; 
  friendName: string; 
  friendImageUrl: string;
}

const Friendship: React.FC<stateType> = (props) => {
  const [friendList, setFriendList] = useState<apiFriendship>({requester: [], receiver: []});
  const [selectedHabit, setSelectedHabit] = useState<selectHabit>({habitId: -1, friendName: '', friendImageUrl: ''})
  const [searchEmail, setSearchEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<String>('');
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/friendship/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
    .then((response) => {
        const apiFriendList = response.data;
        if (apiFriendList.length !== 0) {
        setFriendList({...apiFriendList});
        } else {
        setFriendList(apiFriendList)
        }
    })
    .catch((error) => {
        setErrorMessage(error.message);
    });
  }, []); 

  const onShowAlert = () => {
    setErrorVisible(true) // true
    const timer = window.setTimeout(()=>{
      setErrorVisible(false) // false
    },4000);
    return () => clearTimeout(timer);
  }

  const selectFriendHabit = (habit: selectHabit) => {
    setSelectedHabit(habit)
  }

  const deselectFriendHabit = (habit: selectHabit) => {
    setSelectedHabit(habit)
  }

  const setEmail = (query: string) => {
    setSearchEmail(query)
  }

  const resetSearch = () => {
    setSearchEmail('')
  }

  const addFriend = (receiver: friend) => {
    axios.post(`${API_BASE_URL}/friendship/requester/${props.currentUser.id}/receiver/${receiver.id}`, receiver, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => { 
        setErrorMessage('Successufully send the friend request');
        onShowAlert();
      })
      .catch((error) => {
        setErrorMessage(`Unable to add this friend`);
    });
  }
  
  const addMessage = (msg: any) => {
    axios.post(`${API_BASE_URL}/habit/${selectedHabit.habitId}/habitMsg/${props.currentUser.id}`, msg, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
      .then((response) => {
        // msg is not for current user but for friends, no need for msg list 
        setErrorMessage('Successufully send the message');
        onShowAlert();
      })
      .catch((error) => {
        setErrorMessage(`Unable to add a new habit`);
    });
  }

  return (
      <div className="container component-bkgd pt-5 p-4">
        {errorVisible && errorMessage.includes('Successuful') ? <Alert variant="success" className="text-center" >{errorMessage}</Alert> : null}
        <h1 className="mb-5 text-center">Support your Friends</h1>
        <div className="row">
          <div className="col-3 text-center">
            <h5 className="mb-2">Friend List</h5>
            <div>
              <FriendList currentUser={props.currentUser}
                          friendList={friendList}/>
            </div>
          </div>
          <div className="col-5 text-center">
            <h5 className="mb-2">Friends Habits</h5>
            <div>
              <FriendHabits currentUser={props.currentUser}
                            friendList={friendList}
                            selectFriendHabitCallback={selectFriendHabit}/>
            </div>
          </div>
          <div className="col-4 text-center">
            <div className="card w-100 d-inline-flex p-2 bd-highlight">
              <Search searchEmailCallback={setEmail}
                      resetCallback={resetSearch} /> 
              {searchEmail.length !== 0 ? <SearchResult email={searchEmail} 
                                                        addFriendCallback={addFriend}
                                                        resetCallback={resetSearch}
                                                        friendList={friendList}
                                                        currentUser={props.currentUser}/> : null} 
            </div>
            <hr className="style1"></hr>
            <div className="card w-100 d-inline-flex bd-highlight">
              <div className="card-body">
                <NewMessageForm habit={selectedHabit}
                                addMessageCallback={addMessage}
                                deselectFriendHabitCallback={deselectFriendHabit}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Friendship;