import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Actualiser la base de données sur Firebase pour pouvoir utiliser l'application

const appSettings = {
  databaseURL: "https://playground-2b7d5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const objectWhtvDB = ref(database, "object")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value
  push(objectWhtvDB, inputValue)
  clearInputFieldEl()
})

onValue(objectWhtvDB, function(snapshot) {

  if (snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())  

    clearShoppingListEl()

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]

    appendItemToShoppingListEl(currentItem) 
    }
  } else {
      shoppingListEl.innerHTML = "Plus rien à enlever"
  }
  
})

function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
  // ou => shoppingListEl.innerHTML += `<li>${itemValue}</li>`
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")
  newEl.textContent = itemValue

  newEl.addEventListener("click", function() {
    let exactLocationOfItemInDB = ref(database, `object/${itemID}`)
    remove(exactLocationOfItemInDB)
  })

  shoppingListEl.append(newEl)
}