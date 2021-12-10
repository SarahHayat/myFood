import '../../../global';
import {parseMealData} from '../utils';

const axios = require('axios');

export function getMeal(mealId) {
  return (
    axios
      // eslint-disable-next-line no-undef
      .get(API_MEAL_URL + 'lookup.php?i=' + mealId)
      .then(function (response) {
        return parseMealData(response.data.meals[0]);
      })
      .catch(function () {
        return {
          error: 'Cannot get data for meal with ID ' + mealId,
        };
      })
  );
}

export function getRandomMeal() {
    return (
        axios
            .get(API_MEAL_URL + 'random.php')
            .then(function (response) {
                return parseMealData(response.data.meals[0]);
            })
            .catch(function () {
                return {
                    error: 'Cannot get data for random meal',
                }
            })
    )
}
