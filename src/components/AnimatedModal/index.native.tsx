import React, { Component } from 'react'
import {
    View,
    Modal,
    Animated,
    ScrollView,
    KeyboardAvoidingView,
    PanResponder,
    StyleSheet,
    TouchableWithoutFeedback,
    Easing,
} from 'react-native'

import { colors } from '../../assets/styles/index.native'

import Text from '../Text/index.native'
import Button from '../Button/index.native'

import {
    getAnimatedValues,
    deviceHeight,
    HIGHEST_MASK_OPACITY,
    DEFAULT_MODAL_HEIGHT,
    ANIMATION_TYPES,
    AnimationTypes,
} from './helper'

class AnimatedModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.createPanResponder()
    }

    state = {
        isModalVisible: false,
    }

    animatedHeight: any = new Animated.Value(DEFAULT_MODAL_HEIGHT)

    animatedOpacity: any = new Animated.Value(HIGHEST_MASK_OPACITY)

    onCloseTimeout: any

    onConfirmTimeout: any

    panResponder: any

    componentDidMount() {
        const { height } = this.props
        if (height) {
            this.animatedHeight.setValue(height)
        }
    }

    componentDidUpdate(prevProps: Props) {
        const { isVisible } = this.props
        if (isVisible !== prevProps.isVisible && isVisible !== this.state.isModalVisible) {
            if (isVisible) {
                this.open()
            } else {
                this.onClose()
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.onCloseTimeout)
        clearTimeout(this.onConfirmTimeout)
    }

    createPanResponder = () => {
        const {
            height = DEFAULT_MODAL_HEIGHT,
            closeOnDragDown = true,
            disablePanHandler = false,
        } = this.props

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: disablePanHandler ? null : () => closeOnDragDown,
            onPanResponderMove: (event, gesture) => this.dragAnimation(gesture),
            onPanResponderRelease: (_, gesture) => {
                if (height / 6 - gesture.dy < 0) this.onClose()
                else this.springResetAnimation()
            },
        })
    }

    springResetAnimation = (): void => {
        Animated.spring(this.animatedHeight, {
            bounciness: 6,
            easing: Easing.out(Easing.circle),
            toValue: 0,
            useNativeDriver: false,
        }).start()
    }

    doAnimation = (type: AnimationTypes, gesture?: Object, callback?: () => void): void => {
        const { heightToValue, opacityToValue, duration, delay } = getAnimatedValues(
            this.props.height,
            type,
            gesture,
        )

        Animated.parallel([
            Animated.timing(this.animatedHeight, {
                toValue: heightToValue,
                easing: Easing.out(Easing.circle),
                duration,
                useNativeDriver: false,
            }),
            Animated.timing(this.animatedOpacity, {
                toValue: opacityToValue,
                duration,
                easing: Easing.out(Easing.circle),
                useNativeDriver: false,
                delay,
            }),
        ]).start(callback)
    }

    dragAnimation = (gesture: Object): void => {
        this.doAnimation(ANIMATION_TYPES.DRAG, gesture)
    }

    open = (): void => {
        this.setState({ isModalVisible: true }, () => this.doAnimation(ANIMATION_TYPES.OPEN))
    }

    onClose = (isConfirmClose = false): void => {
        const { onClose, height = DEFAULT_MODAL_HEIGHT } = this.props

        const callback = () => {
            this.setState({ isModalVisible: false })
            this.animatedHeight.setValue(height)

            if (onClose) {
                this.onCloseTimeout = setTimeout(() => onClose(isConfirmClose), 50)
            }
        }

        this.doAnimation(ANIMATION_TYPES.CLOSE, undefined, callback)
    }

    onConfirm = () => {
        const { onConfirm } = this.props
        this.onClose(true)
        if (onConfirm) {
            this.onConfirmTimeout = setTimeout(onConfirm, 300)
        }
    }

    render() {
        const {
            children,
            contentContainer,
            confirmLabel,
            height = DEFAULT_MODAL_HEIGHT,
            onConfirm,
            isLoading,
            title,
            useScrollView = true,
            titleStyle,
        } = this.props
        const { isModalVisible } = this.state
        const hasTitle = typeof title === 'string'
        const maskStyles = [styles.mask, { opacity: this.animatedOpacity }]
        const animatedViewStyles = [
            styles.container,
            {
                height,
                transform: [{ translateY: this.animatedHeight }],
            },
        ]

        return (
            <Modal onRequestClose={this.onClose} transparent visible={isModalVisible}>
                <KeyboardAvoidingView
                    behavior="height"
                    enabled={false}
                    style={styles.keyboardAvoidingView}
                >
                    <TouchableWithoutFeedback accessibilityRole="button" onPress={this.onClose}>
                        <Animated.View style={maskStyles} />
                    </TouchableWithoutFeedback>

                    <Animated.View style={animatedViewStyles}>
                        <Animated.View {...this.panResponder.panHandlers} style={{ height: 32 }}>
                            <View style={styles.pill} />
                            {hasTitle && <Text style={[styles.title, titleStyle]}>{title}</Text>}
                        </Animated.View>

                        {useScrollView && (
                            <ScrollView
                                bounces={false}
                                contentContainerStyle={contentContainer}
                                keyboardShouldPersistTaps="handled"
                            >
                                {children}
                            </ScrollView>
                        )}

                        {!useScrollView && children}

                        {Boolean(onConfirm) && !isLoading && (
                            <Button
                                label={confirmLabel || 'Bekreft'}
                                onPress={this.onConfirm}
                                style={styles.confirmButton}
                            />
                        )}
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    confirmButton: {
        marginBottom: 14,
        marginTop: 12,
    },
    container: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        paddingBottom: 24,
        paddingHorizontal: 24,
        width: '100%',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    mask: {
        backgroundColor: colors.black,
        flex: 1,
        marginBottom: -deviceHeight,
    },
    pill: {
        alignSelf: 'center',
        backgroundColor: colors.gray.gray,
        borderRadius: 20,
        height: 4,
        top: 10,
        width: 32,
    },
    title: {
        marginBottom: 16,
        marginTop: 32,
        color: colors.black,
        fontWeight: '600',
    },
})

type State = {
    isModalVisible: boolean
}

type Props = {
    children: any
    closeOnDragDown?: boolean
    confirmAccessibilityLabel?: string
    confirmLabel?: string
    isVisible: boolean
    isLoading?: boolean
    height?: number
    contentContainer?: any
    onClose?: (isConfirmClose?: boolean) => void
    onConfirm?: () => any
    title?: string | Node
    useScrollView?: boolean
    disablePanHandler?: boolean
    titleStyle?: any
}

export default AnimatedModal
