import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Sae } from 'react-native-textinput-effects'

import { colors } from '../../assets/styles/index.native'

const TextInputComponent: FC<Props> = ({ value, onChange }) => (
    <Sae
        autoCapitalize="none"
        autoCorrect={false}
        borderHeight={2}
        iconClass={FontAwesomeIcon}
        iconColor={colors.brand.primary10}
        iconName="pencil"
        inputPadding={16}
        inputStyle={{ color: colors.black }}
        label="Navn"
        labelHeight={24}
        labelStyle={{ color: colors.black }}
        onChangeText={onChange}
        style={styles.textInput}
        value={value}
    />
)

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderBottomWidth: 0,
        paddingLeft: 0,
    },
})

type Props = {
    value: string
    onChange: (text: string) => void
}

export default TextInputComponent
