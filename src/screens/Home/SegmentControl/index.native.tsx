import React, { Component } from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import { colors } from '../../../assets/styles/index.native'

import Segment from './Segment'

class SegmentControl extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const { offsetHeight = 3, selectedIndex } = props

        this.state = {
            selectedIndex,
            segmentDimension: { width: 0, height: 0 },
            activeSegmentPosition: { x: offsetHeight, y: offsetHeight },
            positionAnimationValue: new Animated.Value(0),
        }
    }

    onSegmentSelection = (index: number) => {
        const { positionAnimationValue, activeSegmentPosition } = this.state
        const animate = () => {
            Animated.spring(positionAnimationValue, {
                toValue: activeSegmentPosition.x,
                duration: 350,
                easing: Easing.ease,
                bounciness: 6,
                useNativeDriver: false,
            }).start(() => this.props.onChange(index))
        }

        this.setState(
            (prevState) => ({
                selectedIndex: index,
                activeSegmentPosition: {
                    x: prevState.segmentDimension.width * index + this.props.offsetHeight,
                    y: prevState.activeSegmentPosition.y,
                },
            }),
            animate,
        )
    }

    segmentOnLayout = (event: any) => {
        const { width, height } = event.nativeEvent.layout
        const segmentWidth = (width - this.props.offsetHeight * 2) / this.props.values.length

        const animate = () => {
            Animated.timing(this.state.positionAnimationValue, {
                toValue: segmentWidth * this.state.selectedIndex + this.props.offsetHeight,
                duration: 100,
                useNativeDriver: false,
            }).start()
        }

        this.setState(
            () => ({
                segmentDimension: { width: segmentWidth, height },
            }),
            animate,
        )
    }

    render() {
        const { style, disable, values } = this.props
        const { width, height } = this.state.segmentDimension
        const segmentHeight = height - this.props.offsetHeight * 2

        const isDisabled = disable ? 'none' : 'auto'
        const extraStyles = disable ? styles.vivid : {}

        return (
            <View pointerEvents={isDisabled} style={[styles.mainContainer, style]}>
                <View
                    onLayout={this.segmentOnLayout}
                    style={[styles.segmentContainer, extraStyles, { height }]}
                >
                    {values.map((segment: any, index: number) => (
                        <Segment
                            key={segment}
                            onPress={() => this.onSegmentSelection(index)}
                            style={{ height: segmentHeight }}
                            textStyle={index === this.state.selectedIndex ? styles.activeText : {}}
                            title={segment}
                        />
                    ))}
                    <Animated.View
                        style={[
                            {
                                width,
                                height: segmentHeight,
                                left: this.state.positionAnimationValue,
                                top: this.state.activeSegmentPosition.y,
                            },
                            styles.segment,
                            styles.activeSegment,
                        ]}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        height: 74,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentContainer: {
        flex: 1,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray,
    },
    segment: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeSegment: {
        flex: 1,
        zIndex: 5,
        borderRadius: 16,
        position: 'absolute',
        backgroundColor: colors.white,
    },
    animatedView: {
        zIndex: 5,
        position: 'absolute',
    },
    activeText: {
        color: colors.black,
    },
    vivid: {
        opacity: 0.7,
    },
})

type State = {
    selectedIndex: number
    segmentDimension: { width: number; height: number }
    activeSegmentPosition: { x: number; y: number }
    positionAnimationValue: Animated.Value
}

type Props = {
    values: any
    disable?: boolean
    onChange: (index: number) => any
    selectedIndex: number
    offsetHeight: number
}

export default SegmentControl
