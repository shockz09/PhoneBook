import React from "react";

const Notify = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className={message.type}>{message.text}</div>;
};

export default Notify;