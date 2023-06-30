import { IMessage } from "react-native-gifted-chat";
import Pubnub from "pubnub";
import { getUsernameForId } from "../hooks/useUsername";

const UsernameCache = new Map();

export const historyToMessages = async (history, channel) => {
  const messages = history.channels[channel];

  if (!messages) {
    return [];
  }

  const messagesWithTimetokens = messages
    .reverse()
    .filter((message) => !!message.timetoken);

  const messagesWithUsernames = [];

  for (const message of messagesWithTimetokens) {
    const createdAt = new Date(Number.parseInt(message.timetoken, 10) / 10000);

    const authorId = message.uuid;

    let username;

    if (!UsernameCache.has(authorId)) {
      username = await getUsernameForId(authorId);

      UsernameCache.set(authorId, username);
    } else {
      username = UsernameCache.get(authorId);
    }

    const messageWithUsername = {
      _id: createdAt.toString() + authorId,
      text: message.message,
      createdAt,
      user: { _id: authorId, name: username },
    };

    messagesWithUsernames.push(messageWithUsername);
  }

  return messagesWithUsernames;
};

export const subscriptionToMessage = async (messageEvent) => {
  const createdAt = new Date(
    Number.parseInt(messageEvent.timetoken, 10) / 10000
  );

  const authorId = messageEvent.publisher;

  let username;

  if (!UsernameCache.has(authorId)) {
    username = await getUsernameForId(authorId);
    UsernameCache.set(authorId, username);
  } else {
    username = UsernameCache.get(authorId);
  }

  return {
    _id: createdAt.toString() + authorId,
    text: messageEvent.message,
    createdAt,
    user: { _id: authorId, name: username },
  };
};
