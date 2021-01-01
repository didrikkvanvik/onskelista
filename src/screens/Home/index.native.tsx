import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useAppContext } from '../../../App'

import { colors } from '../../assets/styles/index.native'
import Button from '../../components/Button/index.native'
import Text from '../../components/Text/index.native'

import Carousel from './Carousel'
import NewListModal from './NewListModal'
import Page from './Page'

const pages = [
    {
        header: 'Velkommen til Oppskrifter',
        text: 'Tinder for mat oppskrifter',
    },
    {
        header: 'Oppdag nye oppskrifter',
        text: 'Heihei',
    },
]

const Home: FC<Props> = ({ navigation }) => {
    const { storage } = useAppContext()
    const [isNewListModalVisible, setIsNewListModalVisible] = useState<boolean>(false)

    const navigateToProfile = () => {
        navigation.navigate('Profile')
    }

    const createList = (type: 'group' | 'single') => {
        console.log('type', type)
        navigation.navigate('CreateList', { type })
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

    const renderWelcomeHeader = () => (
        <>
            <Text style={styles.headerText}>Hei Didrik Kvanvik!</Text>
            <Text style={styles.headerLabel}>Ha en god stemning</Text>
            <Text style={styles.headerLabel}>Du har 5 ønskelister</Text>
        </>
    )
    const views = pages.map(({ header, text }) => <Page header={header} key={header} text={text} />)

    return (
        <View style={styles.container}>
            {renderUserButton()}

            {renderWelcomeHeader()}

            <Button
                onPress={() => setIsNewListModalVisible(true)}
                style={styles.createListButton}
                useShadow
                variant="midnight"
            >
                <Icon color={colors.brand.blue} name="plus" size={32} type="antdesign" />
            </Button>

            <NewListModal
                isVisible={isNewListModalVisible}
                onClose={() => setIsNewListModalVisible(false)}
                onPress={createList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 100,
    },
    createListButton: {
        height: 120,
        width: 120,
        marginHorizontal: 0,
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
