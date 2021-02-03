import React, { useState } from 'react';

const Enjoyer: React.FC<{ content: string }> = (props) => {
  console.log(props)
  return (
    <div>
      <h1>enjoyer</h1>
    </div>
  );
}

export default Enjoyer;