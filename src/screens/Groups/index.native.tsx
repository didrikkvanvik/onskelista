import React, { FC, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { useAppContext } from '../../../App'

import { colors } from '../../assets/styles/index.native'
import Text from '../../components/Text/index.native'

const Groups: FC<Props> = ({ navigation }) => {
    const { storage, updateStorage } = useAppContext()

    useEffect(() => {
        navigation.setOptions({ title: 'Grupper' })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 100 }}>GRUPPER</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100,
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

export default Groups
