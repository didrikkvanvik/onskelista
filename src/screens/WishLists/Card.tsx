/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { FC } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'

import Text from '../../components/Text/index.native'
import { colors } from '../../assets/styles/index.native'

import { WishListItem } from '../../types'

const Card: FC<Props> = ({ wish, onPress }) => (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.wish}>
        <Image
            resizeMode="stretch"
            source={require('../../assets/images/gift-box.png')}
            style={styles.giftBox}
        />
        <View style={styles.wishInfo}>
            <Text
                style={{
                    fontWeight: 'bold',
                    marginBottom: 4,
                    fontSize: 18,
                }}
            >
                {wish.name}
            </Text>
            {wish.description ? (
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.brand.gray,
                        marginBottom: 4,
                    }}
                >
                    {wish.description}
                </Text>
            ) : null}
            {wish.price > 0 ? <Text>Pris: {wish.price},-</Text> : null}
            {wish?.url ? (
                <TouchableOpacity activeOpacity={0.6} onPress={() => openUrl(wish.url)}>
                    <Text style={{ textDecorationLine: 'underline' }}>Åpne i nettleser</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    wish: {
        width: '100%',
        flexDirection: 'row',
        height: 140,
        borderRadius: 6,
        paddingHorizontal: 8,
        borderColor: colors.white,
        marginBottom: 10,
        backgroundColor: colors.white,
        elevation: 2,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
    giftBox: {
        width: 80,
        height: 80,
        marginRight: 10,
        alignSelf: 'center',
    },
    wishInfo: {
        justifyContent: 'center',
        borderLeftWidth: 1,
        paddingLeft: 20,
        borderColor: colors.gray.gray,
    },
})

type Props = {
    onPress: () => void
    wish: WishListItem
}

export default Card
