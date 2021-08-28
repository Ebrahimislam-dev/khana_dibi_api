const searchfood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
    if (searchText == '') {
        const errormsg = document.getElementById('error-msg');
        errormsg.style.display = "block"
        document.getElementById('search-result').textContent = "";
    }

    else {
        document.getElementById('search-msg').innerText = `Your ${searchText} Recipies`
        document.getElementById('error-msg').style.display = "none";
        // load data    
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }


}

const displaySearchResult = meals => {
    const searchresultDiv = document.getElementById('search-result');
    searchresultDiv.textContent = "";
    if (meals == null) {
        document.getElementById('error-msg2').style.display = 'block';
        console.log('hello if');
    };

    // document.getElementById('error-msg2').textContent = "";

    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div onclick = "loadmealDetail(${meal.idMeal}) " class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                      
                    </div>
                </div>
        `;
        searchresultDiv.appendChild(div)
    })
}




const loadmealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]));
}
const displayMealDetail = meal => {
    // console.log(mealDetail);

    const mealDetails = document.getElementById('meal-details')
    mealDetails.textContent = "";
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = `
<div class="card h-100 ">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <a href="${meal.strYoutube}" class="btn btn-success">See in video</a>
                </div>
        </div>
`;
    mealDetails.appendChild(div)


}