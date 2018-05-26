import db from "../../components/firebaseInit";

export default {
  state: {
    loadedSchools: []
  },
  mutations: {
    setLoadedSchool(state, payload) {
      let presentSchool = state.loadedSchools.find(school => {
        return school.id === payload.data.id;
      });
      if (presentSchool === null || presentSchool === undefined){
        state.loadedSchools.push(payload.data);
      }
    },
    setLoadedSchools(state, payload) {
      payload.data.forEach(schoolToSave =>{
        let presentSchool = state.loadedSchools.find(school => {
          return school.id === schoolToSave.id;
        });

        if (presentSchool === null || presentSchool === undefined){
          state.loadedSchools.push(schoolToSave);
        }
      });
    }
  },
  actions: {
    storeSchools({ commit, getters }, payload) {
      commit("setLoadedSchools", payload);
    },
    findSchool({ commit }, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        commit("setLoading", true);
        db.collection("schools")
          .doc(payload.id)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              resolve({data : doc.data()});
              commit("setLoadedSchool", {data: doc.data()});
            } else {
              reject({data : "No results found"});
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            reject({data : "Error getting document:" +error});
            console.log("Error getting document:", error);
          });
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
