import React, { Fragment } from 'react';
import {  ActionCableConsumer } from 'react-actioncable-provider';

const CableDirect = ({ directconversations, handleReceivedMessage }) => {
  return (
    <Fragment>
      {directconversations.map(directconversation => {
        return (
          <ActionCableConsumer
            key={directconversation.id}  
            channel={{ channel: 'DirectmessagesChannel', directconversation: directconversation.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default CableDirect;