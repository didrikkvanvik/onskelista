import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet, View, ViewProps } from 'react-native'
import { Icon } from 'react-native-elements'

import { colors } from '../../assets/styles/index.native'

import Text from '../Text/index.native'

const SelectButton: FC<Props> = ({ label, onPress, style, text, isOpen }) => (
    <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.button, isOpen ? styles.openButton : {}, style]}
    >
        <View style={styles.content}>
            <View>
                <Text style={styles.label}>{label}</Text>
                <Text>{text}</Text>
            </View>
        </View>
        <Icon
            color={isOpen ? colors.black : colors.gray10}
            name={isOpen ? 'up' : 'down'}
            size={20}
            style={styles.icon}
            type="antdesign"
        />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        alignSelf: 'center',
        marginTop: 8,
    },
    button: {
        borderColor: colors.gray.gray10,
        borderRadius: 4,
        borderWidth: 2,
        flexDirection: 'row',
        height: 48,
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        paddingVertical: 4,
        width: '90%',
        alignSelf: 'center',
    },
    openButton: {
        borderColor: colors.black,
    },
    label: {
        color: colors.brand.primary10,
        fontSize: 12,
        lineHeight: 18,
        marginBottom: -3,
    },
})

type Props = {
    label: string
    isOpen: boolean
    onPress: () => void
    style?: ViewProps['style']
    text: string
}

export default SelectButton
