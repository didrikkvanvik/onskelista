import { NavigationContainer } from '@react-navigation/native'
import React, { createContext, useContext } from 'react'

import { useAuthenticate } from './src/authentication/Authenticate'
import { defaultStorage, useStorage } from './src/authentication/storage'
import { HomeStackScreen } from './src/navigation/router'

import LoginScreen from './src/screens/Login/index.native'

export const AppContext: any = createContext({
    storage: defaultStorage,
    updateStorage: () => {},
})

export const useAppContext = (): any => useContext(AppContext)

function App() {
    const [storage, updateStorage] = useStorage()
    const { onLogin, onAppleLogin, isLoggedIn, onSignUp } = useAuthenticate(storage, updateStorage)

    if (isLoggedIn) {
        return (
            <NavigationContainer>
                <AppContext.Provider value={{ storage, updateStorage }}>
                    <HomeStackScreen />
                </AppContext.Provider>
            </NavigationContainer>
        )
    }
    return <LoginScreen onAppleLogin={onAppleLogin} onLogin={onLogin} onSignUp={onSignUp} />
}

export default App
