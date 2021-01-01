import React, { FC, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors } from '../../assets/styles/index.native'
import { useAuthenticate } from '../../authentication/Authenticate'

const Profile: FC<Props> = ({ navigation }) => {
    const { onLogout } = useAuthenticate()

    useEffect(() => {
        navigation.setOptions({ title: 'Min profil' })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 100 }}>PROFILEN MIIIN</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onLogout} style={styles.logoutButton}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Logg ut</Text>
            </TouchableOpacity>
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

export default Profile
