import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: null,
        loading: false,
        error: null
    },
    mutations:{
        setUser(state,payload){
            state.user = payload;
        },
        setLoading(state,payload){
            state.loading = payload;
        },
        setError(state,payload){
            state.error = payload;
        },
        clearError(state){
            state.error = null;
        }
    },
    actions: {
        registerUser({ commit }, payload){
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                const newUser = {
                    id: user.uid
            }
            commit('setUser',newUser);
            alert(`account created for ${user.email}`);
            payload.loading = false;
            },
            err => {
                alert(err.message);
                payload.loading = false;
            });
        }
    },
    getters: {
        user(state){
            return state.user;
        }
    }
});