import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

import { useAuthenticate } from './src/authentication/Authenticate'
import { HomeStackScreen } from './src/navigation/router'

import LoginScreen from './src/screens/Login/index.native'

function App() {
    const { onLogin, onAppleLogin, isLoggedIn, onSignUp } = useAuthenticate()

    if (isLoggedIn) {
        return (
            <NavigationContainer>
                <HomeStackScreen />
            </NavigationContainer>
        )
    }
    return <LoginScreen onAppleLogin={onAppleLogin} onLogin={onLogin} onSignUp={onSignUp} />
}

export default App
