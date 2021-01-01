/* eslint-disable react/display-name */
import React, { FC, forwardRef, useImperativeHandle, useState } from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { Icon } from 'react-native-elements'

import { colors } from '../../assets/styles/index.native'

const defaultError = {
    email: '',
    password: '',
    repeatPassword: '',
}

export type ErrorMessage = {
    email: string
    password: string
    repeatPassword: string
}
const renderError = (errorMessage: ErrorMessage) => {
    if (!errorMessage.email && !errorMessage.password && !errorMessage.repeatPassword) {
        return <View style={{ height: 24 }} />
    }

    return (
        <View style={styles.errors}>
            <Icon color={colors.error} name="error" size={16} type="materialicons" />
            <Text style={styles.errorText}>
                {errorMessage.email || errorMessage.password || errorMessage.repeatPassword}
            </Text>
        </View>
    )
}

function validateEmail(email: string): boolean {
    if (!email.length) return false
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

const Inputs: FC<Props> = forwardRef(({ onLogin, onSignUp, isSignUp }, ref) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [errors, setError] = useState<ErrorMessage>(defaultError)

    useImperativeHandle(ref, () => ({
        clearInputs() {
            // eslint-disable-next-line no-undef
            setTimeout(() => {
                clearErrors()
                setEmail('')
                setPassword('')
                setRepeatPassword('')
            }, 350)
        },
    }))

    const login = () => {
        onLogin(email, password)
    }

    const clearErrors = () => {
        setError({
            email: '',
            password: '',
            repeatPassword: '',
        })
    }
    const signUp = () => {
        if (!validateEmail(email)) {
            setError({
                ...errors,
                email: 'Emailen er ikke gyldig',
            })
        } else if (password.length < 8) {
            setError({
                ...errors,
                password: 'Passorder må være over 8 tegn',
            })
        } else if (password.length && password !== repeatPassword) {
            setError({
                ...errors,
                repeatPassword: 'Passordene er ikke like',
            })
        } else {
            onSignUp(email, password, repeatPassword)
        }
    }

    const updateEmail = (text: string) => {
        clearErrors()
        setEmail(text)
    }

    const updatePassword = (text: string) => {
        clearErrors()
        setPassword(text)
    }

    const updateRepeatPassword = (text: string) => {
        clearErrors()
        setRepeatPassword(text)
    }

    return (
        <>
            <TextInput
                onChangeText={updateEmail}
                placeholder="Epost"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.shadow, errors.email ? styles.errorTextField : {}]}
                value={email}
            />

            <TextInput
                onChangeText={updatePassword}
                placeholder="Passord"
                placeholderTextColor={colors.brand.gray}
                style={[
                    styles.textInput,
                    styles.shadow,
                    errors.password ? styles.errorTextField : {},
                ]}
                value={password}
            />

            {isSignUp && (
                <TextInput
                    onChangeText={updateRepeatPassword}
                    placeholder="Gjenta passord"
                    placeholderTextColor={colors.brand.gray}
                    style={[
                        styles.textInput,
                        styles.shadow,
                        errors.repeatPassword ? styles.errorTextField : {},
                    ]}
                    value={repeatPassword}
                />
            )}
            {renderError(errors)}

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
})

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
    errors: {
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
    onLogin: (email: string, password: string) => void
    onSignUp: (email: string, password: string, repeatPassword: string) => void
    isSignUp: boolean
}

export default Inputs
