 
 const searchInput = document.querySelector(".search-input")
 const searchBtn = document.querySelector('search-btn');
 const filterMeal = document.querySelector('.filters');

 const mealGrid = document.getElementById('mealsGrid');



function render(){
    addEvenListener();
}

 function addEvenListener(){
    searchInput.addEventListener('submit', handleSearch);


 }

 function handleSearch(e){
    
 }


 function runMeals(mealsData = meals){
    mealGrid. innerHTML ='';

    mealsData.forEach(meal => {
        const  mealCard = createCard(meal);
        mealCard.appendChild(mealCard);

    });

 }

 function createCard(meal){
    const templateCard = document.createElement('div');
    templateCard.classList.add('meal-card');


    templateCard.innerHTML=`
        <template>
        <div class="meal-image">${meal.strMealThumb}</div>
        <div class="meal-content">
          <h3 class="meal-title">${meal.strMeal}</h3>
          <p class="meal-description">${meal.strInstructions}</p>   
       
        </div>
      </template>
    `;
    return templateCard;
 }

