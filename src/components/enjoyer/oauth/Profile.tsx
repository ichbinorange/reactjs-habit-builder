import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../util/BaseUrl';
import UpdateEnjoyerForm from '../UpdateEnjoyerForm';
import './Profile.css';

type stateType = {
    currentUser: any;
}

const Profile: React.FC<stateType> = (props) => {
    const [update, setUpdate] = useState<boolean>(false);
    const [enjoyerInfo, setEnjoyerInfo] = useState({...props.currentUser})
    const [errorMessage, setErrorMessage] = useState<String>('');

    useEffect(() => {
        if (update) {
            
        } else {
            axios.get(`${API_BASE_URL}/enjoyer/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
              .then((response) => {
                const apiEnjoyerInfo = response.data;
                  setEnjoyerInfo(apiEnjoyerInfo)
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
        }
      }, []);  // [enjoyerInfo] turn it off for mac less works to read data from server, should turn it on when final depoly

    const updateEnjoyer = (enjoyer: any) => {
        axios.put(`${API_BASE_URL}/enjoyer/${props.currentUser.id}`, {...enjoyer, id: props.currentUser.id}, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
          .then((response) => {
            const updatedEnjoyer = [...enjoyerInfo, ...enjoyer];
            setEnjoyerInfo(updatedEnjoyer);
            setErrorMessage('');
            setUpdate(false);
          })
          .catch((error) => {
            setErrorMessage(`Unable to update User Info`);
        });
    }
    
    const deleteEnjoyer = (enjoyer_id: number) => {
        axios.delete(`${API_BASE_URL}/enjoyer/${enjoyer_id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
            setErrorMessage(`Enjoyer ${ enjoyer_id } deleted`);
        })
        .catch((error) => {
            setErrorMessage(`Unable to delete enjoyer ${ enjoyer_id }`);
        })
    }

    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        <div className="text-avatar">
                            <img src={props.currentUser.imageUrl} alt={ props.currentUser.name }/>
                        </div>
                        <div className="profile-name">
                            <h2>{ props.currentUser.name }</h2>
                            <p className="profile-email">{ props.currentUser.email }</p>
                            <p>{props.currentUser.about}</p>
                        </div>
                        <button
                            onClick={(e: React.MouseEvent<HTMLElement>) => setUpdate(true)}
                            className="btn btn-outline-info"
                        >Edit</button>
                        <button
                            onClick={() => deleteEnjoyer(props.currentUser.id)}
                            className="btn btn-outline-danger m-3"
                            data-testid={props.currentUser.id}>
                            Delete Account
                        </button>
                        { update ? <UpdateEnjoyerForm updateUserCallback={updateEnjoyer}
                                            currentUser={ props.currentUser }/> : null}
                               
                    </div>
                </div>
            </div>    
        </div>
    );
    
}

export default Profile;