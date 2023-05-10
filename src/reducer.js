const reducer = (state, action) => {
  if (action.type === "SET_CART") {
    return { ...state, isLoading: false, isError: false, cart: action.payload };
  }
  if (action.type === "SET_ERROR") {
    return { ...state, isLoading: false, isError: true };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "REMOVE_ITEM") {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    console.log(newCart);
    return { ...state, cart: newCart };
  }
  if (action.type === "INCREASE_ITEM") {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE_ITEM") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        console.log(price, amount);
        const itemTotal = price * amount;
        console.log(itemTotal);
        cartTotal.amount += amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
};

export default reducer;
