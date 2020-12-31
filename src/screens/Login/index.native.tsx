import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'
import Animated from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')
import { runTiming, DEFAULT_HEIGHT } from './helper'
import { AppleSignIn, onAppleButtonPress } from '../../authentication/Authenticate'

const { Value, event, block, cond, eq, set, Clock, interpolate, Extrapolate, concat } = Animated

class LoginScreen extends Component<Props> {
    buttonOpacity: Animated.Value<1>
    onStateChange: (...args: any[]) => void
    onCloseState: (...args: any[]) => void
    buttonY: Animated.Node<number>
    backgroundImageY: Animated.Node<number>
    textInputZindex: Animated.Node<number>
    textInputY: Animated.Node<number>
    textInputOpacity: Animated.Node<number>
    rotateCross: Animated.Node<number>

    constructor(props: any) {
        super(props)

        this.buttonOpacity = new Value(1)

        this.onStateChange = event([
            {
                nativeEvent: ({ state }: any) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
                        ),
                    ]),
            },
        ])

        this.onCloseState = event([
            {
                nativeEvent: ({ state }: any) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
                        ),
                    ]),
            },
        ])

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP,
        })

        this.backgroundImageY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP,
        })

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP,
        })

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP,
        })

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP,
        })

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP,
        })
    }

    renderBackground = () => (
        <Animated.View
            style={{
                ...StyleSheet.absoluteFill,
                transform: [{ translateY: this.backgroundImageY }],
            }}
        >
            <Svg height={DEFAULT_HEIGHT} width={width}>
                <ClipPath id="clip">
                    <Circle cx={width / 2} r={DEFAULT_HEIGHT} />
                </ClipPath>
                <Image
                    clipPath="url(#clip)"
                    height={DEFAULT_HEIGHT}
                    // eslint-disable-next-line no-undef
                    href={require('../../assets/images/background.jpg')}
                    preserveAspectRatio="xMidYMid slice"
                    width={width}
                />
            </Svg>
        </Animated.View>
    )

    renderSignInButton = () => (
        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
                style={[
                    styles.button,
                    styles.shadow,
                    {
                        opacity: this.buttonOpacity,
                        transform: [{ translateY: this.buttonY }],
                    },
                ]}
            >
                <Text style={styles.signInText}>Logg inn med brukernavn</Text>
            </Animated.View>
        </TapGestureHandler>
    )

    renderCloseButton = () => (
        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
            <Animated.View style={[styles.closeButton, styles.shadow]}>
                <Animated.Text
                    style={{
                        fontSize: 15,
                        transform: [{ rotate: concat(this.rotateCross, 'deg') }],
                    }}
                >
                    X
                </Animated.Text>
            </Animated.View>
        </TapGestureHandler>
    )

    render() {
        const { onAppleLogin } = this.props

        return (
            <KeyboardAvoidingView behavior="padding" enabled style={styles.keyboardAvoidingView}>
                {this.renderBackground()}
                <View style={styles.outerInputWrapper}>
                    {this.renderSignInButton()}
                    <Animated.View
                        style={{
                            opacity: this.buttonOpacity,
                            transform: [{ translateY: this.buttonY }],
                        }}
                    >
                        <AppleSignIn onPress={onAppleLogin} />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.inputView,
                            {
                                ...StyleSheet.absoluteFill,
                                zIndex: this.textInputZindex,
                                opacity: this.textInputOpacity,
                                transform: [{ translateY: this.textInputY }],
                            },
                        ]}
                    >
                        {this.renderCloseButton()}
                        <TextInput
                            placeholder="EMAIL"
                            placeholderTextColor="black"
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="PASSWORD"
                            placeholderTextColor="black"
                            style={styles.textInput}
                        />
                        <Animated.View style={[styles.button, styles.shadow]}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                }}
                            >
                                SIGN INN
                            </Text>
                        </Animated.View>
                    </Animated.View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    signInText: {
        fontSize: 18,
        fontWeight: '600',
    },
    outerInputWrapper: {
        height: height / 3,
        justifyContent: 'center',
    },
    inputView: {
        height: height / 3,
        top: null,
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'white',
        height: 60,
        marginHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.2)',
    },
})

type Props = {
    onLogin: () => void
    onAppleLogin: () => void
}

export default LoginScreen
