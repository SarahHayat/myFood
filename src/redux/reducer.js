const initialState = {
  user: '',
};
const getUser = (state, action) => {
  return {
    ...state,
    user: action.value,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'update':
      return getUser(state, action);
    default:
      return state;
  }
};

export default reducer;
