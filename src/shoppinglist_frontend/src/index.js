import { shoppinglist_backend } from "../../declarations/shoppinglist_backend"


const getShoppingList = async () => {
  let shoppingList = await shoppinglist_backend.getShoppingItems()

  document.getElementById("itemsToBuy").innerHTML=""

  if (shoppingList.length > 0 ){ 
    
     for (let i = 0; i < shoppingList.length; i++){
      appendItemToList(i,shoppingList[i])

    }
    
  }
}



const appendItemToList = (id,item) => {
  let newItem = document.createElement("button")
  newItem.textContent = item
  newItem.classList.add('button','is-rounded','mr-2','mt-2')
  newItem.addEventListener("click", ()=> {
    
    removeFromList(id)
  });

  document.getElementById("itemsToBuy").append(newItem)


}


const removeFromList = async (itemToRemove) => {
   await shoppinglist_backend.removeItemFromList(itemToRemove);
  await getShoppingList()
}



const createWorkingPage = async () => {

  document.getElementById("container").innerHTML=""

  let infotext = document.createElement("text")
  infotext.classList.add("heading")
  infotext.classList.add("is-italic")

  infotext.textContent="Bitte einfach einen Artikel eintragen"

  let shoppingListForm = document.createElement("form")

  shoppingListForm.setAttribute("id","shoppingListForm")

  shoppingListForm.setAttribute("action","#")

  let itemToAddField = document.createElement("input")
  itemToAddField.setAttribute("type","text")
  itemToAddField.setAttribute("id","item")
  itemToAddField.classList.add("input")

  let submitButton = document.createElement("button")
  submitButton.setAttribute("type","submit")
  submitButton.textContent="Eintragen"
  submitButton.classList.add("button")
  submitButton.classList.add("is-dark")
  submitButton.classList.add("mt-3")
  

  shoppingListForm.appendChild(itemToAddField)
  shoppingListForm.appendChild(submitButton)


  document.getElementById("container").append(infotext)
  document.getElementById("container").append(shoppingListForm)

  let shoppinglistContainer = document.createElement("div")
  
  shoppinglistContainer.setAttribute("id","itemsToBuy")

  document.getElementById("container").append(shoppinglistContainer)

  shoppingListForm.addEventListener('submit', async (e)=> {
      e.preventDefault()
      let item = document.getElementById("item").value
    await shoppinglist_backend.addItemToList(item)

    await getShoppingList()

    item.value=""

  })
  
  await getShoppingList()

 
}


const createLoginPage = ()=> {

  

  let infoField = document.createElement("text")
  infoField.textContent="Login"
  infoField.classList.add("heading")

  let passwordForm = document.createElement("form")
  passwordForm.setAttribute("id","passwordForm")
  passwordForm.setAttribute("action","#")

  let usernameField = document.createElement("input")
  usernameField.setAttribute("type","text")
  usernameField.setAttribute("id","username")
  usernameField.classList.add("input")

  let usernameFieldLabel = document.createElement("label")
  usernameFieldLabel.setAttribute("for","username")
  usernameFieldLabel.textContent="Benutzername:"

  let passwordField = document.createElement("input")
  passwordField.setAttribute("type","password")
  passwordField.setAttribute("id","password")
  passwordField.classList.add("input")

  let passwordFieldLabel = document.createElement("label")
  passwordFieldLabel.setAttribute("for","password")
  passwordFieldLabel.textContent="Passwort:"

  let submitButton=document.createElement("button")
  submitButton.setAttribute("type","submit")
  submitButton.classList.add("button")
  submitButton.classList.add("is-dark")
  submitButton.textContent="Login"

  passwordForm.appendChild(usernameFieldLabel)
  passwordForm.appendChild(usernameField)
  passwordForm.appendChild(passwordFieldLabel)
  passwordForm.appendChild(passwordField)
  passwordForm.appendChild(submitButton)

  document.getElementById("container").append(infoField)
  document.getElementById("container").append(passwordForm)

  passwordForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    createWorkingPage()
  })
} 



createLoginPage()




