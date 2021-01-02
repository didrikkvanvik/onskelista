import { WishList } from '../types/index'
import { uuid } from '../utils/uuid'

import db from './config'

const WISH_LIST_PREFIX = 'wishlists'
const VALUE = 'value'

type CreateWishList = {
    userId: string
    name: string
    description: string
}
export const createWishList = ({ userId, name, description }: CreateWishList) => {
    const wishListRef = db.database().ref(WISH_LIST_PREFIX)
    const newWishListRef = wishListRef.push()

    const wishList: WishList = {
        user_id: userId,
        wish_list_id: uuid(),
        name,
        description,
        items: [],
    }

    newWishListRef.set(wishList)
}

export const getWishLists = async () => {
    const wishLists = await db
        .database()
        .ref(WISH_LIST_PREFIX)
        .once(VALUE)
        .then((snapshot) => snapshot.val())

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
