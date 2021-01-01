import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useAppContext } from '../../../App'

import { colors } from '../../assets/styles/index.native'

import Text from '../../components/Text/index.native'

const Home: FC<Props> = ({ navigation }) => {
    const { storage } = useAppContext()
    console.log('storage', storage)

    const navigateToProfile = () => {
        navigation.navigate('Profile')
    }

    const createList = () => {
        console.log('create list')
    }

    const renderUserButton = () => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={navigateToProfile}
            style={styles.profileButton}
        >
            <Icon color={colors.black} name="user-circle-o" size={32} type="font-awesome" />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            {renderUserButton()}
            <Text style={styles.headerText}>Hei Didrik Kvanvik</Text>
            <Text style={styles.headerLabel}>Ha en god stemning</Text>
            <Text style={styles.headerLabel}>Du har 5 ønskelister</Text>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={createList}
                style={styles.createListButton}
            >
                <Icon color={colors.black} name="plus" size={32} type="antdesign" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    createListButton: {
        alignItems: 'center',
        height: 120,
        borderRadius: 6,
        backgroundColor: colors.white,
        justifyContent: 'center',
        fontSize: 20,
        width: 120,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowColor: 'rgba(0,0,0,0.3)',
        marginTop: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerLabel: {
        fontSize: 14,
        color: colors.brand.gray,
        marginTop: 2,
    },
    profileButton: {
        height: 40,
        width: 40,
        right: 20,
        position: 'absolute',
        top: 50,
    },
})

type Props = {
    navigation: any
}

export default Home
