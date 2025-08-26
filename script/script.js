// import * as Data from './api' ;
const inputSearch = document.querySelector(".search-input")
const searchBtn = document.querySelector('search-btn');
const mealForm = document.querySelector('.search-box');
const filterMeal = document.querySelector('.filters');

const mealGrid = document.getElementById('mealsGrid');

let currentFilter = 'all';

function render() {
   runMeals();
   addEvenListener();
}

async function fetchDataCategories() {
   try {

      var requestOptions = {
         method: "GET",
         redirect: "follow",
      };
      const response = await fetch(
         "https://www.themealdb.com/api/json/v1/1/categories.php",
         requestOptions);

      if (!response.ok) {
         throw new Error(`something went wrong ${response.status}`);
      }

      const json = await response.json();

      console.log("data Categories return --", json.categories);
      return json.categories;
   } catch (error) {
      throw new console.error("Error:", err.response?.data || err.message);
   }

}

async function fetchDataSearch(item) {
   try {
      var requestOptions = {
         method: "GET",
         redirect: "follow",
      };
      const response = await fetch(
         `https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`,
         requestOptions);

      if (!response.ok) {
         throw new Error(`something went wrong ${response.status}`);
      }

      const json = await response.json();
      console.log("dataSearch return --", json.meals);
      return json.meals;
   } catch (error) {
      throw new console.error("Error:", err.response?.data || err.message);
   }

}





function addEvenListener() {
   mealForm.addEventListener('submit', handleSearch);

   // select all buttons inside .filters
   const filterButtons = filterMeal.querySelectorAll('button');
   filterButtons.forEach(btn => {
      btn.addEventListener('click', handleFilterChange);
   });
}

function handleSearch(e) {
   e.preventDefault();

   const searchLetter = inputSearch.value;

   if (!searchLetter) {
      throw ` please enter a Letter to search meal`;
      return;
   }
   mealForm.reset();
   runMeals(searchLetter);

   inputSearch.focus();
}


async function runMeals(letter) {

   const mealsData = await fetchDataSearch(letter);
   mealGrid.innerHTML = '';

   if (!mealsData) {
      mealGrid.innerHTML = `<p>No meals found for "${letter}"</p>`;
      return;
   }

   mealsData.forEach(meal => {
      const mealCard = createCard(meal);
      mealGrid.appendChild(mealCard);

   });

}

function createCard(meal) {
   const templateCard = document.createElement('div');
   templateCard.classList.add('meal-card');


   templateCard.innerHTML = `
        <template>
        <div class="meal-image">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
         </div>
        <div class="meal-content">
          <h3 class="meal-title">${meal.strMeal}</h3>
          <p class="meal-description">${meal.strInstructions}</p>   
       
        </div>
      </template>
    `;
   return templateCard;
}

(async function createFilterBtn() {

   const data = await fetchDataCategories();

   data.forEach((element) => {
      let btnFilter = document.createElement("button");
      btnFilter.classList.add('filter-btn');
      btnFilter.setAttribute("data-filter", element.strCategory);
      btnFilter.innerText = element.strCategory;
      filterMeal.appendChild(btnFilter);
   });
})();

function handleFilterChange(e) {
   for (const btn of filterButtons) {
      // console.log("element btn", btn.nodeName);

      if (btn.nodeName === 'BUTTON') {
         btn.classList.remove('active')
      }
   }
   e.target.classList.add('active');

   //This code snippet isn't totally stem from me, credit to stackoverflow.
   // this variable store witch filter is currently active, with the  element dataset that give access to all the data attribute of an HTML element and filter correspond to data-filter attribute in the HTML.
   const filter = e.target.dataset.filter;
   currentFilter = filter;
   const filteredMeals = filter === 'all' ? meals :
      meals.filter(meal => meal.category === filter || meal.tags.includes(filter));

   runMeals();
}
render();