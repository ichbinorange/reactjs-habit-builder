import React, { useState } from 'react';

type stateType = {
    currentUser: any;
    updateUserCallback: {(enjoyer: object): void;};
}

type form = {
    name: string;
    imageUrl: string;
    about: string;
}

const UpdateEnjoyerForm: React.FC<stateType> = (props) => {
    const [formFields, setFormFields] = useState<form>({
        name: props.currentUser.name,
        imageUrl: props.currentUser.imageUrl,
        about: props.currentUser.about,
    });
    
    // event handlers for input
    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
        setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
    }

    // event handlers for textarea
    const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event)=> {
        setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
    }

    const onFormSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        props.updateUserCallback(formFields);

        setFormFields({
            name: '',
            imageUrl: '',
            about: ''
        })
    }

    return (
    <form onSubmit={onFormSubmit} className="justify-content-center">
        <h2 className="new-card-form__header">Update Your Informatoin</h2>
        <div className="form-group">
        <label className="exampleInputEmail1">Name:</label>
        <input id="name"
                name="name"
                onChange={onInputChange}
                value={formFields.name}
                className="form-control w-50" 
                placeholder={props.currentUser.name ? props.currentUser.name : "Your display name..."}
                type="text"
                />
        <label className="exampleInputEmail1">Your Image:</label>
        <input id="imageUrl"
                name="imageUrl"
                onChange={onInputChange}
                value={formFields.imageUrl}
                className="form-control w-50" 
                placeholder={props.currentUser.imageUrl ? props.currentUser.imageUrl : "Your display image..."}
                type="text"
                />
        <label className="exampleInputEmail1">About You:</label>
        <textarea id="about"
                name="about"
                onChange={onTextareaChange}
                value={formFields.about}
                className="form-control w-50" 
                placeholder={props.currentUser.about ? props.currentUser.about : "Something about you..."}
                />
        <button
            type="submit"
            className="btn btn-outline-success mt-3"
        >Save</button>
        </div>
    </form>
    )
}

export default UpdateEnjoyerForm;