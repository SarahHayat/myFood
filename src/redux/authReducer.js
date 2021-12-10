const initialState = {
  user: null,
  favorites: [],
};
const getUser = (state, action) => {
  return {
    ...state,
    user: action.value,
  };
};
const addToFavorite = (state, action) => {
  let copy = [...state.favorite];
  copy.push(action.value);
  return {
    ...state,
    favorite: copy,
  };
};

const removeToFavorite = (state, action) => {
  // let copy = state.favorite.filter(o => action.id !== o.id);
  let copy = [...state.favorite];
  copy.splice(copy.indexOf(action.value), 1);
  return {
    ...state,
    favorite: copy,
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add':
      return addToFavorite(state, action);
    case 'remove':
      return removeToFavorite(state, action);
    case 'update':
      return getUser(state, action);
    default:
      return state;
  }
};

export default authReducer;
