import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home/index.native'

const HomeStack = createStackNavigator()

export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen component={Home} name="Home" options={{ headerShown: false }} />
    </HomeStack.Navigator>
)
