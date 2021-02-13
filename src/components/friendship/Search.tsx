import React, { useState } from 'react';

type stateType = {
    searchEmailCallback: {(query: string): void};
    resetCallback: {(): void};
}

type form ={
  text: string
}

const Search: React.FC<stateType> = (props) => {
  const [formFields, setFormFields] = useState<form>({text: ""})

  // event handlers for input
  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
    setFormFields({...formFields, [event.target.name]: event.currentTarget.value})
  }

  const clearSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormFields({
      text: ""
    })
    props.resetCallback()
  }

  const onFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.searchEmailCallback(formFields.text);

    setFormFields({
      text: ""
    })
  }

  return (
    <div className="container">
        <h6>Search and Add a friend</h6>
        <form onSubmit={onFormSubmit} className="input-group">
          <input id="text"
                  name="text"
                  onChange={onInputChange}
                  value={formFields.text}
                  className="form-control d-inline"
                  type="text"
                  placeholder="Search by email" />
          {/* clear butotn */}
          <button className="btn btn-outline-secondary btn-sm ml-1 d-inline" 
                  onClick={clearSubmit}
                  type="button"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
          {/* search button */}
          <button className="btn btn-outline-info btn-sm ml-1 d-inline" 
                  type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </form>
    </div>
  );
}

export default Search;