const initialState = {
  newReceipe: [
    {
      id: Math.random(),
      name: 'Test',
      category: 'category',
      origin: 'origin',
      instructions: 'instructions',
      imageUrl: 'file',
      ingredients: 'ingredients',
    },
  ],
  ingredients: [
    {id: 1, title: 'pain'},
    {id: 2, title: 'fromage'},
  ],
};

const createNewReceipe = (state, action) => {
  console.log('tableau de recette = ', state.newReceipe);
  console.log('here avant le copy du tableau');

  let copy = [...state.newReceipe];
  console.log('copy= ', copy);
  copy.push(action.value);
  return {
    ...state,
    newReceipe: copy,
  };
};

const addIngredient = (state, action) => {
  console.log('action.value', action.value);
  let copy = [...state.ingredients];
  copy.push(action.value);
  return {
    ...state,
    ingredients: copy,
  };
};
const removeIngredient = (state, action) => {
  let copy = state.ingredients.filter(o => action.id !== o.id);
  return {
    ...state,
    ingredients: copy,
  };
};
const eraseAllIngredient = (state, action) => {
  return {
    ...state,
    ingredients: [],
  };
};

const receipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'create':
      return createNewReceipe(state, action);
    case 'add':
      return addIngredient(state, action);
    case 'remove':
      return removeIngredient(state, action);
    case 'erase':
      return eraseAllIngredient(state, action);
    default:
      return state;
  }
};

export default receipeReducer;
