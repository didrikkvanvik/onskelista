import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { appleAuth } from '@invertase/react-native-apple-authentication'

import { createUser, getUsers } from '../database/user'

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

export function useAuthenticate(storage: any, updateStorage: any) {
    const [initializing, setInitializing] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    function onAuthStateChanged(newUser: any) {
        updateStorage({
            ...storage,
            user: newUser,
        })
        if (initializing) setInitializing(false)
    }

    auth().onAuthStateChanged((userObject) => {
        if (userObject) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    })

    const onLogin = (email: string, password: string) => {
        auth()
            .signInWithEmailAndPassword('john.doe@example.com', 'password')
            .then((loggedInUser) => {
                onAuthStateChanged(loggedInUser)
            })
            .catch((error) => {
                updateStorage({
                    ...storage,
                    loginError: error,
                })
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
                if (user) {
                    onAuthStateChanged(user)
                    const uid = user.user.uid
                    createUser({ userId: uid, name: '', email, password })
                }
            })
            .catch((error) => {
                updateStorage({
                    ...storage,
                    signUpError: error,
                })
            })
    }

    return {
        user: storage?.user,
        onLogin,
        onAppleLogin,
        onLogout,
        isLoggedIn,
        onSignUp,
    }
}
