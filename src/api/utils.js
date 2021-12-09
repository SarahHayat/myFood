function apiStringsToArray(data, key, startIndex, endIndex) {
  let elements = [];

  for (let i = startIndex; i <= endIndex; i++) {
    let element = data[key + `${i}`];

    if (element !== '' && element !== null && element !== undefined) {
      elements.push(element);
    }
  }

  return elements;
}

export function parseMealData(data) {
  return {
    id: data.idMeal,
    name: data.strMeal,
    category: data.strCategory,
    origin: data.strArea,
    instructions: data.strInstructions,
    imageUrl: data.strMealThumb,
    tags: data.strTags.split(','),
    youtubeUrl: data.strYoutube,
    ingredients: apiStringsToArray(data, 'strIngredient', 1, 20),
    measures: apiStringsToArray(data, 'strMeasure', 1, 20),
  };
}
