import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from 'react-native'
import Svg, { Circle, Line } from 'react-native-svg'
import LottieView from 'lottie-react-native'

import { colors } from '../../assets/styles/index.native'

const AnimatedLine = Animated.createAnimatedComponent(Line)
const BUTTON_RADIUS = 10
const DISTANCE_BETWEEN_CIRCLE_CENTER = 38

function Carousel({ views, onPress }: Props, ref: any) {
    const scrollView = useRef(null)

    const [width] = useState<number>(Math.floor(Dimensions.get('window').width))
    const [userScrollX] = useState<Animated.Value>(new Animated.Value(0))
    const [animatedScrollX] = useState<Animated.Value>(new Animated.Value(0))
    const [showIndicator, setShowIndicator] = useState<boolean>(true)
    const [scrollOffset, setScrollOffset] = useState<number>(0)
    const [scrollViewWidth, setScrollViewWidth] = useState<number>(0)
    const [isOnLastPage, setIsOnLastPage] = useState<boolean>(false)
    const { length: numberOfViews } = views

    useEffect(() => {
        if (scrollOffset === scrollViewWidth - width) {
            setIsOnLastPage(true)
        } else {
            setIsOnLastPage(false)
        }
    }, [numberOfViews, scrollOffset, scrollViewWidth, width])

    // useEffect(() => {
    //     if (isOnLastPage)
    // }, [isOnLastPage])

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
            toValue: activeViewIndex * DISTANCE_BETWEEN_CIRCLE_CENTER,
            easing: Easing.out(Easing.circle),
            duration: 600,
            useNativeDriver: false,
        }).start()
    }

    const renderIndicators = () => (
        <View style={styles.indicators}>
            <Svg
                height={BUTTON_RADIUS}
                viewBox={`0 0 ${2 * DISTANCE_BETWEEN_CIRCLE_CENTER} ${2 * BUTTON_RADIUS}`}
                width="100%"
            >
                {views.map((_view, index) => {
                    return (
                        <Circle
                            cx={DISTANCE_BETWEEN_CIRCLE_CENTER * index}
                            cy={BUTTON_RADIUS}
                            fill={`${colors.brand.primary10}20`}
                            key={String(index)}
                            r={BUTTON_RADIUS}
                        />
                    )
                })}
                <AnimatedLine
                    stroke={colors.brand.primary10}
                    strokeLinecap="round"
                    strokeWidth={2 * BUTTON_RADIUS}
                    x1={animatedScrollX.interpolate({
                        inputRange: [0, DISTANCE_BETWEEN_CIRCLE_CENTER * numberOfViews],
                        outputRange: [0, DISTANCE_BETWEEN_CIRCLE_CENTER * numberOfViews],
                    })}
                    x2={userScrollX.interpolate({
                        inputRange: [0, width * numberOfViews],
                        outputRange: [0, DISTANCE_BETWEEN_CIRCLE_CENTER * numberOfViews],
                    })}
                    y1={BUTTON_RADIUS}
                    y2={BUTTON_RADIUS}
                />
            </Svg>
        </View>
    )

    return (
        <View style={styles.container}>
            {showIndicator && views.length > 1 && (
                <LottieView
                    autoPlay
                    loop
                    // eslint-disable-next-line no-undef
                    source={require('../../assets/animations/swipe-right.json')}
                    style={[
                        styles.animation,
                        isOnLastPage
                            ? { left: 76, top: 18, transform: [{ rotate: '90deg' }] }
                            : { right: -6 },
                    ]}
                />
            )}

            <ScrollView
                horizontal
                onContentSizeChange={(newWidth: number) => {
                    setScrollViewWidth(newWidth)
                }}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: userScrollX } } }], {
                    listener: onScroll,
                    useNativeDriver: false,
                })}
                onScrollBeginDrag={() => setShowIndicator(false)}
                onScrollEndDrag={() => {
                    setShowIndicator(true)
                }}
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

            <View style={[styles.background, styles.shadow]} />

            {renderIndicators()}
        </View>
    )
}

const styles = StyleSheet.create({
    animation: {
        height: 70,
        position: 'absolute',
        top: 26,
        zIndex: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: colors.white,
    },
    scrollView: {
        flexGrow: 1,
    },
    indicators: {
        flex: 0.4,
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
    },
    button: {
        alignSelf: 'center',
        width: 280,
    },
    background: {
        backgroundColor: colors.gray.gray40,
        height: Dimensions.get('window').height / 1.7,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.3,
        zIndex: -1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.3)',
    },
})

type Props = {
    views: Array<any>
    onPress: () => void
}

export default forwardRef<Props, any>(Carousel)
