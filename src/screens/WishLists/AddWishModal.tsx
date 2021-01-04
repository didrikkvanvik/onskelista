import React, { useState } from 'react'
import { StyleSheet, Dimensions, TextInput } from 'react-native'

import Text from '../../components/Text/index.native'
import AnimatedModal from '../../components/AnimatedModal/index.native'
import Button from '../../components/Button/index.native'
import InputError from '../../components/InputError/index.native'
import { WishListItem } from '../../types'
import { colors } from '../../assets/styles/index.native'

function AddWishModal({ isVisible, onPress, onClose }: Props) {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [url, setUrl] = useState<string>('')
    const [error, setError] = useState<string>()

    const onAddWish = () => {
        if (!name.length) {
            setError('Du må fylle inn et navn.')
        } else {
            onPress({ name, description, price: Number(price), url })
            reset()
        }
    }

    const updateName = (text: string) => {
        setName(text)
        setError(undefined)
    }

    const updatePrice = (newPrice: string) => {
        setPrice(String(newPrice))
        setError(undefined)
    }

    const updateDescription = (text: string) => {
        setDescription(text)
        setError(undefined)
    }

    const updateUrl = (text: string) => {
        setUrl(text)
        setError(undefined)
    }

    const reset = () => {
        setName('')
        setDescription('')
        setPrice(String(0))
        setUrl('')
        setError(undefined)
    }

    const closeModal = () => {
        onClose()
        reset()
    }

    return (
        <AnimatedModal
            height={Dimensions.get('window').height * 0.86}
            isVisible={isVisible}
            onClose={closeModal}
        >
            <Text style={styles.title}>Legg til ønske</Text>
            <Text style={styles.label}>Navn</Text>
            <TextInput
                onChangeText={updateName}
                placeholder="Navn"
                placeholderTextColor={colors.brand.gray}
                style={styles.textInput}
                value={name}
            />

            <Text style={styles.label}>Beskrivelse</Text>
            <TextInput
                multiline
                onChangeText={updateDescription}
                placeholder="Beskrivelse"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.largeTextInput]}
                value={description}
            />

            <Text style={styles.label}>Pris (nok)</Text>

            <TextInput
                keyboardType="numeric"
                onChangeText={updatePrice}
                placeholder="Pris"
                placeholderTextColor={colors.brand.gray}
                style={styles.textInput}
                value={String(price)}
            />

            <Text style={styles.label}>Link (url)</Text>

            <TextInput
                multiline
                onChangeText={updateUrl}
                placeholder="Link (url)"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.largeTextInput]}
                value={url}
            />

            <InputError error={error} />

            <Button label="Legg til ønske" onPress={onAddWish} style={styles.button} />
        </AnimatedModal>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        marginTop: 20,
        color: colors.brand.primary10,
    },
    textInput: {
        height: 50,
        borderRadius: 4,
        borderWidth: 1.3,
        paddingLeft: 16,
        marginVertical: 5,
        borderColor: colors.gray.gray,
    },
    largeTextInput: {
        height: 120,
        paddingTop: 12,
    },
    button: {
        marginTop: 16,
    },
})

type Props = {
    isVisible: boolean
    onPress: (wishListItem: WishListItem) => void
    onClose: () => void
}

export default AddWishModal
