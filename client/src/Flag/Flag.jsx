import React from 'react';
import flag from './flag.svg';
import './Flag.css';

function Flag() {
  return (
    <div className="Flag">
      <img src={flag} />
    </div>
  );
}

export default Flag;