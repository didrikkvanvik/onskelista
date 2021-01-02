import db from './config'

import { Group } from '../types/index'

const GROUP_PREFIX = 'groups'

type CreateGroup = {
    admin: string
    name: string
    description: string
}
export const createGroup = ({ admin, name, description }: CreateGroup) => {
    const groupRef = db.database().ref(GROUP_PREFIX)
    const newGroupRef = groupRef.push()

    const group: Group = {
        admin,
        name,
        group_id: 'random gruppe id',
        description,
        user_ids: [admin],
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
