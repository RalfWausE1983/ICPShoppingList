import { shoppinglist_backend } from "../../declarations/shoppinglist_backend";


const getShoppingList = async () => {
  let shoppingList = await shoppinglist_backend.getShoppingItems();

  document.getElementById("itemsToBuy").innerHTML="";

  if (shoppingList.length > 0 ){ 
    
     for (let i = 0; i < shoppingList.length; i++){
      appendItemToList(i,shoppingList[i])

    }
    
  };
};



const appendItemToList = (id,item) => {
  

  let newItem = document.createElement("button");
  newItem.textContent = item;
  newItem.classList.add('button','is-rounded','mr-2','mt-2');
  newItem.addEventListener("click", ()=> {
    
    removeFromList(id);
  });

  document.getElementById("itemsToBuy").append(newItem);


}


const removeFromList = async (itemToRemove) => {

  isLoading();

  await shoppinglist_backend.removeItemFromList(itemToRemove);
  await getShoppingList();

  finishedLoading();

};



document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const item = document.getElementById("item").value;

  isLoading();

  await shoppinglist_backend.addItemToList(item);
  getShoppingList();

  finishedLoading();
  
  document.getElementById("item").value="";

  return false;
});


const isLoading = () => {

  const loader= document.createElement("progress");
  loader.setAttribute('id','loader');
  loader.classList.add('progress','is-medium','is-danger');


  const button = document.getElementById("submitButton");
  const textfield = document.getElementById("itemsToBuy");

  document.getElementById("isLoadingAnimation").appendChild(loader);

  textfield.setAttribute("disabled", true);
  button.setAttribute("disabled", true);

};

const finishedLoading = () => {
  document.getElementById("isLoadingAnimation").innerHTML="";
  
  const button = document.getElementById("submitButton");
  const textfield = document.getElementById("itemsToBuy");
  document.getElementById("isLoadingAnimation").style.visibility = "hidden";
  textfield.removeAttribute("disabled");
  button.removeAttribute("disabled");
}

await getShoppingList();