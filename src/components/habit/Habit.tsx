import React, { useState } from 'react';

const Habit: React.FC<{ content: string }> = (props) => {
  console.log(props)
  return (
    <div>
      <h1>habits</h1>
    </div>
  );
}

export default Habit;