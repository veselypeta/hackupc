import React from 'react';
import person from './person.svg';
import './Person.css';

function Person() {
  return (
    <div className="Person">
      <img src={person} />
    </div>
  );
}

export default Person;