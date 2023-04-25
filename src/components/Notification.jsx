import React, { useState } from "react";
import CancelIcon from "./CancelIcon";

const Notification = ({ task, i }) => {
  const [hideTask, setHideTask] = useState([]);

  const isTaskCanceled = (index) => {
    return hideTask.includes(index);
  };
  return (
    <div
      className="notification"
      style={{ display: isTaskCanceled(i) && "none" }}
    >
      {task?.task}
      <span
        onClick={() => {
          setHideTask((oldArray) => [...oldArray, i]);
        }}
      >
        <CancelIcon />
      </span>
    </div>
  );
};

export default Notification;
