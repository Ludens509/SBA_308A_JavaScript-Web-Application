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
   // filterMeal.addEventListener('click', handleFilterChange);
   const filterButtons = filterMeal.querySelectorAll('button');

   filterButtons.forEach(btn => {
      btn.addEventListener('click', handleFilterChange);
   });
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
   if (!mealsData) {
      mealGrid.innerHTML = `<p>No meals found!</p>`;
      return
   }
   mealsData.forEach(meal => {
      const mealCard = createCard(meal);
      mealGrid.appendChild(mealCard);

   });

}
// This function is the actual template in which the meals data will be populate in
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
          <p class="meal-category"><strong>Category:</strong> ${meal.strCategory || 'Unknown'}</p>  
       
        </div>
      </template>
    `;
   return templateCard;
}

//This function handle the filter buttton that will work dynamically upon clicking on it
(async function createFilterBtn() {
   try {
      const dataCategories = await fetchDataCategories();

      dataCategories.forEach((element) => {
         let btnFilter = document.createElement("button");
         btnFilter.classList.add('filter-btn');
         btnFilter.setAttribute("data-filter", element.strCategory);
         btnFilter.innerText = element.strCategory;
         filterMeal.appendChild(btnFilter);
      });
   } catch (error) {
      console.error("Error creating btn", error);
   }
})();


async function handleFilterChange(e) {

   for (const btn of filterButtons) {
      // console.log("element btn", btn.nodeName);
      if (btn.nodeName === 'button') {
         btn.classList.remove('active')
      }
   }
   e.target.classList.add('active');


   // // this variable store witch filter is currently active, with the  element dataset that give access to all the data attribute of an HTML element and filter correspond to data-filter attribute in the HTML.
   const filter = e.target.dataset.filter;
   currentFilter = filter;

   if (currentFilter === 'all') {
      displayMeals(currentSearchResults);
   } else {
      let filteredMeals = [];

      currentSearchResults.forEach(meal => {
         if (meal.strCategory && meal.strCategory.toLowerCase() === currentFilter.toLowerCase()) {
            filteredMeals.push(meal);
         }
      });

      displayMeals(filteredMeals);
   }
  
}

function updateActiveFilterButton() {
    const filterButtons = filterMeal.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        }
    });
}

render();