import React from "react";

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }
  return <h1 className={messageType}>{message}</h1>;
};

export default Notification;
