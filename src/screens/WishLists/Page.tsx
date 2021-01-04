/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { FC, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View, Image, Dimensions } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'

import Text from '../../components/Text/index.native'
import { colors } from '../../assets/styles/index.native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { WishList, WishListItem } from '../../types'

const Page: FC<Props> = ({ wishList, isVisible, editPress }) => {
    const [width] = useState<number>(Math.floor(Dimensions.get('window').width))
    const [mount, setMount] = useState<boolean>(false)
    const lottieRef = useRef()
    const { name, description, items = [] } = wishList
    const hasWished = items.length > 0

    const hasPrice = (item: WishListItem) => item.price && item.price > 0

    useEffect(() => {
        if (hasWished) return
        if (!mount) {
            setTimeout(() => setMount(true), 500)
            return
        }
        if (isVisible) {
            lottieRef.current.play()
        } else {
            lottieRef.current.reset()
        }
    }, [isVisible, mount])

    const renderEmptyMessage = () => (
        <>
            <LottieView
                loop
                ref={lottieRef}
                source={require('../../assets/animations/empty.json')}
                style={styles.emptyAnimation}
            />
            <Text style={styles.emptyText}>Du har ikke lagt til noen ønsker!</Text>
        </>
    )

    return (
        <View style={[styles.page, { width }]}>
            <Animatable.View
                animation="fadeInDown"
                delay={200}
                duration={350}
                style={[styles.card, styles.shadow]}
            >
                <Image
                    resizeMode="stretch"
                    source={require('../../assets/images/cards/christmas-background2.jpg')}
                    style={styles.image}
                />
                <Text style={styles.absoluteHeader}>{name}</Text>
            </Animatable.View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <Animatable.View animation="fadeInUp" duration={350}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{name}</Text>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={editPress}
                            style={styles.editButton}
                        >
                            <Text style={styles.edit}>Rediger</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Beskrivelse</Text>
                    <Text style={styles.description}>{description}</Text>

                    <View style={styles.wishes}>
                        {items.map((item: WishListItem) => (
                            <View key={item.wish_list_item_id} style={styles.wish}>
                                <Image
                                    resizeMode="stretch"
                                    source={require('../../assets/images/gift-box.png')}
                                    style={styles.giftBox}
                                />
                                <View style={styles.wishInfo}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                                        {item.name}
                                    </Text>
                                    {item.description ? (
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: colors.brand.gray,
                                                marginBottom: 4,
                                            }}
                                        >
                                            {item.description}
                                        </Text>
                                    ) : null}
                                    {hasPrice(item) ? (
                                        <Text style={{ textDecorationLine: 'underline' }}>
                                            Pris: {item.price}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                        ))}
                    </View>
                </Animatable.View>

                {hasWished ? null : renderEmptyMessage()}
            </ScrollView>
        </View>
    )
}

const cardHeight = 180

const styles = StyleSheet.create({
    page: {
        flexShrink: 1,
        alignItems: 'center',
        marginTop: 24,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        maxWidth: 250,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    edit: {
        textDecorationLine: 'underline',
    },
    editButton: {
        paddingLeft: 10,
        paddingVertical: 10,
    },
    description: {
        lineHeight: 24,
        maxWidth: 240,
    },
    label: {
        fontSize: 14,
        marginTop: 10,
        color: colors.brand.gray,
    },
    card: {
        borderRadius: 20,
        width: '90%',
        marginHorizontal: 50,
        height: cardHeight,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    scrollView: {
        height: '60%',
        marginTop: 60,
        width: '90%',
        paddingHorizontal: 10,
        marginBottom: 50,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.3)',
    },
    absoluteHeader: {
        position: 'absolute',
        zIndex: 4,
        alignSelf: 'center',
        textAlign: 'center',
        top: cardHeight / 2 - 20,
        fontSize: 24,
        fontWeight: '900',
        maxWidth: 300,
        flexWrap: 'wrap',
        height: 100,
        color: colors.white,
    },
    emptyAnimation: {
        height: 260,
        alignSelf: 'center',
    },
    emptyText: {
        alignSelf: 'center',
        marginTop: -20,
    },
    wishes: {
        flexDirection: 'column',
        marginTop: 10,
    },
    wish: {
        width: '100%',
        flexDirection: 'row',
        height: 130,
        borderRadius: 4,
        paddingTop: 16,
        paddingHorizontal: 12,
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
        width: 100,
        height: 100,
        marginRight: 12,
    },
    wishInfo: {
        marginTop: 8,
    },
})

type Props = {
    isVisible: boolean
    editPress: () => void
    wishList: WishList
}

export default Page
