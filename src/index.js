

const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/pups")
    .then (resp => resp.json())
    .then (dogData => {
        
        dogData.forEach((dog) => {
        
        const spanDogBar = document.createElement("span")
        spanDogBar.innerHTML = dog.name
        
        dogBar.append(spanDogBar) 
        
        spanDogBar.addEventListener("click", () => {
           let goodBadDog = dog.isGoodDog;
            const dogImg = document.createElement("img");
            dogImg.src = dog.image
            const dogName = document.createElement("h2");
            dogName.innerHTML = dog.name
            const dogGoodBadBtn = document.createElement("button");
            dogGoodBadBtn.innerHTML = (goodBadDog) ? "Good Dog" : "Bad Dog";
            console.log("btn", dogGoodBadBtn)
            dogGoodBadBtn.addEventListener("click", () => {
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json",
                    Accept: "application/json"
                },  body: JSON.stringify({
                    isGoodDog: !goodBadDog
                })
                    
                    

                    
                })
                .then(resp => resp.json())
                .then(newPup => {
                    dogGoodBadBtn.innerHTML = (newPup.isGoodDog) ? "Good Dog" : "Bad Dog";
                })


             goodBadDog = !goodBadDog
            })
            dogInfo.append(dogImg, dogName, dogGoodBadBtn)
            
            
        })
        } )
        
    })

})