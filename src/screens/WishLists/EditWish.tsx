import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import Text from '../../components/Text/index.native'
import Button from '../../components/Button/index.native'
import InputError from '../../components/InputError/index.native'
import { colors } from '../../assets/styles/index.native'
import { updateWishInWishList, deleteWishInWishList } from '../../database/wishlist'

function EditWish({ route, navigation }: Props) {
    const { wish, wish_list_id } = route.params
    const [name, setName] = useState<string>(wish.name)
    const [description, setDescription] = useState<string>(wish.description)
    const [price, setPrice] = useState<string>(String(wish.price))
    const [url, setUrl] = useState<string>(wish.url)
    const [error, setError] = useState<string>()

    useEffect(() => {
        navigation.setOptions({ title: wish.name })
    }, [])

    const onSave = async () => {
        if (!name.length) {
            setError('Du må fylle inn et navn.')
        } else {
            const editedWish = {
                wish_list_item_id: wish.wish_list_item_id,
                name,
                description,
                price: Number(price),
                url,
            }
            await updateWishInWishList(wish_list_id, editedWish)
            navigation.goBack()
        }
    }

    const onDelete = async () => {
        await deleteWishInWishList(wish_list_id, wish.wish_list_item_id)
        navigation.goBack()
    }

    const updateName = (text: string) => {
        setName(text)
        setError(undefined)
    }

    return (
        <View style={styles.container}>
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
                onChangeText={setDescription}
                placeholder="Beskrivelse"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.largeTextInput]}
                value={description}
            />

            <Text style={styles.label}>Pris (nok)</Text>

            <TextInput
                keyboardType="numeric"
                onChangeText={setPrice}
                placeholder="Pris"
                placeholderTextColor={colors.brand.gray}
                style={styles.textInput}
                value={String(price)}
            />

            <Text style={styles.label}>Link (url)</Text>

            <TextInput
                multiline
                onChangeText={setUrl}
                placeholder="Link (url)"
                placeholderTextColor={colors.brand.gray}
                style={[styles.textInput, styles.largeTextInput]}
                value={url}
            />
            <InputError error={error} />

            <Button label="Oppdater ønske" onPress={onSave} style={styles.button} />
            <Button
                label="Slett ønske"
                onPress={onDelete}
                style={styles.button}
                variant="midnight"
                warning
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
    button: {
        marginTop: 16,
    },
    title: {
        alignSelf: 'center',
        marginTop: 12,
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
})

type Props = {
    route: any
    navigation: any
}

export default EditWish
