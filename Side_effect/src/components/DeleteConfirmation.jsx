import { useEffect, useState } from "react";

import Progress from './Progress.jsx';
export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(()=>{
    console.log("Start");
    let Time = setTimeout(()=>{
      onConfirm()
    },3000);

    return ()=>{
      console.log("Time Out");
      clearTimeout(Time);
    }
  },[onConfirm])
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <Progress/>
    </div>
  );
}
