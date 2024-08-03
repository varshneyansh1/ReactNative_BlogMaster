import {StyleSheet} from 'react-native';
import React, { useContext } from 'react';
import Home from '../../screens/Home';
import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderMenu from './HeaderMenu';
import { AuthContext } from '../../../context/authContext';
import Post from '../../screens/Post';
import Account from '../../screens/Account';
import Mypost from '../../screens/MyPost';

const ScreenMenu = () => {
  // global state

  const [state] = useContext(AuthContext);
  const {user} = state;
  const Stack = createNativeStackNavigator();
  // authcondition
  const authenticatedUser = state?.user && state?.token;

  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title:`Welcome ${user?.name}`,
              headerRight:()=><HeaderMenu />,
            }}
          />
                    <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle:"Back",
              headerRight:()=><HeaderMenu  />}}
          />
          <Stack.Screen
            name="My Post"
            component={Mypost}
            options={{
              headerBackTitle:"Back",
              headerRight:()=><HeaderMenu />}}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle:"Back",
              headerRight:()=><HeaderMenu showlogout={true} />}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />

        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;

const styles = StyleSheet.create({});
