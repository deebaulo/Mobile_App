import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" 
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
databaseURL: "https://cat-cart-25fa4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref (database, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addBtnEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");



addBtnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);
   

    clearInputFieldEl();

    //  appendToShoppingListEl(inputValue); 

});


    onValue(shoppingListInDB, function(snapshot){
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val());

            clearShoppingListEl();
    
            for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i];
                let currentItemID = currentItem[0];
                let currentItemValue = currentItem[1];
    
                appendToShoppingListEl(currentItemValue, currentItemID);
            }
        } else {
            shoppingListEl.innerHTML = "No items here... yet!"
        }
    });

function clearShoppingListEl() {
shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendToShoppingListEl(item, itemID) {
    let newEl = document.createElement("li");
    newEl.textContent = item;   

   
    newEl.addEventListener("click", function(){
        
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

        remove(exactLocationOfItemInDB);
        
    });

        shoppingListEl.append(newEl);
    }





