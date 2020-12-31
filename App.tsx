import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

import { useAuthenticate } from './src/authentication/Authenticate'
import LoginScreen from './src/screens/Login/index.native'

function App() {
    const { onLogin, onAppleLogin, onLogout, isLoggedIn } = useAuthenticate()

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onLogout}
                    style={styles.logoutButton}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Logg ut</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return <LoginScreen onAppleLogin={onAppleLogin} onLogin={onLogin} />
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
        borderRadius: 4,
        backgroundColor: 'red',
        justifyContent: 'center',
        fontSize: 20,
        width: '90%',
    },
})

export default App
