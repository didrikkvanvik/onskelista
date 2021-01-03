import React, { FC, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import LottieView from 'lottie-react-native'

import { useAppContext } from '../../../App'

import { colors } from '../../assets/styles/index.native'
import Button from '../../components/Button/index.native'
import Text from '../../components/Text/index.native'
import NewListModal from './NewListModal'
import { useAuthenticate } from '../../authentication/Authenticate'

console.disableYellowBox = true

const Home: FC<Props> = ({ navigation }) => {
    const { user = {} } = useAppContext()

    const displayName = user?._user?.displayName || ''
    const [isNewListModalVisible, setIsNewListModalVisible] = useState<boolean>(false)

    const navigateToProfile = () => {
        navigation.navigate('Profile')
    }

    const createList = (type: 'group' | 'single') => {
        navigation.navigate(type === 'group' ? 'CreateGroup' : 'CreateWishList', { type })
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
            <Text style={styles.headerText}>{`Hei ${displayName}`}</Text>
            <Text style={styles.headerLabel}>Ha en god stemning</Text>
            <Text style={styles.headerLabel}>Du har 5 ønskelister</Text>
        </>
    )

    const peopleAnimation = (source: any) => (
        <LottieView
            autoPlay
            loop
            // eslint-disable-next-line no-undef
            source={source}
            style={styles.animation}
        />
    )

    return (
        <View style={styles.container}>
            {renderUserButton()}

            {renderWelcomeHeader()}
            <View style={styles.cards}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Friends')}
                    style={styles.card}
                >
                    {peopleAnimation(require('../../assets/animations/people.json'))}
                    <Text>Venner</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('WishLists')}
                    style={styles.card}
                >
                    {peopleAnimation(require('../../assets/animations/wishlists.json'))}
                    <Text>Ønskelister</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Groups')} style={styles.card}>
                    {peopleAnimation(require('../../assets/animations/groups.json'))}
                    <Text>Grupper</Text>
                </TouchableOpacity>
            </View>

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
        paddingHorizontal: 20,
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    createListButton: {
        height: 60,
        width: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 30,
        left: Dimensions.get('window').width / 2 - 30,
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
    card: {
        height: 170,
        width: 140,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 2,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        marginTop: 30,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: colors.white,
    },
    animation: {
        height: 100,
        maxWidth: 130,
        marginBottom: 16,
    },
})

type Props = {
    navigation: any
}

export default Home
