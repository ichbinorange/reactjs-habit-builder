import React, { useState } from 'react';

type stateType = {
    currentUser: any;
    updateUserCallback: {(enjoyer: object): void;};
    cancelUpdateUserCallback: {(enjoyer: object): void;};
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
        <h2 className="new-card-form__header mt-3">Update</h2>
        <div className="form-group">
        <label className="exampleInputEmail1 m-2">Name:</label>
        <input id="name"
                name="name"
                onChange={onInputChange}
                value={formFields.name}
                className="form-control" 
                placeholder={props.currentUser.name ? props.currentUser.name : "Your display name..."}
                type="text"
                />
        <label className="exampleInputEmail1 m-2">Your Image:</label>
        <input id="imageUrl"
                name="imageUrl"
                onChange={onInputChange}
                value={formFields.imageUrl}
                className="form-control" 
                placeholder={props.currentUser.imageUrl ? props.currentUser.imageUrl : "Your display image..."}
                type="text"
                />
        <label className="exampleInputEmail1 m-2">About You:</label>
        <textarea id="about"
                name="about"
                onChange={onTextareaChange}
                value={formFields.about}
                className="form-control"
                rows={8}
                placeholder={props.currentUser.about ? props.currentUser.about : "Something about you..."}
                />
        <button
            onClick={(e: React.MouseEvent<HTMLElement>) => props.cancelUpdateUserCallback}
            className="btn btn-outline-info mt-3 mr-3 btn-sm"
        >Cancel</button>
        <button
            type="submit"
            className="btn btn-outline-success mt-3 btn-sm"
        >Save</button>
        </div>
    </form>
    )
}

export default UpdateEnjoyerForm;