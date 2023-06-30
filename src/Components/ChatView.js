import React, { useEffect, useState } from "react";
import { TextInput, View, Button, Text, FlatList } from "react-native";
import { usePubNub } from "pubnub-react";

const ChatView = () => {
  const pubnub = usePubNub();
  const [message, setMessage] = React.useState("");
  const [received, setReceived] = useState({
    messageText: "",
  });
  channel = "myFirst";

  useEffect(() => {
    pubnub.subscribe({ channels: [channel] });
  }, [pubnub, channel]);

  useEffect(() => {
    pubnub.addListener({
      message: (messageEvent) => {
        // Handle incoming message
        // setReceived({ ...received, [messageText]: messageEvent.message });
        console.log("Received message:", messageEvent.message);
      },
    });
  }, [pubnub]);

  const sendMessage = () => {
    pubnub.publish({ channel, message });
    setMessage("");
  };

  return (
    <>
      <View
        style={{
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "green",
        }}
      >
        <TextInput
          placeholder="enter the message"
          value={message}
          onChangeText={(text) => {
            setMessage(text);
          }}
        />
        <Button title="send" onPress={() => sendMessage()} />
      </View>
      <View
        style={{
          height: "50%",
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={received}
          renderItem={(item) => {
            <Text>{item}</Text>;
          }}
        />
      </View>
    </>
  );
};
export default ChatView;
