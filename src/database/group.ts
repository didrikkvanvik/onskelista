import db from './config'

import { Group } from '../types/index'

const GROUP_PREFIX = 'group'

export const createGroup = (
    name: string,
    description: string,
    userIds?: string[],
    wishlists?: any[],
) => {
    const groupRef = db.database().ref(GROUP_PREFIX)
    const newGroupRef = groupRef.push()
    const group: Group = {
        name,
        description,
        user_ids: [],
        wish_lists: [],
    }

    newGroupRef.set(group)
}

export const getGroups = async () => {
    const group = await db
        .database()
        .ref(GROUP_PREFIX)
        .once('value')
        .then((snapshot) => snapshot.val())

    return group
}

export const getGroup = async (id: string) => {
    const group = await db
        .database()
        .ref(`${GROUP_PREFIX}/${id}`)
        .once('value')
        .then((snapshot) => snapshot.val())

    return group
}
