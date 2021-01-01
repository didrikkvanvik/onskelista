import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg'
import Animated from 'react-native-reanimated'
import { TapGestureHandler, State as GestureState } from 'react-native-gesture-handler'

import { AppleSignIn } from '../../authentication/Authenticate'
import { runTiming, DEFAULT_HEIGHT } from './helper'
import Inputs from './Inputs'

const { width, height } = Dimensions.get('window')
const { Value, event, block, cond, eq, set, Clock, interpolate, Extrapolate, concat } = Animated
const ANIMATION_HEIGHT = height / 2.4

class LoginScreen extends Component<Props, State> {
    buttonOpacity: Animated.Value<1>
    onStateChange: (...args: any[]) => void
    onCloseState: (...args: any[]) => void
    buttonY: Animated.Node<number>
    backgroundImageY: Animated.Node<number>
    textInputZindex: Animated.Node<number>
    textInputY: Animated.Node<number>
    textInputOpacity: Animated.Node<number>
    rotateCross: Animated.Node<number>

    constructor(props: Props) {
        super(props)

        this.state = {
            isSignUp: false,
        }

        this.buttonOpacity = new Value(1)

        this.onStateChange = event([
            {
                nativeEvent: ({ state }: any) =>
                    block([
                        cond(
                            eq(state, GestureState.END),
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
                            eq(state, GestureState.END),
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
            outputRange: [-ANIMATION_HEIGHT - 50, 0],
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

        this.inputRef = React.createRef()
    }

    onClose = () => {
        this.setState({ isSignUp: false })
        this.inputRef.current.clearInputs()
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
                <Text style={styles.signInText}>Logg inn</Text>
            </Animated.View>
        </TapGestureHandler>
    )

    renderCloseButton = () => (
        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
            <Animated.View style={[styles.closeButton, styles.shadow]}>
                <TouchableOpacity onPress={this.onClose}>
                    <Animated.Text
                        style={{
                            fontSize: 15,
                            transform: [{ rotate: concat(this.rotateCross, 'deg') }],
                        }}
                    >
                        X
                    </Animated.Text>
                </TouchableOpacity>
            </Animated.View>
        </TapGestureHandler>
    )

    renderCreateUserButton = () => (
        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
                style={[
                    {
                        opacity: this.buttonOpacity,
                        transform: [{ translateY: this.buttonY }],
                    },
                ]}
            >
                <TouchableOpacity onPress={() => this.setState({ isSignUp: true })}>
                    <Text style={styles.label}>
                        Har du ikke konto?{' '}
                        <Text style={[styles.label, styles.labelButtonText]}>Opprett her.</Text>
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </TapGestureHandler>
    )

    signIn = (email: string, password: string) => {
        this.props.onLogin(email, password)
    }

    signUp = (email: string, password: string) => {
        this.props.onSignUp(email, password)
    }

    render() {
        const { onAppleLogin } = this.props
        const { isSignUp } = this.state

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
                        {this.renderCreateUserButton()}
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

                        <Inputs
                            isSignUp={isSignUp}
                            onLogin={this.signIn}
                            onSignUp={this.signUp}
                            ref={this.inputRef}
                        />
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
        height: ANIMATION_HEIGHT,
        justifyContent: 'center',
    },
    inputView: {
        height: ANIMATION_HEIGHT,
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    label: {
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 16,
    },
    labelButtonText: {
        textDecorationLine: 'underline',
        lineHeight: 0,
        marginTop: 0,
    },
    labelButton: {
        marginBottom: -2,
    },
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
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
    onLogin: (email: string, password: string) => void
    onAppleLogin: () => void
    onSignUp: (email: string, password: string) => void
}

type State = {
    isSignUp: boolean
}

export default LoginScreen
