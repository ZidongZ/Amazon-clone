export const initialState = {
  basket: [],
  user: null
};

export const  getTotalPrice = (basket) => {
  let sum=0
  for(let item of basket){
    sum += item.price
  }
  return sum
}

const reducer = (state,action) => {
  switch(action.type){
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item]
      };
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex((item)=>item.id === action.id)
      let newBasket = [...state.basket]
      if(index >= 0){
        newBasket.splice(index,1)
      }else{
        console.warn(
          `Can't remove product (id: ${action.id}) as if it's not in the basket`
        )
      }
      return{
        ...state,
        basket: newBasket
      };
    case 'EMPTY_BASKET':
      return{
        ...state,
        basket:[]
      }
    case 'SET_USER':
      return{
        ...state,
        user: action.user
      };

    default:
      return state;
  }
};

export default reducer;
