import axios from "axios";
import React, { useEffect, useState, Component } from 'react';

export const getRecettes = () => {
    const [data, setData] = useState([]);
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
        .then((response) => {
            setData(response);
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error(error);
          })
}

const getRecettesByCategory = (category) => {
    axios.get('www.themealdb.com/api/json/v1/1/filter.php?c='+category)
    .then((response) => {
        const recettes = response.data;
        console.log(recettes)        
    })
    .catch((error) => {
        console.log(error)
    });
} 
const getRecettesByCountry = (country) => {
    axios.get('www.themealdb.com/api/json/v1/1/filter.php?c='+country)
    .then((response) => {
        const recettes = response.data;
        console.log(recettes)   
    })
    .catch((error) => {
        console.log(error)
    });
}

module.exports = 
    getRecettes
