import { useState, useCallback, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_PREFIX = 'onskeliste:'

export const defaultStorage = {
    loginError: undefined,
    signUpError: undefined,
}

export interface Storage {
    loginError: any
    signUpError: any
}

export async function getStorage(): Promise<any> {
    try {
        const fromStorage = await AsyncStorage.getItem(STORAGE_PREFIX)
        return fromStorage ? JSON.parse(fromStorage) : defaultStorage
    } catch (error) {
        console.log('error while fetching storage: ', error)
        return defaultStorage
    }
}

export async function setStorage(storage: any): Promise<void> {
    try {
        const stringifiedValue = JSON.stringify(storage)
        await AsyncStorage.setItem(STORAGE_PREFIX, stringifiedValue)
    } catch (error) {
        console.log('error while saving to storage: ', error)
    }
}

export const useStorage = (): [storage: Storage, updateStorage: (storage: Storage) => void] => {
    const [storage, setLocalStorage] = useState<Storage>(defaultStorage)

    const updateStorage = useCallback((updatedStorage: Storage) => {
        setLocalStorage(updatedStorage)
        setStorage(updatedStorage)
    }, [])

    useEffect(() => {
        getStorage().then(setLocalStorage)
    }, [])

    return [storage, updateStorage]
}
