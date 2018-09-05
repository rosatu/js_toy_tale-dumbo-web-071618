const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
let addToy = false

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', () =>{

  function toyBox(toy){
    let toyBox = document.createElement('div')
    toyBox.classList.add('card')
    toyBox.setAttribute('data-id', toy.id)
    toyBox.innerHTML=`
        <h2>${toy.name}</h2>
        <img src='${toy.image}' class="toy-avatar"/>
        <p><span class='toy-likes'>${toy.likes}</span> Likes</p>
        <button class="like-btn">Like <3</button>
        `
        return toyBox
      }

  fetch('http://localhost:3000/toys')
        .then(res => res.json())
          .then(data => {
            data.forEach((toy)=> {
              toyCollection.appendChild(toyBox(toy))
            })
          })

  toyForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let toyNameInput = document.querySelector('input[name="name"]')
    let toyImageInput = document.querySelector('input[name="image"]')

    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: toyNameInput.value,
        image: toyImageInput.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(data =>{
      toyCollection.appendChild(toyBox(data))
    })
    toyNameInput.value = ""
    toyImageInput.value = ""
  })


  addBtn.addEventListener('click', (e) => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener('click', (e) => {
    if(e.target.classList.contains('like-btn')){
      let parent = event.target.parentNode
      let toyLikes = parent.querySelector('.toy-likes')
        fetch(`http://localhost:3000/toys/${parent.getAttribute('data-id')}`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          likes: parseInt(toyLikes.innerText) + 1
        })
      }).then(response => response.json())
        .then(data => toyLikes.innerText = data.likes)
    }
  })

})
