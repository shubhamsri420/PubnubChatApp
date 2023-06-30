import React, { FC, useCallback, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import LoginRegisterForm from "../../Components/LoginForm";
import { Text, TextInput, Button } from "react-native-paper";
import useRegister from "../../hooks/Auth/useRegister";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { not } from "../../utils/utils";

const Register = () => {
  const { register, loading, error } = useRegister();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [formErrors, setFormErrors] = useState([]);
  const buttonText = "Register";

  const onSubmit = async () => {
    await createUserWithEmailAndPassword(auth, email, password).then((user) => {
      console.log(user);
    });
    Keyboard.dismiss();
  };

  const onLoginButtonPress = useCallback(() => {
    navigation.navigate("LogInScreen");
  }, [navigation]);

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

        <Button
          mode={"contained"}
          onPress={onSubmit}
          loading={loading}
          disabled={loading}
        >
          {buttonText}
        </Button>
      </View>
      {error && <Text>{error}</Text>}

      <Text style={styles.loginButton} onPress={onLoginButtonPress}>
        Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  form: {
    alignSelf: "stretch",
  },
  loginButton: {
    marginTop: 20,
  },
  shim: {
    height: 10,
  },
});

export default Register;
