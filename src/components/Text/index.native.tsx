import React from 'react'
import { Text, PixelRatio, StyleSheet } from 'react-native'

export const FONT_WEIGHT = {
    THIN: '100',
    LIGHT: '300',
    NORMAL: '500',
    NORMAL_ANDROID: '400',
    SEMIBOLD: '600',
    BLACK: '900',
}

const fontScale = PixelRatio.getFontScale()
const cappedFontScale = fontScale > 1.5 ? 1.5 : fontScale

function getScalableFontSize(style?: any, scalable?: boolean) {
    const inputFontSize = StyleSheet.flatten(style)?.fontSize || 16
    const fontSize = style ? inputFontSize : 16

    if (scalable === false) return fontSize

    return fontSize * cappedFontScale
}

export function getScalableLineHeightAndPadding(style?: any): Object {
    if (!style) return {}

    const { fontSize, lineHeight } = StyleSheet.flatten(style) || {}
    if (!lineHeight) return {}

    if (fontScale > 1.7) return { lineHeight: fontSize === 14 ? 22 : 26, paddingTop: 8 }
    if (fontScale > 1.5) return { lineHeight: fontSize === 14 ? 20 : 24, paddingTop: 6 }
    if (fontScale > 1.3) return { lineHeight: fontSize === 14 ? 18 : 22, paddingTop: 4 }

    return { lineHeight, paddingTop: 0 }
}

function TextComponent(props: Props) {
    const { style, children, scalable, ...restProps } = props

    const fontSize = getScalableFontSize(style, scalable)
    const lineHeightAndPadding = getScalableLineHeightAndPadding(style)

    const mergedStyles = [
        {
            color: '#000',
            fontFamily: 'Avenir',
            fontSize,
            ...lineHeightAndPadding,
        },
        style,
    ]

    return (
        <Text {...restProps} allowFontScaling={false} style={mergedStyles}>
            {children}
        </Text>
    )
}

type Props = {
    style?: any
    // The rest are taken from https://gist.github.com/lelandrichardson/c037f46885af67ceb447091c908d1471
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
    numberOfLines?: number
    textBreakStrategy?: 'simple' | 'highQuality' | 'balanced'
    onLayout?: Function
    onPress?: Function
    onLongPress?: Function
    pressRetentionOffset?: {
        top: number
        left: number
        bottom: number
        right: number
    }
    selectable?: boolean
    selectionColor?: string
    suppressHighlighting?: boolean
    testID?: string
    nativeID?: string
    allowFontScaling?: boolean
    accessible?: boolean
    adjustsFontSizeToFit?: boolean
    minimumFontScale?: number
    disabled?: boolean
    children?: any
    scalable?: boolean
}

export default TextComponent
