import React from 'react'
import "./button.css";

export default function Button({label}) {
   return (
      <button data-testid="button" id="button" className="main-button">
         {label}
      </button>
   )
}
