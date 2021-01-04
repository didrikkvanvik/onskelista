import React, { FC } from 'react'
import { Text, StyleSheet, View, ViewProps } from 'react-native'
import { Icon } from 'react-native-elements'

import { colors } from '../../assets/styles/index.native'

const InputError: FC<Props> = ({ error, style }) => {
    if (!error) return null
    return (
        <View style={[styles.error, style]}>
            <Icon color={colors.error} name="error" size={16} type="materialicons" />
            <Text style={styles.errorText}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorTextField: {
        borderColor: 'red',
    },
    error: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 6,
    },
    errorText: {
        fontSize: 14,
        marginLeft: 10,
    },
})

type Props = {
    error?: string
    style?: ViewProps['style']
}

export default InputError
