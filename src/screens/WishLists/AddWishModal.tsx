import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'

import Text from '../../components/Text/index.native'
import AnimatedModal from '../../components/AnimatedModal/index.native'
import Button from '../../components/Button/index.native'
import TextInput from '../../components/TextInput/index.native'
import InputError from '../../components/InputError/index.native'
import { WishListItem } from '../../types'

function AddWishModal({ isVisible, onPress, onClose }: Props) {
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
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

    const updatePrice = (newPrice: number) => {
        setPrice(newPrice)
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
        setPrice(0)
        setUrl('')
        setError(undefined)
    }

    const closeModal = () => {
        onClose()
        reset()
    }

    return (
        <AnimatedModal
            height={Dimensions.get('window').height * 0.8}
            isVisible={isVisible}
            onClose={closeModal}
        >
            <Text style={styles.title}>Legg til ønske</Text>
            <TextInput
                onChange={updateName}
                placeholder="Navn"
                style={styles.textInput}
                type="hosie"
                value={name}
            />
            <TextInput
                onChange={updateDescription}
                placeholder="Beskrivelse"
                style={styles.textInput}
                type="hosie"
                value={description}
            />
            <TextInput
                keyboardType="numeric"
                onChange={updatePrice}
                placeholder="Pris"
                style={styles.textInput}
                type="hosie"
                value={price}
            />
            <TextInput
                onChange={updateUrl}
                placeholder="Url"
                style={styles.textInput}
                type="hosie"
                value={url}
            />

            <InputError error={error} style={styles.error} />

            <Button label="Legg til ønske" onPress={onAddWish} />
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
        marginTop: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        marginBottom: 30,
    },
    error: {
        marginBottom: 20,
    },
})

type Props = {
    isVisible: boolean
    onPress: (wishListItem: WishListItem) => void
    onClose: () => void
}

export default AddWishModal
