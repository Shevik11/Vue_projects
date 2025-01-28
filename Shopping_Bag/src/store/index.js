import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    products: [],
    productsInBag: [],
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;

    },

    loadBag(state, products) {
      state.productsInBag = products;

    },

    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },

    removeFromBag(state, productId) {
      state.productsInBag = state.productsInBag.filter(product => product.id !== productId);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    }
  },

  actions: {
    loadProducts({commit}) {
      axios.get('https://fakestoreapi.com/products')
      .then(response => {
        commit('loadProducts', response.data)
      })
    },

    loadBag({commit}) {
      if (localStorage.getItem('productsInBag')) {
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
        return;
      }
    },


    addToBag({commit}, product) {
      commit('addToBag', product);

    },

    removeFromBag({commit}, productId) {
      if (confirm('Are you sure you want to remove this item from your bag?')) {
        commit('removeFromBag', productId);

      }
    }

  },
  modules: {
  }
})
