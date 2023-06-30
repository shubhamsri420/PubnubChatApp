import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, IconButton, FAB, Text } from "react-native-paper";
import { usePubNub } from "pubnub-react";
import NewChatChannelDialog from "../Components/NewChatChannelDialog";
import ChannelList from "../Components/ChannelList/ChannelList";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import useUsername from "../hooks/useUsername";
import SetUsernameDialog from "../Components/SetUsernameDialog";

const ChatList = () => {
  const pubnub = usePubNub();
  const navigation = useNavigation();

  const [channels, setChannels] = useState([]);

  const updateChannels = useCallback(async () => {
    const response = await pubnub.channelGroups.listChannels({
      channelGroup: "awesome-group",
    });
    setChannels(response.channels);
  }, [pubnub]);

  const createChannel = useCallback(
    async (name) => {
      await pubnub.channelGroups.addChannels({
        channelGroup: "awesome-group",
        channels: [name],
      });
      await updateChannels();
    },
    [pubnub.channelGroups, updateChannels]
  );

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LogInScreen");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [newChannelModalVisible, setNewChannelModalVisible] = useState(false);

  const showCreateChannelModal = useCallback(() => {
    setNewChannelModalVisible(true);
  }, []);

  const hideCreateChannelModal = useCallback(() => {
    setNewChannelModalVisible(false);
  }, []);

  const HeaderButtons = useMemo(() => {
    return <IconButton icon={"plus"} onPress={showCreateChannelModal} />;
  }, [showCreateChannelModal]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => HeaderButtons,
    });
  }, [HeaderButtons, navigation]);

  useEffect(() => {
    updateChannels();
  }, [pubnub, updateChannels]);

  const openChat = useCallback(
    (channel) => {
      navigation.navigate("ChatList", { channelId: channel.name });
    },
    [navigation]
  );

  const deleteChannel = useCallback(
    async (channel) => {
      await pubnub.channelGroups.removeChannels({
        channelGroup: "awesome-group",
        channels: [channel.name],
      });
      await updateChannels();
    },
    [pubnub.channelGroups, updateChannels]
  );

  const showDeleteChannelAlert = useCallback(
    async (channel) => {
      Alert.alert(
        "Delete channel",
        `Are you sure you want to delete channel ${channel.name}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: () => deleteChannel(channel) },
        ]
      );
    },
    [deleteChannel]
  );

  const [showSetUsernameModal, setShowSetUsernameModal] = useState(false);
  const { saveUsername } = useUsername();

  return (
    <View style={styles.container}>
      <ChannelList
        onChannelPress={openChat}
        onChannelLongPress={showDeleteChannelAlert}
        data={channels.map((channel) => ({ name: channel }))}
      />
      <Button onPress={() => setShowSetUsernameModal(true)}>
        Set new username
      </Button>
      <FAB style={styles.fab} icon="logout" onPress={handleLogOut} />
      {newChannelModalVisible && (
        <NewChatChannelDialog
          onConfirm={createChannel}
          onDismiss={hideCreateChannelModal}
        />
      )}
      {showSetUsernameModal && (
        <SetUsernameDialog
          onConfirm={saveUsername}
          onDismiss={() => setShowSetUsernameModal(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ChatList;
