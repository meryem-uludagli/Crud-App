let editMode = false;
let editItem;
let editItemId;

const form = document.querySelector(".form-wrapper");
const input = document.querySelector("#input");
const itemList = document.querySelector(".item-list");
const alert = document.querySelector(".alert");
const addButton = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");

const addItem = (e) => {
  e.preventDefault();
  const value = input.value;
  if (value !== "" && !editMode) {
    const id = new Date().getTime().toString();
    createElement(id, value);
    setToDefault();
    showAlert("Element Added", "success");
    addToLocalStorage(id, value);
  } else if (value !== "" && editMode) {
    editItem.innerHTML = value;
    showAlert("Element Updated", "success");
    setToDefault();
  }
};

const showAlert = (text, action) => {
  alert.textContent = `${text}`;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};

const deleteItem = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  const id = element.dataset.id;
  itemList.removeChild(element);
  showAlert("Element Deleted", "danger");
};

const editItems = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  editItem = e.target.parentElement.parentElement.previousElementSibling; // Corrected
  input.value = editItem.innerText;
  editMode = true;
  editItemId = element.dataset.id;
  addButton.textContent = "Edit";
};

const setToDefault = () => {
  input.value = "";
  editMode = false;
  editItemId = "";
  addButton.textContent = "Add";
};

const createElement = (id, value) => {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("data-id", id);
  newDiv.classList.add("items-list-item");
  newDiv.innerHTML = `
      <p class="item-name">${value}</p>
            <div class="btn-container">
              <button class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
    `;
  const deleteBtn = newDiv.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = newDiv.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItems);
  const clearBtn = document.querySelector(".clear-btn");
  clearBtn.addEventListener("click", clearAll);
  itemList.appendChild(newDiv);
  showAlert("Element Added", "success");
};

const addToLocalStorage = (id, value) => {
  const item = { id, value };
  localStorage.setItem("items", JSON.stringify(item));
};

// * Clear All
const clearAll = (e) => {
  itemList.innerHTML = "";
  showAlert("All Deleted", "danger");
  localStorage.removeItem("items");
  setToDefault();
};

form.addEventListener("submit", addItem);
