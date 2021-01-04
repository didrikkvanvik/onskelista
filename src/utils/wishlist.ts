import { WishList } from '../types'

export function updateWishList(wishList: WishList, wishLists: WishList[]) {
    return wishLists.map((list) => {
        if (list.wish_list_id === wishList.wish_list_id) return wishList
        return list
    })
}
