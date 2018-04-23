import db from "../../components/firebaseInit";

export default {
  state: {
    loadedReview: [],
    loadingReview: null,
    errorReview: null
  },
  mutations: {
    setLoadedReviews(state, payload) {
      state.loadedReview = state.loadedReview.concat(payload);
    },
    setLoadingReview(state, payload) {
      state.loading = payload;
    },
    setErrorReview(state, payload) {
      state.error = payload;
    },
    clearErrorReview(state) {
      state.error = null;
    }
  },
  actions: {
    storeReviews({ commit }, payload) {
      commit("setLoadingReview", true);
      db
        .collection("reviews")
        .where("addressCity", "==", "Gurugram")
        .get()
        .then(function(querySnapshot) {
          const reviews = [];
          querySnapshot.forEach(function(doc) {
            reviews.push(doc.data());
          });
          commit("setLoadedReviews", reviews);
          commit("setLoadingReview", false);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    clearError({ commit }) {
      commit("clearErrorReview");
    }
  },
  getters: {
    review(state) {
      return reviewId => {
        return state.loadedSchools.find(review => {
          return review.id === reviewId;
        });
      };
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
    loadedReview(state) {
      return state.loadedReview;
    }
  }
};
