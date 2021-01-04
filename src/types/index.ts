export type WishListItem = {
    wish_list_item_id?: string
    name: string
    description?: string
    price?: number
    tags?: string[]
    url?: string
    img?: string
    taken_id?: string
}

export type WishList = {
    wish_list_id: string
    name: string
    description: string
    items?: WishListItem[]
    user_id: string
    group_id?: string
}

export type Group = {
    admin: string // user_id of the creator
    name: string
    description: string
    user_ids: string[]
    wish_lists: WishList[]
}

export type User = {
    name: string
    email: string
    password: string
    wish_lists?: WishList[]
    groups?: Group[]
}
