import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useAppContext } from '../../../App'

import { colors } from '../../assets/styles/index.native'
import { useAuthenticate } from '../../authentication/Authenticate'
import Text from '../../components/Text/index.native'

const Profile: FC<Props> = ({ navigation }) => {
    const { updateProfileDisplayName, onLogout } = useAppContext()

    const updateName = () => updateProfileDisplayName('Didrik Kvanvik')

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 100 }}>PROFILEN MIIIN</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={updateName} style={styles.logoutButton}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Oppdater navn</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onLogout} style={styles.logoutButton}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Logg ut</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100,
    },
    logoutButton: {
        alignItems: 'center',
        height: 60,
        borderRadius: 6,
        backgroundColor: colors.white,
        justifyContent: 'center',
        fontSize: 20,
        marginBottom: 20,
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowColor: 'rgba(0,0,0,0.3)',
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

export default Profile
