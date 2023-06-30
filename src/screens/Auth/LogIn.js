import React, { FC, useCallback, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { validateAuth } from "../../utils/validation";
import { useNavigation } from "@react-navigation/native";
import { not } from "../../utils/utils";
import { auth } from "../../../firebase";
import { parseFirebaseAuthError } from "../../utils/auth";
import { signInWithEmailAndPassword } from "@firebase/auth";

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [formErrors, setFormErrors] = useState([]);

  const onSubmit = async () => {
    await signInWithEmailAndPassword(auth, email, password).then((user) => {
      navigation.navigate("ChatScreen");
    });
    Keyboard.dismiss();
  };
  const onSubmitPressed = useCallback(async () => {
    setFormErrors([]);

    const validationResult = await validateAuth({ email, password });

    if (!validationResult.valid) {
      setFormErrors(validationResult.errors);
      return;
    }

    onSubmit(email, password);
  }, [email, onSubmit, password]);

  const onRegisterButtonPress = useCallback(() => {
    navigation.navigate("RegisterScreen");
  }, [navigation]);
  const buttonText = "login";

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label={"Email"}
          mode={"outlined"}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.shim} />

        <TextInput
          label={"Password"}
          mode={"outlined"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordHidden}
          right={
            <TextInput.Icon icon="eye" onPress={() => setPasswordHidden(not)} />
          }
        />
        <View style={styles.shim} />

        <Button mode={"contained"} onPress={onSubmitPressed}>
          {buttonText}
        </Button>
      </View>

      <Text style={styles.registerButton} onPress={onRegisterButtonPress}>
        Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
  },
  //   form: {
  //     alignSelf: "stretch",
  //   },
  registerButton: {
    marginTop: 20,
    left: "50%",
  },
  shim: {
    height: 10,
  },
});

export default LogIn;
