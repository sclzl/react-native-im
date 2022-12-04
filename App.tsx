/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Index from "./src/screen/Index";
import Detail from "./src/screen/Detail";
import Login from './src/screen/Login';
import { LoginContext } from "./src/context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabOneStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="TabOne" component={Index} />
      <Tab.Screen name="TabTwo" component={Index} />
    </Tab.Navigator>
  )
}

const App = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: { type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT"; token: string; }) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const loginContext = React.useMemo(() => {
    return {
      signIn() {
        dispatch({ type: "SIGN_IN", token: "123456" });
      }
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LoginContext.Provider value={loginContext}>
        <NavigationContainer>
          {
            state.userToken ?
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="TabOneStack" component={TabOneStack} />
                <Stack.Screen name="Detail" component={Detail}
                  options={{
                    animation: "slide_from_right"
                  }}
                />
              </Stack.Navigator> :
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen name="Login" component={Login} />
              </Stack.Navigator>
          }
        </NavigationContainer>
      </LoginContext.Provider>
    </GestureHandlerRootView>
  )
};

export default App;
