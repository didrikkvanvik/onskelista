import React, { FC } from 'react'
import { StyleSheet, ViewProps } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Sae, Hoshi } from 'react-native-textinput-effects'

import { colors } from '../../assets/styles/index.native'

const TextInputComponent: FC<Props> = ({
    value,
    onChange,
    type = 'sae',
    placeholder = '',
    style,
    ...rest
}) => {
    if (type === 'hosie') {
        return (
            <Hoshi
                autoComplete="off"
                borderColor={colors.brand.primary}
                borderHeight={2}
                inputPadding={14}
                inputStyle={{ color: colors.black, fontWeight: '500' }}
                label={placeholder}
                labelStyle={{ color: colors.black }}
                onChangeText={onChange}
                style={style}
                value={value}
                {...rest}
            />
        )
    }
    return (
        <Sae
            autoCapitalize="none"
            autoCorrect={false}
            borderHeight={2}
            iconClass={FontAwesomeIcon}
            iconColor={colors.brand.primary10}
            iconName="pencil"
            inputPadding={16}
            inputStyle={{ color: colors.black }}
            label={placeholder}
            labelHeight={24}
            labelStyle={{ color: colors.black }}
            onChangeText={onChange}
            style={[styles.textInput, style]}
            value={value}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderBottomWidth: 0,
        paddingLeft: 0,
    },
})

type Props = {
    value: any
    onChange: (text: any) => void
    type?: 'sae' | 'hosie'
    placeholder: string
    style?: ViewProps['style']
}

export default TextInputComponent
