import React from 'react';

export default function Button({text, className, onClick}) {
  // Declare a new state variable, which we'll call "count"
  return (
      <button className={"btn " + className} onClick={onClick}>
        {text}
      </button>
  );
}