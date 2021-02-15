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
          })
          .catch((error) => {
            setErrorMessage(`Unable to update User Info`);
        });
    }
    
    const deleteEnjoyer = (enjoyer_id: number) => {
        setDelEnjoyer(!delEnjoyer)
        axios.delete(`${API_BASE_URL}/enjoyer/${enjoyer_id}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
            localStorage.clear();
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
        <div className="container component-bkgd pt-5 p-4">
            <h1 className="mb-5 text-center">Your Profile</h1>
            <div className="row profile-info">
                <div className={props.currentUser.imageUrl ? "col-sm" : "col-sm"}>
                    { enjoyerInfo.imageUrl ? (
                        <img className="w-75 rounded-circle border border-secandary" src={ enjoyerInfo.imageUrl } alt={ enjoyerInfo.name }/>
                    ) : (
                        <div>
                            <span>{ enjoyerInfo.name &&  enjoyerInfo.name[0] }</span>
                        </div>
                    )}
                </div>
                <div className="col-sm">
                    <div className="text-center m-5">
                        <h2>{ enjoyerInfo.name }</h2>
                        <p className="text-center m-2">{ enjoyerInfo.email }</p>
                        <h5 className="mt-5 text-center"> About you</h5>
                        <div className="card d-inline-flex mt-2">
                            <div className="card-body">
                                <div>
                                    <p>{enjoyerInfo.about}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={(e: React.MouseEvent<HTMLElement>) => setUpdate(true)}
                            className="btn btn-outline-info btn-sm"
                        >Edit</button>
                        <button
                            onClick={() => deleteEnjoyer(enjoyerInfo.id)}
                            className="btn btn-outline-danger ml-3 btn-sm"
                            data-testid={enjoyerInfo.id}>
                            Delete Account
                        </button>
                    </div>
                </div>
                { update ? <div className="col-sm text-center m-5">
                                <UpdateEnjoyerForm updateUserCallback={updateEnjoyer}
                                                    cancelUpdateUserCallback={cancelUpdateUser}
                                                    currentUser={ enjoyerInfo }/> 
                            </div> : null}
            </div>
        </div>    
    );
    
}

export default Profile;