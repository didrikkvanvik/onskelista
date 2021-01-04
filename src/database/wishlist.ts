import { WishList, WishListItem } from '../types/index'
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
    const key = uuid()
    const wishList: WishList = {
        wish_list_id: key,
        user_id: userId,
        name,
        description,
        items: [],
    }

    db.database().ref(WISH_LIST_PREFIX).child(key).set(wishList)
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

export const addWishToWishList = async (id: string, wishListItem: WishListItem) => {
    const ref = await db.database().ref(`${WISH_LIST_PREFIX}/${id}`)
    const wishList = await getWishList(id)
    const { items = [] } = wishList
    const itemToAdd: WishListItem = {
        ...wishListItem,
        wish_list_item_id: uuid(),
    }

    return await ref
        .update({
            items: [itemToAdd, ...items],
        })
        .then(async () => {
            const updatedWishList = await getWishList(id)
            return updatedWishList
        })
}
