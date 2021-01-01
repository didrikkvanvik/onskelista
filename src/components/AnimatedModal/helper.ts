import { Dimensions } from 'react-native'

export const DEFAULT_MODAL_HEIGHT = 550
export const OPEN_ANIMATION_DURATION = 300
export const CLOSE_ANIMATION_DURATION = 300

export const HIGHEST_MASK_OPACITY = 0.7
export const LOWEST_MASK_OPACITY = 0.1

export const deviceHeight = Dimensions.get('window').height

export type AnimationTypes = 'open' | 'close' | 'drag'

// eslint-disable-next-line no-shadow
export enum ANIMATION_TYPES {
    OPEN = 'open',
    CLOSE = 'close',
    DRAG = 'drag',
}

type AnimationValues = {
    heightToValue: number
    opacityToValue: number
    duration: number
    delay?: number
}
export function getAnimatedValues(
    height?: number = DEFAULT_MODAL_HEIGHT,
    type: AnimationTypes,
    gesture?: Object,
): AnimationValues {
    if (gesture && type === ANIMATION_TYPES.DRAG) {
        const currentHeight = deviceHeight - gesture.moveY
        const opacity = getOpacity(height, currentHeight)
        const yMax = Math.max(0, gesture.dy)

        return {
            heightToValue: yMax,
            opacityToValue: opacity,
            duration: 0,
        }
    }

    if (type === ANIMATION_TYPES.OPEN) {
        return {
            heightToValue: 0,
            opacityToValue: HIGHEST_MASK_OPACITY,
            duration: OPEN_ANIMATION_DURATION,
        }
    }

    return {
        heightToValue: height,
        opacityToValue: 0,
        duration: OPEN_ANIMATION_DURATION,
    }
}

function getOpacity(height: number, currentHeight: number): number {
    const maskOpacity = currentHeight / height - 0.2
    const opacity = Math.round(maskOpacity * 100) / 100

    if (opacity > HIGHEST_MASK_OPACITY) return HIGHEST_MASK_OPACITY
    if (opacity < LOWEST_MASK_OPACITY) return LOWEST_MASK_OPACITY
    return opacity
}
