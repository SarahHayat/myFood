const initialState = {
  favorite: [],
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
  copy.splice(copy.indexOf(action.id), 1);
  return {
    ...state,
    favorite: copy,
  };
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add':
      return addToFavorite(state, action);
    case 'remove':
      return removeToFavorite(state, action);
    default:
      return state;
  }
};

export default favoriteReducer;
