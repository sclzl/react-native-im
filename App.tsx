/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Index from "./src/screen/Index";
import Detail from "./src/screen/Index";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Detail" component={Detail}
          options={{
            animation: "slide_from_right"
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
};

const styles = StyleSheet.create({

});

export default App;
