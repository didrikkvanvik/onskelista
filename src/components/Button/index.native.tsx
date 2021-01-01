import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Text from '../Text/index.native'
import { colors } from '../../assets/styles/index.native'

const Button = ({
    onPress,
    label,
    style,
    borderRadius,
    textStyle,
    borderColor,
    variant = 'default',
    children,
}: Props) => {
    const isDefault = variant === 'default'

    const buttonStyles = [
        {
            borderRadius,
            borderColor,
        },
        styles.button,
        isDefault ? styles.default : styles.contrast,
        style,
    ]

    const textStyles = [
        styles.text,
        { color: isDefault ? colors.white : colors.brand.blue },
        textStyle,
    ]

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={buttonStyles}>
            <Text style={textStyles}>{label}</Text>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        width: '90%',
        marginHorizontal: 20,
        height: 52,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    default: {
        backgroundColor: colors.brand.blue,
    },
    contrast: {
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.brand.blue,
    },
})

type Props = {
    onPress: () => void
    label?: string
    style?: any
    borderRadius?: any
    textStyle?: any
    borderColor?: string
    variant?: string
    children?: any
}

export default Button
