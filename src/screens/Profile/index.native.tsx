import React, { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { useAppContext } from '../../../App'
import { colors } from '../../assets/styles/index.native'
import Button from '../../components/Button/index.native'
import TextInput from '../../components/TextInput/index.native'

const Profile: FC<Props> = ({ navigation }) => {
    const { updateProfileDisplayName, onLogout, user } = useAppContext()
    const displayName = user?._user?.displayName || ''
    const [name, setName] = useState<string>(displayName)

    const updateName = () => updateProfileDisplayName(name)

    return (
        <View style={styles.container}>
            <TextInput onChange={setName} value={name} />

            <Button label="Oppdater profil" onPress={updateName} style={styles.button} />

            <Button
                label="Logg ut"
                onPress={onLogout}
                style={styles.button}
                variant="midnight"
                warning
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingTop: 10,
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    button: {
        marginTop: 20,
    },
})

type Props = {
    navigation: any
}

export default Profile
