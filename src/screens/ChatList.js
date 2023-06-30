import React, { useCallback } from "react";
import { FC, useEffect, useState } from "react";
import { usePubNub } from "pubnub-react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  historyToMessages,
  subscriptionToMessage,
} from "../utils/dataTransformers";
import { useUserStore } from "../store/userStore";

const Chat = ({ route }) => {
  const user = useUserStore((state) => state.user);
  const userId = user?.uid; // we know user is not null here

  const { channelId } = route.params;

  const pubnub = usePubNub();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let shouldSetMessages = true;

    const fetchHistory = async () => {
      try {
        const response = await pubnub.fetchMessages({
          channels: [channelId],
          includeUUID: true,
          count: 50,
        });

        if (!shouldSetMessages) {
          return;
        }

        const historyMessages = await historyToMessages(response, channelId);

        setMessages(historyMessages);
      } catch (e) {
        console.log("error fetching history", e);
      }
    };

    fetchHistory();

    return () => {
      shouldSetMessages = false;
    };
  }, [pubnub, channelId]);

  const fetchMore = useCallback(async () => {
    const oldestMessage = messages[0];

    if (!oldestMessage) {
      return;
    }

    const oldestMessageCreatedAt =
      typeof oldestMessage.createdAt === "object"
        ? Number(oldestMessage.createdAt.getTime() * 1000)
        : oldestMessage.createdAt * 1000;

    const response = await pubnub.fetchMessages({
      channels: [channelId],
      includeUUID: true,
      count: 50,
      start: oldestMessageCreatedAt,
    });

    const newMessages = await historyToMessages(response, channelId);
   

    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  }, [pubnub, channelId, messages]);

  const onSend = useCallback(
    async (messagesToSend) => {
      if (messagesToSend.length > 0) {
        await pubnub.publish({
          channel: channelId,
          message: messagesToSend[0].text,
        });
      }
    },
    [pubnub, channelId]
  );

  useEffect(() => {
    const handleMessage = async (messageEvent) => {
      const message = await subscriptionToMessage(messageEvent);

      setMessages((prevMessages) => [message, ...prevMessages]);
    };

    const listenerParams = {
      message: handleMessage,
    };

    pubnub.addListener(listenerParams);
    pubnub.subscribe({ channels: [channelId] });

    return () => {
      pubnub.unsubscribe({ channels: [channelId] });
      pubnub.removeListener(listenerParams);
    };
  }, [channelId, pubnub]);

  // console.log(messages);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      onLoadEarlier={fetchMore}
      renderUsernameOnMessage
      user={{
        _id: userId,
      }}
      alignTop={true}
      initialText={""}
    />
  );
};

export default Chat;
