import React, { FC, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/Auth/LogIn";
import Register from "../screens/Auth/Register";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"LogInScreen"}>
      <Stack.Screen name="LogInScreen" component={LogIn} />
      <Stack.Screen name="RegisterScreen" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
