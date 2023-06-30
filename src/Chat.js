/* Imports PubNub JavaScript and React SDKs to create and access PubNub instance accross your app. */
/* Imports the required PubNub Chat Components to easily create chat apps with PubNub. */
import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import {
  Chat,
  MessageList,
  MessageInput,
} from "@pubnub/react-native-chat-components";

/* Creates and configures your PubNub instance. Be sure to replace "myPublishKey" and "mySubscribeKey"
  with your own keyset. If you wish, modify the default "myFirstUser" userId value for the chat user. */
const pubnub = new PubNub({
  publishKey: "pub-c-e549c51f-69f5-4b89-9d87-532523bbd997",
  subscribeKey: "sub-c-9a428d39-490d-4bef-9c4c-8a0ea9b24a8b",
  userId: "User2",
});
const currentChannel = "Tony";
const theme = "light";

const ChatApp = () => {
  return (
    <PubNubProvider client={pubnub}>
      {/* PubNubProvider is a part of the PubNub React SDK and allows you to access PubNub instance
        in components down the tree. */}
      <Chat {...{ currentChannel, theme }}>
        {/* Chat is an obligatory state provider. It allows you to configure some common component
          options, like the current channel and the general theme for the app. */}
        <MessageList />
        <MessageInput />
      </Chat>
    </PubNubProvider>
  );
};
export default ChatApp;
