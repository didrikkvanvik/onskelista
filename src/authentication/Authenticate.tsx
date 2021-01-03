/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { appleAuth } from '@invertase/react-native-apple-authentication'

import { createUser } from '../database/user'

export async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned'
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

    // Sign the user in with the credential
    return auth()
        .signInWithCredential(appleCredential)
        .then((user) => {
            return user
        })
}

export function getCurrentUser() {
    return auth().currentUser
}

export function useAuthenticate() {
    const [initializing, setInitializing] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<any>()

    function onAuthStateChanged(updatedUser: any) {
        setUser(updatedUser)
        if (initializing) setInitializing(false)
    }

    auth().onAuthStateChanged((userObject) => {
        if (userObject) {
            setIsLoggedIn(true)
            setUser(userObject)
        } else {
            setIsLoggedIn(false)
            setUser(undefined)
        }
    })

    const onLogin = (email: string, password: string) => {
        auth()
            .signInWithEmailAndPassword('john.doe@example.com', 'password')
            .then((user) => {
                onAuthStateChanged(user)
            })
            .catch((error) => {
                console.log('Login error: ', error)
            })
    }

    const onAppleLogin = () => {
        onAppleButtonPress().then(onAuthStateChanged)
    }

    const onLogout = () => {
        auth()
            .signOut()
            .then(() => onAuthStateChanged(undefined))
    }

    const onSignUp = (email: string, password: string) => {
        auth()
            .createUserWithEmailAndPassword('john.doe@example.com', 'password')
            .then((user) => {
                onAuthStateChanged(user)
                const uid = user.user.uid
                createUser({ userId: uid, name: '', email, password })
            })
            .catch((error) => {
                console.log('signup error', error)
            })
    }

    const updateProfileDisplayName = (displayName: string) => {
        const currentUser = auth().currentUser
        if (currentUser) {
            currentUser
                .updateProfile({ displayName })
                .then(() => onAuthStateChanged(auth().currentUser))
        }
    }
    console.log('user in auth', user)
    return {
        user,
        onLogin,
        onAppleLogin,
        onLogout,
        isLoggedIn,
        onSignUp,
        updateProfileDisplayName,
    }
}
