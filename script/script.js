import { fetchDataCategories, fetchDataSearch, fetchMealsByCategory } from './api.js';
const inputSearch = document.querySelector(".search-input")
const searchBtn = document.querySelector('search-btn');
const mealForm = document.querySelector('.search-box');
const filterMeal = document.querySelector('.filters');

const mealGrid = document.getElementById('mealsGrid');

let currentSearchResults = [];

function render() {
   runMeals("a"); //default number;
   addEvenListener();
}


function addEvenListener() {
   mealForm.addEventListener('submit', handleSearch);

   // select all buttons inside .filters
   filterMeal.addEventListener('click', handleFilterChange);
   // const filterButtons = filterMeal.querySelectorAll('button');

   // filterButtons.forEach(btn => {
   //    btn.addEventListener('click', handleFilterChange);
   // });
}

async function handleSearch(e) {
   e.preventDefault();

   const searchLetter = inputSearch.value;

   if (!searchLetter) {
      throw ` please enter a Letter to search meal`;
      return;
   }
   // mealForm.reset();
   currentFilter = "all";
   await runMeals(searchLetter.toLowerCase());

   inputSearch.focus();
}


async function runMeals(letter = 'a') {
   try {
      const mealsData = await fetchDataSearch(letter);
      currentSearchResults = mealsData || [];

      mealGrid.innerHTML = '';

      if (!mealsData || mealsData === 0) {
         mealGrid.innerHTML = `<p>No meals found for "${letter}"</p>`;
         return;
      }

      displayMeals(currentSearchResults);
   } catch (error) {
      console.error(`Error :`, error);
   }




}
//This function display the Meals by taking an arrays of Meals
function displayMeals(mealsData) {

   mealGrid.innerHTML = '';
   if(!mealsData){
      mealGrid.innerHTML = `<p>No meals found!</p>`;
      return 
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

async function handleFilterChange(e) {
   // for (const btn of filterButtons) {
   //    // console.log("element btn", btn.nodeName);
   //    if (btn.nodeName === 'button') {
   //       btn.classList.remove('active')
   //    }
   // }
   // e.target.classList.add('active');


   // // this variable store witch filter is currently active, with the  element dataset that give access to all the data attribute of an HTML element and filter correspond to data-filter attribute in the HTML.
   const filter = e.target.dataset.filter;
   currentFilter = filter;


   // runMeals();

   const filterButtons = filterMeal.querySelectorAll('button');
   filterButtons.forEach(btn => btn.classList.remove('active'));

   e.target.classList.add('active');
   currentFilter = e.target.dataset.filter;

   const filteredMeals = currentFilter === 'all'

   const dataC = await fetchDataCategories();
   const searchLetter = inputSearch.value;
   const dataSearch = await fetchDataSearch(searchLetter);

   dataC.forEach((elementC) => {
      dataSearch.forEach((elementS) => {

         if (elementC.strCategory == elementS.strCategory) {
            filteredMeals = currentFilter;
         }
      });
   });
   mealGrid.innerHTML = '';
   filteredMeals.forEach(meal => {
      const mealCard = createCard(meal);
      mealGrid.appendChild(mealCard);
   });
}
render();