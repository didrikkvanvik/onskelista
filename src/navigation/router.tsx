import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home/index.native'
import CreateGroup from '../screens/Home/CreateContent/CreateGroup'
import CreateWishList from '../screens/Home/CreateContent/CreateWishList'
import Groups from '../screens/Groups/index.native'
import Friends from '../screens/Friends/index.native'
import WishLists from '../screens/WishLists/index.native'

import Profile from '../screens/Profile/index.native'

const HomeStack = createStackNavigator()

export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen component={Home} name="Hjem" options={{ headerShown: false }} />
        <HomeStack.Screen component={CreateGroup} name="CreateGroup" />
        <HomeStack.Screen component={CreateWishList} name="CreateWishList" />
        <HomeStack.Screen component={Friends} name="Friends" />
        <HomeStack.Screen component={Groups} name="Groups" />
        <HomeStack.Screen component={WishLists} name="WishLists" />
        <HomeStack.Screen component={Profile} name="Profile" />
    </HomeStack.Navigator>
)
