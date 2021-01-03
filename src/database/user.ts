import { User } from '../types/index'
import db from './config'

const USER_PREFIX = '/users'
const VALUE = 'value'

type CreateUser = {
    userId: string
    name: string
    email: string
    password: string
}
export const createUser = ({ userId, name, email, password }: CreateUser) => {
    db.database().ref(USER_PREFIX).push()
    const user: User = {
        name,
        email,
        password,
        wish_lists: [],
    }

    db.database().ref(USER_PREFIX).child(userId).set(user)
}

export const getUsers = async () => {
    const wishLists = await db
        .database()
        .ref(USER_PREFIX)
        .once(VALUE)
        .then((snapshot) => snapshot.val())

    return wishLists
}

export const getUserById = async (id: string) => {
    const wishList = await db
        .database()
        .ref(`${USER_PREFIX}/${id}`)
        .once(VALUE)
        .then((snapshot) => snapshot.val())

    return wishList
}

export const updateUserDisplayName = async (id: string, displayName: string) => {
    const wishList = await db.database().ref(`${USER_PREFIX}/${id}`).update({ name: displayName })

    return wishList
}
