import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';


import HomeScreen from './screens/home';
import DetailScreen from './screens/detail';

export const Root = createStackNavigator(
	{
		LandingScreen: { screen: HomeScreen },
		DetailScreen: { screen: DetailScreen },
	}, {
	mode: 'modal',
	headerMode: 'none',
}
)

export default createAppContainer(Root);
