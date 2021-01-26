export * as ls from './ls'
export * as id from './id'
export * as sns from './sns'
import * as sns from './sns'

export const getStaticPropsWithInitialState = <P={}>(props: P) => ({
    initialState: {
        snsLinks: sns.getSnsLinks()
    },
    ...props
})
