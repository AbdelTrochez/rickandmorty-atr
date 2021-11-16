const cardContainer = document.getElementById("card-container")
const next = document.getElementById("next")
const prev = document.getElementById("prev")

let counterPages = 1
next.onclick = ()=>{
   fetch(`https://rickandmortyapi.com/api/character`)
   .then(response=>response.json())
   .then(data=>{
      if(counterPages!==data.info.pages){
         counterPages ++
         cardContainer.innerHTML=""
         console.log(counterPages)
         fetchCharacters(counterPages)
      }
   })   
}
prev.onclick = ()=>{
   if(counterPages!==1){
      counterPages --
      cardContainer.innerHTML=""
      console.log(counterPages)
      fetchCharacters(counterPages)
   }
}
document.onload = fetchCharacters(counterPages)

function fetchCharacters(pageNum){
   fetch(`https://rickandmortyapi.com/api/character?page=${pageNum}`)
   .then(response=>response.json())
   .then(data=>{
      const characters = data.results
   
      characters.forEach(character => {
      const {image, name, species, origin, location, gender, status} = character
      const card = document.createElement("div")
      card.className = "card"
      card.innerHTML = `
                        <div class="card-image" style="background-image:url(${image})"></div>
                        <div class="card-text">
                           <h2>${name}</h2>
                           <p>Origin: ${origin.name}</p>
                           <p>Location: ${location.name}</p>
                        </div>
                        <div class="card-stats">
                           <div class="stat">
                              <div class="value">${species}</div>
                              <div class="type">Species</div>
                           </div>
                           <div class="stat border">
                              <div class="value">${gender}</div>
                              <div class="type">Gender</div>
                           </div>
                           <div class="stat">
                              <div class="value">${status}</div>
                              <div class="type">Status</div>
                           </div>
                        </div>`
      cardContainer.appendChild(card)
      });
      console.log(data)
   })
   executeTilt()
}

function executeTilt(){
   setTimeout(()=>{
      VanillaTilt.init(document.querySelectorAll(".card"),{
         glare: true,
         reverse: true,
         "max-glare":0.2
      })
   },500)
}