import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useAppContext } from '../../../App'

import { colors } from '../../assets/styles/index.native'
import { getWishListsForUser } from '../../database/wishlist'
import { WishList } from '../../types'
import { getUserUidFromStorage } from '../../utils/uuid'

import ListView from './ListView'

const WishLists: FC<Props> = ({ navigation }) => {
    const { storage } = useAppContext()
    const userId = getUserUidFromStorage(storage)
    const [wishLists, setWishLists] = useState<WishList[]>([])

    useEffect(() => {
        getWishListsForUser(userId).then(setWishLists)
        navigation.setOptions({ title: 'Ønskelister' })
    }, [])

    return (
        <View style={styles.container}>
            <ListView onPress={() => {}} views={wishLists} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    logoutButton: {
        alignItems: 'center',
        height: 60,
        borderRadius: 6,
        backgroundColor: colors.white,
        justifyContent: 'center',
        fontSize: 20,
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowColor: 'rgba(0,0,0,0.3)',
    },
    profileButton: {
        height: 40,
        width: 40,
        right: 20,
        position: 'absolute',
        top: 50,
    },
})

type Props = {
    navigation: any
}

export default WishLists
