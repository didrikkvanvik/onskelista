import React, { FC, useEffect, useState } from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Icon } from 'react-native-elements'

import { colors } from '../../assets/styles/index.native'

const renderError = (errorMessage?: string) => {
    if (!errorMessage) return <View style={{ height: 24 }} />
    return (
        <View style={styles.error}>
            <Icon color={colors.error} name="error" size={16} type="materialicons" />
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    )
}

function validateEmail(email: string): boolean {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const Inputs: FC<Props> = ({ onLogin, onSignUp, isSignUp, error, setError }: Props) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const login = () => {
        onLogin(username, password)
    }

    const signUp = () => {
        if (!validateEmail(username)) {
            setError('Emailen er ikke gyldig')
        } else if (password.length && password !== repeatPassword) {
            setError('Passordene er ikke like')
        } else {
            onSignUp(username, password, repeatPassword)
        }
    }

    const updateUserName = (text: string) => {
        setError('')
        setUsername(text)
    }

    const updatePassword = (text: string) => {
        setError('')
        setPassword(text)
    }

    const updateRepeatPassword = (text: string) => {
        setError('')
        setRepeatPassword(text)
    }

    return (
        <>
            <TextInput
                onChangeText={updateUserName}
                placeholder="Epost"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.shadow]}
            />

            <TextInput
                onChangeText={updatePassword}
                placeholder="Passord"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.shadow]}
            />

            {isSignUp && (
                <TextInput
                    onChangeText={updateRepeatPassword}
                    placeholder="Gjenta passord"
                    placeholderTextColor={colors.brand.gray}
                    style={[styles.textInput, styles.shadow, error ? styles.errorTextField : {}]}
                />
            )}
            {renderError(error)}

            <Animated.View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={isSignUp ? signUp : login}
                    style={[styles.button, styles.shadow]}
                >
                    <Text style={styles.loginText}>{isSignUp ? 'Opprett bruker' : 'Logg inn'}</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    loginText: {
        fontSize: 20,
        fontWeight: '600',
    },
    button: {
        backgroundColor: 'white',
        height: 60,
        marginHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 16,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    errorTextField: {
        borderColor: 'red',
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowColor: 'rgba(0,0,0,0.3)',
    },
    error: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 24,
        marginTop: 6,
    },
    errorText: {
        fontSize: 14,
        marginLeft: 10,
    },
})

type Props = {
    onLogin: (username: string, password: string) => void
    onSignUp: (username: string, password: string, repeatPassword: string) => void
    isSignUp: boolean
    error: string
    setError: (error: string) => void
}

export default Inputs
