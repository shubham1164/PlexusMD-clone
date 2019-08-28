/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './src/Screens/HomeScreen.js';
import VideosDetailScreen from './src/Screens/VideosDetailScreen.js';
import {Text} from 'native-base';

const StackNavigator = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen},
    VideosDetailScreen: {screen: VideosDetailScreen}
  },
  {
    headerMode: 'none',
    initialRouteName: 'HomeScreen'
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default () => (
  <AppContainer />
)
