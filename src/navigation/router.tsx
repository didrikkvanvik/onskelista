import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home/index.native'
import CreateList from '../screens/Home/CreateList'

import Profile from '../screens/Profile/index.native'

const HomeStack = createStackNavigator()

export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen component={Home} name="Hjem" options={{ headerShown: false }} />
        <HomeStack.Screen component={CreateList} name="CreateList" />
        <HomeStack.Screen component={Profile} name="Profile" />
    </HomeStack.Navigator>
)
