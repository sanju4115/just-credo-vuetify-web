import db from "../../components/firebaseInit";

export default {
  state: {
    loadedSchools: []
  },
  mutations: {
    setLoadedSchool(state, payload) {
      state.loadedSchools.push(payload.data);
    },
    setLoadedSchools(state, payload) {
      state.loadedSchools = state.loadedSchools.concat(payload.data);
    }
  },
  actions: {
    storeSchools({ commit, getters }, payload) {
      commit("setLoadedSchools", payload);
    },
    findSchool({ commit }, payload) {
      commit("setLoading", true);
      db
        .collection("schools")
        .doc(payload.id)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            commit("setLoadedSchool", { data: doc.data() });
          } else {
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },
  getters: {
    school(state) {
      return schoolId => {
        return state.loadedSchools.find(school => {
          return school.id === schoolId;
        });
      };
    }
  }
};
