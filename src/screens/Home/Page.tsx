/* eslint-disable max-len */
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import Text from '../../components/Text/index.native'
import { colors } from '../../assets/styles/index.native'

const Page: FC<Props> = ({ header, text }) => (
    <View style={styles.page}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.text}>{text}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingBottom: 42,
    },
    page: {
        flexShrink: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 90,
    },
    header: {
        marginTop: 70,
        fontSize: 20,
        fontWeight: '600',
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
        maxWidth: 320,
        lineHeight: 24,
    },
})

type Props = {
    header: string
    text: string
}

export default Page
