import { WishList } from '../types/index'
import { uuid } from '../utils/uuid'

import db from './config'

const WISH_LIST_PREFIX = '/wishlists'
const VALUE = 'value'

type CreateWishList = {
    userId: string
    name: string
    description: string
}
export const createWishList = ({ userId, name, description }: CreateWishList) => {
    const wishList: WishList = {
        user_id: userId,
        name,
        description,
        items: [],
    }

    db.database().ref(WISH_LIST_PREFIX).child(uuid()).set(wishList)
}

export const getWishLists = async () => {
    const wishLists = await db
        .database()
        .ref(WISH_LIST_PREFIX)
        .once(VALUE)
        .then((snapshot) => {
            const result = snapshot.val()
            return Object.values(result)
        })

    return wishLists
}

export const getWishListsForUser = async (userId: string) => {
    const wishLists = await db
        .database()
        .ref(WISH_LIST_PREFIX)
        .once(VALUE)
        .then((snapshot) => {
            const result = snapshot.val()
            const values = Object.values(result) as WishList[]
            return values.filter((list) => list?.user_id === userId)
        })

    return wishLists
}

export const getWishList = async (id: string) => {
    const wishList = await db
        .database()
        .ref(`${WISH_LIST_PREFIX}/${id}`)
        .once(VALUE)
        .then((snapshot) => snapshot.val())

    return wishList
}
