const initialState = {
  user: null,
  newReceipe: {},
};
const getUser = (state, action) => {
  return {
    ...state,
    user: action.value,
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'update':
      return getUser(state, action);
    default:
      return state;
  }
};

export default authReducer;
