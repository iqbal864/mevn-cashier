export const state = () => ({
  items: [],
  additionals: [
    {
      title: 'Tax',
      mode: 'percentage',
      value: 2.5,
    },
    {
      title: 'Service Charge',
      mode: 'fix',
      value: 1500,
    },
  ],
})

export const getters = {
  cartItems: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const data_menu = rootState.menus.data_menu.find(
        (data_menu) => data_menu.id === id
      )
      return {
        id: data_menu.id,
        title: data_menu.title,
        price: data_menu.price,
        quantity,
      }
    })
  },
  itemTotal: () => (price, quantity) => {
    return price * quantity
  },
  subTotal: (state, getters) => {
    return getters.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  },
  calculation: (state, getters) => (value) => {
    return (getters.subTotal * value) / 100
  },
  sumCalculation: (state, getters) => {
    return state.additionals.reduce((total, item) => {
      if (item.mode == 'percentage') {
        return total + getters.calculation(item.value)
      } else {
        return total + item.value
      }
    }, 0)
  },
  total: (state, getters) => {
    return getters.subTotal + getters.sumCalculation
  },
}

export const mutations = {
  addItem(state, id) {
    state.items.push({
      id: id,
      quantity: 1,
    })
  },
  incrementItem(state, id) {
    state.items.find((item) => item.id === id).quantity++
  },
  decrementItem(state, id) {
    let item = state.items.find((item) => item.id === id)
    if (item.quantity > 1) {
      item.quantity--
    }
  },
  removeItem(state, id) {
    let item = state.items.findIndex((item) => item.id === id)
    state.items.splice(item, 1)
  },
}

export const actions = {
  addToCart({ commit, state }, id) {
    const found = state.items.find((item) => item.id === id)
    if (found) {
      commit('incrementItem', id)
    } else {
      commit('addItem', id)
    }
  },
  increment({ commit }, id) {
    commit('incrementItem', id)
  },
  decrement({ commit }, id) {
    commit('decrementItem', id)
  },
  remove({ commit }, id) {
    commit('removeItem', id)
  },
}
