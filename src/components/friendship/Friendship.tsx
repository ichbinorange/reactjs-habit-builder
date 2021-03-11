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
  imageUrl: string;
}

type friendship = {
  id: number;
  requester: apiFriend;
  receiver: apiFriend;
  activated: boolean;
  createdDate: string;
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

type returnUpdateInfo ={
  friendshipId: number;
  receiverId: number;
}

const Friendship: React.FC<stateType> = (props) => {
  const [friendList, setFriendList] = useState<apiFriendship>({requester: [], receiver: []});
  const [tempFrindshipId, setTempFrindshipId] = useState<number>(-1)
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
        // add this to temp update friend list for useEffect
        setFriendList({requester: [...friendList.requester, {id: tempFrindshipId, requester: {id: props.currentUser.id, name: '', about: '', email: '', imageUrl: ''}, receiver: {id: receiver.id, name: receiver.name, about: '', email: receiver.email, imageUrl: receiver.imageUrl}, activated: false, createdDate: ''}],receiver: friendList.receiver})
        setTempFrindshipId(tempFrindshipId-1)

        setErrorMessage('Successufully send the friend request');
        onShowAlert();
      })
      .catch((error) => {
        setErrorMessage(`Unable to add this friend`);
    });
  }

  const deleteFriendship = (friendshipId: number) => {
    const updatedFriendListRequester = friendList.requester.filter((friendship: friendship) => {
      return friendship.id !== friendshipId;
    });

    const updatedFriendListReceiver = friendList.receiver.filter((friendship: friendship) => {
      return friendship.id !== friendshipId;
    });

    if (updatedFriendListRequester.length < friendList.requester.length || updatedFriendListReceiver.length < friendList.receiver.length  ) {
      axios.delete(`${API_BASE_URL}/friendship/${friendshipId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
          setErrorMessage(`Friendship ${ friendshipId } deleted`);
        })
        .catch((error) => {
          setErrorMessage(`Unable to delete friendship ${ friendshipId }`);
      })
      // add this to temp update friend list for useEffect
      updatedFriendListRequester.length < friendList.requester.length ? setFriendList({requester: updatedFriendListRequester, receiver: friendList.receiver}) : setFriendList({requester: friendList.requester, receiver: updatedFriendListReceiver});
    }
  }

  const confirmFriendship = (update: returnUpdateInfo) => {
    const updatedFriendListReceiver = friendList.receiver.filter((friendship: friendship) => {
      return friendship.id === update.friendshipId;
    });
    if (updatedFriendListReceiver.length === 1) {
      updatedFriendListReceiver[0].activated = true;
      axios.put(`${API_BASE_URL}/friendship/${update.friendshipId}/receiver/${update.receiverId}`, update, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
          // add this to temp update friend list for useEffect 
          setFriendList({requester: friendList.requester, receiver: [...friendList.receiver]})
          setErrorMessage(`Friendship ${ update.friendshipId } is confirmed`);
        })
        .catch((error) => {
          setErrorMessage(`Unable to confirm friendship ${ update.friendshipId }`);
      })
    }
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
                          friendList={friendList}
                          deleteFriendshipCallback={deleteFriendship}
                          confirmFriendshipCallback={confirmFriendship}/>
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