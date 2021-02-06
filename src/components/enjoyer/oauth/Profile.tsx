import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'

import axios from 'axios';
import { API_BASE_URL } from '../../util/BaseUrl';
import UpdateEnjoyerForm from '../UpdateEnjoyerForm';
import './Profile.css';

type stateType = {
    currentUser: any;
    location: any;
}

const Profile: React.FC<stateType> = (props) => {
    const [update, setUpdate] = useState<boolean>(false);
    const [delEnjoyer, setDelEnjoyer] = useState<boolean>(false);
    const [enjoyerInfo, setEnjoyerInfo] = useState({...props.currentUser})
    const [errorMessage, setErrorMessage] = useState<String>('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/enjoyer/${props.currentUser.id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
            .then((response) => {
            const apiEnjoyerInfo = response.data;
                setEnjoyerInfo(apiEnjoyerInfo)
            })
            .catch((error) => {
            setErrorMessage(error.message);
            });
      }, []); // enjoyerInfo to save server's workload

    const updateEnjoyer = (enjoyer: any) => {
        setUpdate(false);
        axios.put(`${API_BASE_URL}/enjoyer/${props.currentUser.id}`, {...enjoyer, id: props.currentUser.id}, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
          .then((response) => {
            const updatedEnjoyer = [...enjoyerInfo, ...enjoyer];
            setEnjoyerInfo(updatedEnjoyer);
            setErrorMessage('');
            console.log(update)
          })
          .catch((error) => {
            setErrorMessage(`Unable to update User Info`);
        });
    }
    
    const deleteEnjoyer = (enjoyer_id: number) => {
        setDelEnjoyer(!delEnjoyer)
        axios.delete(`${API_BASE_URL}/enjoyer/${enjoyer_id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
            setErrorMessage(`Enjoyer ${ enjoyer_id } deleted`);
        })
        .catch((error) => {
            setErrorMessage(`Unable to delete enjoyer ${ enjoyer_id }`);
        })
    }

    const cancelUpdateUser = () => {
        setUpdate(false)
    }

    if(delEnjoyer) {
        return <Redirect to={{
            pathname: "/login",
            state: { 
                from: props.location,
                error: { from: props.location }
            }
        }}/>;            
    }
    return (
        <div className="profile-container">
            <div className="container">
                <div className="row profile-info">
                    <div className="profile-avatar col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                        <div className={props.currentUser.imageUrl ? "" : "text-avatar"}>
                            { enjoyerInfo.imageUrl ? (
                                <img src={ enjoyerInfo.imageUrl } alt={ enjoyerInfo.name }/>
                            ) : (
                                <div>
                                    <span>{ enjoyerInfo.name &&  enjoyerInfo.name[0] }</span>
                                </div>
                            )}
                        </div>
                        <div className="profile-name m-5">
                            <h2>{ enjoyerInfo.name }</h2>
                            <p className="profile-email m-2">{ enjoyerInfo.email }</p>
                            <p className="m-4">{enjoyerInfo.about}</p>
                        </div>
                        <button
                            onClick={(e: React.MouseEvent<HTMLElement>) => setUpdate(true)}
                            className="btn btn-outline-info"
                        >Edit</button>
                        <button
                            onClick={() => deleteEnjoyer(enjoyerInfo.id)}
                            className="btn btn-outline-danger m-3"
                            data-testid={enjoyerInfo.id}>
                            Delete Account
                        </button>
                        { update ? <UpdateEnjoyerForm updateUserCallback={updateEnjoyer}
                                                    cancelUpdateUserCallback={cancelUpdateUser}
                                                    currentUser={ enjoyerInfo }/> : null}
                               
                    </div>
                </div>
            </div>    
        </div>
    );
    
}

export default Profile;