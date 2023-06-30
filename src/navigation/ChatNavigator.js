import React, { useMemo } from "react";
import { PubNubProvider } from "pubnub-react";
import Pubnub from "pubnub";
import ChatList from "../screens/ChatList";
import ChatScreen from "../screens/ChatScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useUserStore } from "../store/userStore";

const Stack = createStackNavigator();
const ChatNavigator = () => {
  const user = useUserStore((state) => state.user);
  const userId = user?.uid;
  const pubnub = useMemo(
    () =>
      new Pubnub({
        publishKey: "pub-c-e549c51f-69f5-4b89-9d87-532523bbd997",
        subscribeKey: "sub-c-9a428d39-490d-4bef-9c4c-8a0ea9b24a8b",
        uuid: userId,
      }),
    [userId]
  );
  return (
    <PubNubProvider client={pubnub}>
      <Stack.Navigator initialRouteName={"ChatScreen"}>
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </PubNubProvider>
  );
};

export default ChatNavigator;
