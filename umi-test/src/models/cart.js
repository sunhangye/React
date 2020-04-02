export default {
  namespace: 'cart',
  state: JSON.parse(localStorage.getItem('cart')) || [],
  // 生成器函数
  effect: {

  },
  // 更新state
  reducers: {
    addCart(state, action) {
      console.log(state);
      
      const good = action.payload
      const idx = state.findIndex(v => v.id === good.id)
      const cartCopy = [...state]
      // 已在购物车 更新数量
      if (idx > -1) {
        const goodCopy = {...cartCopy[idx]}
        goodCopy.count += 1
        cartCopy.splice(idx, 1, goodCopy)
      } else {
        // 新增
        cartCopy.push({...good, count: 1})
      }
      localStorage.setItem('cart', JSON.stringify(cartCopy))
      return cartCopy

    }
  }
}
