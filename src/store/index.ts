import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import loginStore from './loginStore'
import msgStore from './msgStore';

const PERSISTENCE_KEY = 'my-app-state';

export type RootState = {
    loginStore: any;
    msgStore: any;
}


export default createStore<RootState>({
    plugins: [
        createPersistedState({
            paths: ['loginStore', 'msgStore']
        })
    ],
    modules: {
        loginStore, msgStore
    }
})
