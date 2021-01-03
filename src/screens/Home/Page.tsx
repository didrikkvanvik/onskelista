/* eslint-disable max-len */
import React, { FC, useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native'

import Text from '../../components/Text/index.native'
import { colors } from '../../assets/styles/index.native'

const Page: FC<Props> = ({ header, text, isVisible }) => {
    const [mount, setMount] = useState<boolean>(false)
    const lottieRef = useRef()

    useEffect(() => {
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
        <View style={styles.page}>
            <Animatable.View
                animation="fadeInDown"
                delay={200}
                duration={350}
                style={[styles.card, styles.shadow]}
            >
                <Image
                    resizeMode="stretch"
                    source={require('../../assets/images/cards/christmas-background.jpg')}
                    style={styles.image}
                />
                <Text style={styles.absoluteHeader}>{header}</Text>
            </Animatable.View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <Animatable.View animation="fadeInUp" duration={350}>
                    <Text style={styles.header}>Ønskeliste</Text>
                    <Text style={styles.label}>Beskrivelse</Text>
                    <Text style={styles.description}>{text}</Text>
                </Animatable.View>

                {renderEmptyMessage()}
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
    header: {
        fontSize: 24,
        fontWeight: '600',
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
        marginTop: 70,
        width: '90%',
        paddingHorizontal: 20,
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
})

type Props = {
    header: string
    text: string
    isVisible: boolean
}

export default Page
