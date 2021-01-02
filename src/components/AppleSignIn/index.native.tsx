import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { AppleButton } from '@invertase/react-native-apple-authentication'

const AppleSignIn: FC<Props> = ({ onPress }) => (
    <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={onPress}
        style={styles.button}
    />
)

const styles = StyleSheet.create({
    button: {
        width: '90%',
        marginHorizontal: 20,
        marginTop: 10,
        height: 60,
        borderRadius: 4,
    },
})

type Props = {
    onPress: () => void
}

export default AppleSignIn
