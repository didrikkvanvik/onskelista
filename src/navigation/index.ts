// RootNavigation.js

import { createRef } from 'react'

import { Route } from './router'

export const isReadyRef = createRef()
export const navigationRef = createRef()

export function navigate(name: Route, params: Record<string, unknown>) {
    if (isReadyRef.current && navigationRef.current) {
        navigationRef.current.navigate(name, params)
    }
}
