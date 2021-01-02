import React, { FC } from 'react'
import { Text, TouchableOpacity, ViewProps, TextProps, StyleSheet, View } from 'react-native'
import { colors } from '../../../assets/styles/index.native'

const Segment: FC<Props> = ({ title, style, textStyle, onPress }) => (
    <View style={[styles.shadow, styles.segment, styles.touchableSegment, style]}>
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    </View>
)

type Props = {
    onPress: () => any
    style: ViewProps['style']
    title: string
    textStyle: TextProps['style']
}

const styles = StyleSheet.create({
    segment: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableSegment: {
        zIndex: 10,
    },
    text: {
        alignSelf: 'center',
        color: colors.brand.blue,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.6)',
    },
})

export default Segment
