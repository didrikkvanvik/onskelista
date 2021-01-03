/* eslint-disable max-len */
import React, { FC } from 'react'
import { ScrollView, StyleSheet, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

import Text from '../../components/Text/index.native'
import { colors } from '../../assets/styles/index.native'

const Page: FC<Props> = ({ header, text }) => (
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
                <Text style={styles.text}>{text}</Text>
            </Animatable.View>
        </ScrollView>
    </View>
)

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
    text: {
        marginTop: 10,
        lineHeight: 24,
        maxWidth: 240,
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
        fontWeight: '600',
        maxWidth: 300,
        flexWrap: 'wrap',
        height: 100,
        color: colors.white,
    },
})

type Props = {
    header: string
    text: string
}

export default Page
