import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import { AppleButton } from '@invertase/react-native-apple-authentication'
import { appleAuth } from '@invertase/react-native-apple-authentication'

type AppleSignInProps = { onPress: () => any }
export function AppleSignIn({ onPress }: AppleSignInProps) {
    return (
        <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={onPress}
            style={{
                width: '90%',
                marginHorizontal: 20,
                marginTop: 10,
                height: 60,
                borderRadius: 4,
            }}
        />
    )
}

const signInAnonymously = (onResult) => {
    auth()
        .signInAnonymously()
        .then((res) => {
            console.log('User signed in anonymously')
            onResult(res)
        })
        .catch((error) => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.')
            }

            console.error(error)
        })
}

function signInWithEmailAndPassword() {
    auth()
        .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then((user) => {
            console.log('User account created & signed in!', user)
            return user
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!')
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!')
            }

            console.error(error)
            return undefined
        })
}

const signOut = () => {
    auth()
        .signOut()
        .then(() => {
            console.log('User signed out!')
        })
}

export async function onAppleButtonPress() {
    console.log('Start the sign-in request')
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

export function useAuthenticate() {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()

    function onAuthStateChanged(newUser: any) {
        setUser(newUser)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber // unsubscribe on unmount
    }, [])

    const onLogin = async () => {
        const loggedInUser = await signInWithEmailAndPassword()
        onAuthStateChanged(loggedInUser)
    }

    const onAppleLogin = () => {
        onAppleButtonPress().then(onAuthStateChanged)
    }

    const onLogout = () => {
        signOut()
        onAuthStateChanged(undefined)
    }

    return {
        user,
        onLogin,
        onAppleLogin,
        onLogout,
    }
}
