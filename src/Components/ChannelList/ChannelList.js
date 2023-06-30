import { FlatList, ListRenderItem } from "react-native";
import React, { FC, useCallback } from "react";
import ChannelItem from "./ChannelItem";

const ChannelList = ({ onChannelPress, onChannelLongPress, ...props }) => {
  const handleChannelPress = useCallback(
    (channel) => {
      onChannelPress(channel);
    },
    [onChannelPress]
  );

  const handleChannelLongPress = useCallback(
    (channel) => {
      onChannelLongPress?.(channel);
    },
    [onChannelLongPress]
  );

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ChannelItem
          channel={item}
          onPress={handleChannelPress}
          onLongPress={handleChannelLongPress}
        />
      );
    },
    [handleChannelLongPress, handleChannelPress]
  );

  return <FlatList {...props} renderItem={renderItem} />;
};

export default ChannelList;
