import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useAppContext } from '../../../../App'

import { colors } from '../../../assets/styles/index.native'
import Button from '../../../components/Button/index.native'
import Text from '../../../components/Text/index.native'

import { createGroup } from '../../../database/group'

const CreateGroup: FC<Props> = ({ navigation }) => {
    const { storage } = useAppContext()
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const currentUserId = storage?.user?.user?.uid

    useEffect(() => {
        navigation.setOptions({ title: 'Opprett Gruppe' })
    }, [])

    const create = () => {
        createGroup({ admin: currentUserId, name, description })
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Navn på gruppen</Text>

            <TextInput
                onChangeText={setName}
                placeholder="Secret Santa"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.shadow]}
                value={name}
            />
            <Text style={styles.label}>Beskriv formålet med gruppen</Text>

            <TextInput
                multiline
                onChangeText={setDescription}
                placeholder="Dele glede med familien"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.largeTextInput, styles.shadow]}
                value={description}
            />
            <Button
                label="Opprett gruppe"
                onPress={create}
                style={styles.button}
                variant="midnight"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
    },
    textInput: {
        height: 50,
        borderRadius: 4,
        borderWidth: 1.3,
        paddingLeft: 16,
        marginVertical: 5,
        borderColor: colors.gray.gray,
    },
    label: {
        fontSize: 14,
        marginTop: 20,
        color: colors.brand.primary10,
    },
    largeTextInput: {
        height: 120,
        paddingTop: 12,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowColor: 'rgba(0,0,0,0.6)',
    },
    button: {
        marginTop: 20,
    },
})

type Props = {
    navigation: any
}

export default CreateGroup
