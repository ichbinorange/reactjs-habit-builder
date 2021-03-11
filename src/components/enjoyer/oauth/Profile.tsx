import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import { API_BASE_URL } from '../../util/BaseUrl';
import UpdateEnjoyerForm from '../UpdateEnjoyerForm';
import './Profile.css';

type stateType = {
    currentUser: any;
    location: any;
    onLogout: {(): void;};
}

const Profile: React.FC<stateType> = (props) => {
    const [update, setUpdate] = useState<boolean>(false);
    const [delEnjoyer, setDelEnjoyer] = useState<boolean>(false);
    const [enjoyerInfo, setEnjoyerInfo] = useState({...props.currentUser});
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
    }, []); 

    const updateEnjoyer = (enjoyer: any) => {
        setUpdate(false);
        axios.put(`${API_BASE_URL}/enjoyer/${props.currentUser.id}`, {...enjoyer, id: props.currentUser.id}, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
          .then((response) => {
            const updatedEnjoyer = {...enjoyerInfo, ...enjoyer};
            setEnjoyerInfo(updatedEnjoyer);
            setErrorMessage('Successufully update your profile');
          })
          .catch((error) => {
            setErrorMessage(`Unable to update your profile`);
        });
    }
    
    const deleteEnjoyer = (enjoyerId: number) => {
        setDelEnjoyer(!delEnjoyer)
        axios.delete(`${API_BASE_URL}/enjoyer/${enjoyerId}`, { headers: { 'Authorization': `Bearer ${localStorage.accessToken}` } })
        .then((response) => {
            localStorage.clear();
            setErrorMessage(`Enjoyer ${ enjoyerId } deleted`);
        })
        .catch((error) => {
            setErrorMessage(`Unable to delete enjoyer ${ enjoyerId }`);
        })
    }

    const cancelUpdateUser = () => {
        setUpdate(false)
    }

    if(delEnjoyer) {
        props.onLogout()
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
                        <img className="profile-img rounded-circle" src={ enjoyerInfo.imageUrl } alt={ enjoyerInfo.name }/>
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
                                <div className="text-left">
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

                        <button type="button" className="btn btn-outline-danger ml-2 btn-sm" data-toggle="modal" data-target={`#user#${enjoyerInfo.id}`}>Delete Account</button>
                        <div className="modal" id={`user#${enjoyerInfo.id}`}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            Delete your account
                                    </div>
                                    <div className="modal-footer p-0">
                                        <button type="button" 
                                                className="btn btn-outline-danger ml-3 btn-sm" 
                                                data-dismiss="modal"
                                                onClick={() => deleteEnjoyer(enjoyerInfo.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>    
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