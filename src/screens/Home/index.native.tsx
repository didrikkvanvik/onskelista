import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { colors } from '../../assets/styles/index.native'

import { useAuthenticate } from '../../authentication/Authenticate'

const Home: FC = () => {
    const { onLogout } = useAuthenticate()

    return (
        <View style={styles.container}>
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
        justifyContent: 'center',
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
})

export default Home
