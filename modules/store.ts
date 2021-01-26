import { createStore } from 'redux'
import { useSelector } from 'react-redux'
import { sns } from './ss'

interface AppState {
    snsLinks: sns.SnsLink[]
}

export const useStore = (initialState?: AppState) => createStore<AppState, any, any, any>(
    state => ({
        snsLinks: initialState?.snsLinks || state?.snsLinks || []
    })
)

export const useSnsLinks = () => useSelector<AppState,sns.SnsLink[]>(
    state => state.snsLinks
)
