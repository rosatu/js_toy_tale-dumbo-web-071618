const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
let addToy = false
let submitToy = toyForm.children[0][2]

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', () =>{
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    data.forEach((toy)=> {
      let toyBox = document.createElement('div')
      toyBox.innerHTML =`
      <h2>${toy.name}</h2>
      <img src='${toy.image}' class="toy-avatar"/>
      <p>${toy.likes} Likes</p>
      <button class="like-btn">Like <3</button>`
      toyCollection.append(toyBox)

    })
  })

addBtn.addEventListener('click', (e) => {
  e.preventDefault()
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
      submitToy.addEventListener('click', (e) => {
      e.preventDefault()
          fetch('http://localhost:3000/toys',{
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: toyForm.children[0][0].value,
              image: toyForm.children[0][1].value,
              likes: 0
            })
          })
        .then(res => res.json())
        .then(data =>{
          let newToy = data
          console.log(newToy)
          let newToyBox = document.createElement('div')
          newToyBox.innerHTML =`
          <h2>${newToy.name}</h2>
          <img src='${newToy.image}' class="toy-avatar"/>
          <p>${newToy.likes} Likes</p>
          <button class="like-btn">Like <3</button>`
          toyCollection.append(newToyBox)
        })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

})
// OR HERE!
