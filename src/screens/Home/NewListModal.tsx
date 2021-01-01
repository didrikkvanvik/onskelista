import React from 'react'
import { StyleSheet, View } from 'react-native'

import Text from '../../components/Text/index.native'
import AnimatedModal from '../../components/AnimatedModal/index.native'
import Button from '../../components/Button/index.native'

function NewListModal({ isVisible, onPress, onClose }: Props) {
    const press = (type: 'group' | 'single') => {
        setTimeout(() => onPress(type), 250)
        onClose()
    }

    return (
        <AnimatedModal height={300} isVisible={isVisible} onClose={onClose} useScrollView={false}>
            <Text style={styles.title}>Hva skal du lage?</Text>
            <View style={styles.buttons}>
                <Button
                    label="Gruppe"
                    onPress={() => press('group')}
                    style={styles.button}
                    useShadow
                    variant="midnight"
                />
                <Button
                    label="Liste"
                    onPress={() => press('single')}
                    style={styles.button}
                    useShadow
                />
            </View>
        </AnimatedModal>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 150,
        marginHorizontal: 0,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        alignSelf: 'center',
        marginTop: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
})

type Props = {
    isVisible: boolean
    onPress: (type: 'group' | 'single') => void
    onClose: () => void
}

export default NewListModal
