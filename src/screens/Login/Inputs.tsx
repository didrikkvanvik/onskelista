import React, { FC, useState } from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'

const Inputs: FC<Props> = ({ onPress }: Props) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onLogin = () => {
        onPress(username, password)
    }

    return (
        <>
            <TextInput
                onChangeText={setUsername}
                placeholder="Email"
                placeholderTextColor="black"
                style={[styles.textInput, styles.shadow]}
            />
            <TextInput
                onChangeText={setPassword}
                placeholder="Passord"
                placeholderTextColor="black"
                style={[styles.textInput, styles.shadow]}
            />

            <Animated.View>
                <TouchableOpacity onPress={onLogin} style={[styles.button, styles.shadow]}>
                    <Text style={styles.loginText}>Logg inn</Text>
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
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.2)',
    },
})

type Props = {
    onPress: (username: string, password: string) => void
}

export default Inputs
