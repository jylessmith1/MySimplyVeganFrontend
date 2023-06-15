const myVegan = document.getElementById(''); // need to create id and div
// console.log(myMenu)
let recTitle = document.querySelector('.recTitle')
let recTime = document.querySelector('.recTime')
let recIngred = document.querySelector('.recIngred')
let recDirec = document.querySelector('.recDirec')
let searchAllRecBtn = document.querySelector('#searchAllRecBtn')
let searchIngredInput = document.querySelector('#ingred')
let recSearchCardBody = document.querySelector('.recSearchCardBody')
let recSearchTitle = document.querySelector('.recSearchTitle')
let recSearchTime = document.querySelector('.recSearchTime')
let recSearchIngred = document.querySelector('.recSearchIngred')
let recSearchDirec = document.querySelector('.recSearchDirec')
let nextButton = document.querySelector('.nextBtn')
let backButton = document.querySelector('.backBtn')
let addBtn = document.querySelector('#addBtn')
let btnPic = document.querySelector('#btnPic')
let favCardBody = document.querySelector('.favCardBody')
let favs = document.querySelector('#favorites')
let favPage = document.querySelector('.favPage')
let favRec = document.querySelector('.favRec')
let favTitle = document.querySelector('.favTitle')
let favTime = document.querySelector('.favTime')
let favIngred = document.querySelector('.favIngred')
let favDirec = document.querySelector('.favDirec')
let favBackToFavBtn = document.querySelector('.favBackToFavBtn')
let recipeSearchCard = document.querySelector('#recipeSearchCard')

console.log(recipeSearchCard)
console.log(favRec)
console.log(addBtn)


console.log(recSearchCardBody)
let favorites = []
// let searchBtn = 0   //counting search clicks


// fetch for random recipe
fetch("https://simplyvegan-backend-4h5s.onrender.com/recipes/random")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        recTitle.innerText = data.name
        recTime.innerText = data.time
        recIngred.innerText = data.ingredients
        recDirec.innerText = data.directions
    });
console.log(searchAllRecBtn)

//search All Recipes Button 
searchAllRecBtn.addEventListener('click', () => {
    if(recipeSearchCard.style.display = "none"){
        recipeSearchCard.style.display = "flex"
    }
    let desiredingredient = searchIngredInput.value
    searchIngredInput.value = ""
    let recCount = 0
    //console.log(recCount)
    //console.log(desiredingredient)
    //console.log(searchIngredInput.value)
    
    //let recCount = 0
    if(backButton.style.display == "block"){
         console.log(backButton.style.display)
         backButton.style.display = "none"
     }
     if(nextButton.style.display == "block"){
         console.log(nextButton.style.display)
         nextButton.style.display = "none"
     }
   
    fetch(`https://simplyvegan-backend-4h5s.onrender.com/recipes/${desiredingredient}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //let recCount = 0
            console.log(recCount)
            if (data.length > 0) {

                //if there is data, then filling out first recipe card
                //check to see if recipe is on favorite list to fill or unfill heart
                //console.log(data[0].name)
                //console.log(favorites)
                // if(favorites.includes(data[0].name)){
                    btnPic.src="./images/emptyHeart.png"
                    if(favorites.length >0){
                        favorites.forEach(fav =>{
                            if(fav.name == data[0].name){
                                btnPic.src="./images/fillHeart.png"
                            }
                        //console.log('its included!')
                        //console.log(favorites)
                        })
                    }
                
                recSearchTitle.innerText = data[0].name
                recSearchTime.innerText = data[0].time
                addBtn.style.display = "block"
                recSearchIngred.innerText = data[0].ingredients
                recSearchDirec.innerText = data[0].directions

                //if there is more than one recipe with that ingredient
                if (data.length > 1) {
                    //shows next button
                    nextButton.style.display = "block"
                }
               
                //what to do when next button clicked
                nextButton.addEventListener("click", e => {
                    nextButton.style.display = 'none';
                    if(recCount < data.length){
                        recCount++
                        console.log(data)
                        console.log(`recCount: ${recCount}`)
                        //fill heart if fav, else empty
                        btnPic.src="./images/emptyHeart.png"
                        if(favorites.length >0){
                            favorites.forEach(fav =>{
                                console.log(fav.name)
                                console.log(recCount)
                                console.log(data)
                                console.log(data[recCount].name)
                                if(fav.name == data[recCount].name){
                                    btnPic.src="./images/fillHeart.png"
                                }
                            })
                        }
                        console.log(recCount)
                        recSearchTitle.innerText = data[recCount].name
                        recSearchTime.innerText = data[recCount].time
                        recSearchIngred.innerText = data[recCount].ingredients
                        recSearchDirec.innerText = data[recCount].directions
                        console.log(`recCount: ${recCount}`)
                        console.log(`data.length: ${data.length}`)
                        //if we're not at first recipe, display back btn
                        if (recCount >=1) {
                        backButton.style.display = "block"
                        }
                        else {
                            backButton.stlye.display = 'none'
                        }

                        //if we're not at last recipe, display next btn
                        if (data.length - 1 > recCount) {
                            nextButton.style.display = 'block'
                            console.log(`${data.length - 1 > recCount}`)
                        }
                        else {
                            nextButton.style.display = 'none'
                            console.log(`${data.length - 1 > recCount}`)
                        }
                    }
                })
                //what to do when back button clicked
                backButton.addEventListener('click', e => {
                    backButton.style.display = "none"
                    console.log(`Checking recCount, just clicked back ${recCount}`)
                    if (recCount >=1 ) {
                        //fill heart if fav, else empty
                        btnPic.src="./images/emptyHeart.png"
                        if(favorites.length >0){
                            favorites.forEach(fav =>{
                                if(fav.name == data[recCount-1].name){
                                    btnPic.src="./images/fillHeart.png"
                                }
                            })
                        }
                        recSearchTitle.innerText = data[recCount -1].name
                        recSearchTime.innerText = data[recCount -1].time
                        recSearchIngred.innerText = data[recCount -1].ingredients
                        recSearchDirec.innerText = data[recCount -1].directions
                        recCount --
                            if(recCount >=1){
                            backButton.style.display = "block"
                            }
                            if (data.length - 1 > recCount) {
                            nextButton.style.display = 'block'
                            console.log(`recCount${recCount}`)
                            console.log(backButton.style.display)
                            }

                    }
                    
                })
                //adding to favorites
                addBtn.addEventListener('click',e=>{
                    let check = 0
                    console.log('clicked heart')
                    console.log(btnPic)
                    console.log(btnPic.src)
                    if(favorites.length >0){
                        favorites.forEach(item =>{
                            if(item.name == recSearchTitle.innerText){
                                check++
                                console.log(check)
                            }
                        })
                    }
                    if(check == 0){

                        btnPic.src="./images/fillHeart.png"
                        console.log(data)
                        data.forEach(recipe => {
                            if(recSearchTitle.innerText == recipe.name){
                                console.log(recipe.name)
                                favorites.push(recipe)
                                console.log(favorites)
                                let fav = document.createElement('p')
                                fav.classList.add('card-text')
                                fav.classList.add('favTitle')
                                fav.classList.add('love')
                                console.log(fav)
                                fav.innerText = recipe.name
                                favPage.appendChild(fav)
                                favs.style.display = "flex"
                                favPage.style.display = "block"
                           
                                fav.addEventListener('click',() =>{
                                    favPage.style.display = "none"
                                    favRec.style.display = "block"
                                    console.log('clicked')
                                    favTitle.innerText = recipe.name
                                    favTime.innerText = recipe.time
                                    favIngred.innerText = recipe.ingredients
                                    favDirec.innerText = recipe.directions
                                })

                            }
                        
                        });
                    }
                   
                })

                favBackToFavBtn.addEventListener('click',()=>{
                   favPage.style.display = "block"
                   favRec.style.display = "none"
                })

            }
            //there are no recipes that contain that ingredient
            else{
                recSearchTitle.innerText = "No match, try searching a different ingredient."
                recSearchTime.innerText = ""
                recSearchIngred.innerText = ""
                recSearchDirec.innerText = ""
            }
        
        });
})




// declaring the variables 
const myVegans = document.getElementById('');
let factsTitle = document.querySelector('.factsTitle')
let factsTime = document.querySelector('.factsTime')
let refreshBtn = document.querySelector(".btn-primary")

// loads random fact on page load
fetch("https://simplyvegan-backend-4h5s.onrender.com/facts/random")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        factsTitle.innerText = data.fact
    }); 

// refreshes random fact on button click
refreshBtn.addEventListener("click", () => {
    fetch("https://simplyvegan-backend-4h5s.onrender.com/facts/random")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            factsTitle.innerText = data.fact
        });
}); 