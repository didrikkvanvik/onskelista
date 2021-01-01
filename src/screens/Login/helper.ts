/* eslint-disable no-sparse-arrays */
import { Dimensions } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

const { height } = Dimensions.get('window')
const { Value, block, cond, set, startClock, stopClock, debug, timing, clockRunning } = Animated

export function runTiming(clock: any, value: any, dest: any) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    }

    const config = {
        duration: 500,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    }

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ])
}

export const DEFAULT_HEIGHT = height + 50
