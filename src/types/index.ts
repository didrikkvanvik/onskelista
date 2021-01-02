type WishListItem = {
    name: string
    description: string
    price?: number
    tags?: string[]
    url?: string
    img?: string
    taken_id?: string
}

export type WishList = {
    name: string
    description: string
    items?: WishListItem[]
    user_id: string
    group_id?: string
}

export type Group = {
    admin: string // user_id of the creator
    group_id: string
    name: string
    description: string
    user_ids: any[]
    wish_lists: any[]
}

export type User = {
    user_id: string
    name: string
    email: string
    password: string
    wish_lists?: WishList[]
    groups?: Group[]
}
