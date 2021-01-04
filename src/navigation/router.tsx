import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home/index.native'
import CreateGroup from '../screens/Home/CreateContent/CreateGroup'
import CreateWishList from '../screens/Home/CreateContent/CreateWishList'
import Groups from '../screens/Groups/index.native'
import Friends from '../screens/Friends/index.native'
import WishLists from '../screens/WishLists/index.native'
import EditWish from '../screens/WishLists/EditWish'

import Profile from '../screens/Profile/index.native'

const HomeStack = createStackNavigator()

// eslint-disable-next-line no-shadow
export enum Route {
    HOME = 'Hjem',
    CREATE_GROUP = 'CreateGroup',
    CREATE_WISH_LIST = 'CreateWishList',
    FRIENDS = 'Friends',
    GROUPS = 'Groups',
    WISH_LISTS = 'WishLists',
    EDIT_WISH = 'EditWish',
    PROFILE = 'Profile',
}

export const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen component={Home} name={Route.HOME} options={{ headerShown: false }} />
        <HomeStack.Screen component={CreateGroup} name={Route.CREATE_GROUP} />
        <HomeStack.Screen component={CreateWishList} name={Route.CREATE_WISH_LIST} />
        <HomeStack.Screen component={Friends} name={Route.FRIENDS} />
        <HomeStack.Screen component={Groups} name={Route.GROUPS} />
        <HomeStack.Screen component={WishLists} name={Route.WISH_LISTS} />
        <HomeStack.Screen component={EditWish} name={Route.EDIT_WISH} />
        <HomeStack.Screen component={Profile} name={Route.PROFILE} />
    </HomeStack.Navigator>
)
