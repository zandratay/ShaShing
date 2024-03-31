import { createStore } from 'vuex'

export default createStore({

    state: {
        isLoading: false
    },
    mutations: {
        setLoading(state, status) {
        state.isLoading = status;
        }
    }
})
