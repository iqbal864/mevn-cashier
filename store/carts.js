export const state = () => ({
  items: []
});

export const getters = {
  cartItems: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const data_menu = rootState.menus.data_menu.find(data_menu => data_menu.id === id);
      return {
        id: data_menu.id,
        title: data_menu.title,
        price: data_menu.price,
        quantity
      }
    })
  }
};

export const mutations = {
  addItem(state, id) {
    state.items.push({
      id: id,
      quantity: 1
    })
  },
  incrementItem(state, id) {
    state.items.find(item => item.id === id).quantity++;
  },
};

export const actions = {
  addToCart({ commit, state }, id) {
    const found = state.items.find(item => item.id === id);
    if (found) {
      commit('incrementItem', id);
    } else {
      commit('addItem', id);
    }
  }
}
