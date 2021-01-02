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
    useShadow,
}: Props) => {
    const isDefault = variant === 'default'

    const buttonStyles = [
        {
            borderRadius,
            borderColor,
        },
        styles.button,
        isDefault ? styles.default : styles.contrast,
        useShadow ? styles.shadow : undefined,
        style,
    ]

    const textStyles = [
        styles.text,
        { color: isDefault ? colors.white : colors.brand.blue },
        textStyle,
    ]

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={buttonStyles}>
            {label && <Text style={textStyles}>{label}</Text>}
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
        width: '100%',
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
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowColor: 'rgba(0,0,0,0.6)',
        marginTop: 30,
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
    useShadow?: boolean
}

export default Button
