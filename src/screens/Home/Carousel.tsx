import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from 'react-native'
import Svg, { Line } from 'react-native-svg'

import { colors } from '../../assets/styles/index.native'
import Text from '../../components/Text/index.native'

const AnimatedLine = Animated.createAnimatedComponent(Line)
const BUTTON_RADIUS = 8
const DISTANCE_BETWEEN = Dimensions.get('window').width

function Carousel({ onLastPage, views, onPress }: Props, ref: any) {
    const scrollView = useRef(null)

    const [width] = useState<number>(Math.floor(Dimensions.get('window').width))
    const [userScrollX] = useState<Animated.Value>(new Animated.Value(0))
    const [animatedScrollX] = useState<Animated.Value>(new Animated.Value(0))

    const [scrollOffset, setScrollOffset] = useState<number>(0)
    const [scrollViewWidth, setScrollViewWidth] = useState<number>(0)
    const [isOnLastPage, setIsOnLastPage] = useState<boolean>(false)
    const { length: numberOfViews } = views

    useEffect(() => {
        if (scrollOffset > scrollViewWidth - width * (numberOfViews - 1)) {
            setIsOnLastPage(true)
        } else {
            setIsOnLastPage(false)
        }
    }, [numberOfViews, scrollOffset, scrollViewWidth, width])

    useEffect(() => {
        if (onLastPage) {
            onLastPage(isOnLastPage)
        }
    }, [isOnLastPage, onLastPage])

    useImperativeHandle(
        ref,
        () => ({
            scrollForward: () => {
                if (scrollView.current && !isOnLastPage) {
                    scrollView.current.scrollTo({
                        x: scrollOffset + width,
                        y: 0,
                        animated: true,
                    })
                }
            },
        }),
        [isOnLastPage, scrollOffset, width],
    )

    const onScroll = (event: Object) => {
        const newScrollOffset = Math.round(event.nativeEvent.contentOffset.x)
        setScrollOffset(newScrollOffset)
    }

    const getActiveViewIndex = () => {
        const viewIndex = scrollOffset / width
        return Number.isInteger(viewIndex) ? viewIndex : null
    }

    const activeViewIndex = getActiveViewIndex()

    if (activeViewIndex !== null) {
        Animated.timing(animatedScrollX, {
            toValue: activeViewIndex * DISTANCE_BETWEEN,
            easing: Easing.out(Easing.circle),
            duration: 600,
            useNativeDriver: false,
        }).start()
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
                <Text style={styles.text}>Grupper</Text>
                <Text style={styles.text}>Ønskelister</Text>
            </View>
            <View style={styles.svgView}>
                <Svg
                    height={8}
                    style={{ backgroundColor: 'red' }}
                    viewBox={`0 0 ${2 * DISTANCE_BETWEEN} ${2 * DISTANCE_BETWEEN}`}
                    width="100%"
                >
                    <AnimatedLine
                        stroke={colors.brand.primary}
                        strokeLinecap="round"
                        strokeWidth={160}
                        x1={animatedScrollX.interpolate({
                            inputRange: [0, DISTANCE_BETWEEN * numberOfViews],
                            outputRange: [0, DISTANCE_BETWEEN * numberOfViews],
                        })}
                        x2={userScrollX.interpolate({
                            inputRange: [0, width * numberOfViews],
                            outputRange: [0, DISTANCE_BETWEEN * numberOfViews],
                        })}
                        y1={BUTTON_RADIUS}
                        y2={BUTTON_RADIUS}
                    />
                </Svg>
            </View>
            <ScrollView
                horizontal
                onContentSizeChange={(newWidth: number) => {
                    setScrollViewWidth(newWidth)
                }}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: userScrollX } } }], {
                    listener: onScroll,
                    useNativeDriver: false,
                })}
                pagingEnabled
                ref={scrollView}
                scrollEventThrottle={5}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
            >
                {views.map((view) => (
                    <View key={view.key} style={{ width }}>
                        {view}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: colors.white,
    },
    scrollView: {
        flexGrow: 1,
    },
    svgView: {
        flex: 0.4,
    },
    text: {
        fontWeight: 'bold',
    },
})

type Props = {
    views: Array<any>
    onLastPage?: (value: boolean) => void
    onPress: () => void
}

export default forwardRef<Props, any>(Carousel)
