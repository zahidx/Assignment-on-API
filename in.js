const creatMeal = (meal, mealInput) => {
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;
    const mealInfo = `
    <a href="#meal-details-section" style="text-decoration: none; color: black;">
        <div onclick="getMealDetails(${meal.idMeal})" class="card border-0 shadow cursor" style="width: 18rem; border-radius: 10px">
            <img src="${mealPhoto}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${mealName}</h5>
            </div>
        </div>
    </a>
    `
    const mealInfoSection = document.getElementById('meal-info-section');
    const mealInfoDiv = document.createElement('div');
    mealInfoDiv.className = 'col-xm-1 col-sm-1 col-md-3 p-3 d-flex justify-content-center';
    mealInfoDiv.innerHTML = mealInfo;
    mealInfoSection.appendChild(mealInfoDiv);
}

const showMealInfoDiv = (data, mealInput) => {
    const meal = data.meals;

    // Check If Searched Meal  Found Or Not
    if (meal) {
        meal.forEach(element => {
            creatMeal(element, mealInput);
        });
    }
    else {
        const noMealFound = document.getElementById('no-meal-found');
        noMealFound.innerText = `No meal found for ${mealInput}!`;
    }
}

const searchMeal = () => {
    const mealInput = document.getElementById('meal-input').value;


    
   
    if (mealInput) {

      
        const noMealFound = document.getElementById('no-meal-found');
        noMealFound.innerText = ``;

       
        const mealInfoSection = document.getElementById('meal-info-section');
        mealInfoSection.innerHTML = ``;

       
        const mealDetailsSection = document.getElementById('meal-details-section');
        mealDetailsSection.innerHTML = ``;

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                showMealInfoDiv(data, mealInput);
            }
            )
    }
    else {
        const noMealFound = document.getElementById('no-meal-found');
        noMealFound.innerText = `You haven't entered anything`;
    }
}

document.getElementById('meal-submit').addEventListener('click', searchMeal);


//---------------------------Display Meal -----------------------------------

const showMealDetailsDiv = data => {
    const meal = data.meals[0];
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;

    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = `
    <div id="meal-details" class="card px-0 pb-1 border-0 shadow col-xm-12 col-sm-12 col-md-6" style="border-radius: 10px;">
        <img src="${mealPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
        <div class="card-body">
            <h2 class="card-title text-center my-3">${mealName}</h2>
            <hr>
            <h5 class="card-title mt-4">Meal Ingredients</h5>
            <div id="meal-ingredients"></div>
        </div>
    </div>
`
    const mealIngredients = document.getElementById('meal-ingredients');

   
    for (let i = 1; meal[`strIngredient${i}`]; i++) {
        const ingredients = `
    ✔ ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
    `
        const mealDetailsP = document.createElement('p');
        mealDetailsP.className = 'card-text';
        mealDetailsP.innerText = ingredients;
        mealIngredients.appendChild(mealDetailsP);
    }
}

const getMealDetails = mealID => {
    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = ``;

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(res => res.json())
        .then(data => showMealDetailsDiv(data));
}