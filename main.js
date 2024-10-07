import './style.css'

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const itemInput = document.getElementById('item-input');
const createBtn = document.getElementById('create-btn');
const readBtn = document.getElementById('read-btn');
const itemList = document.getElementById('item-list');

// Create
createBtn.addEventListener('click', async () => {
  const title = itemInput.value;
  if (!title) return;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body: 'body',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    console.log('Created:', data);
    itemInput.value = '';
    readAll();
  } catch (error) {
    console.error('Error creating item:', error);
  }
});

// Read All
async function readAll() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayItems(data);
  } catch (error) {
    console.error('Error reading items:', error);
  }
}

readBtn.addEventListener('click', readAll);

// Update
async function updateItem(id, newTitle) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        title: newTitle,
        body: 'body',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    console.log('Updated:', data);
    readAll();
  } catch (error) {
    console.error('Error updating item:', error);
  }
}

// Delete
async function deleteItem(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    console.log('Deleted:', id);
    readAll();
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

// Display items
function displayItems(items) {
  itemList.innerHTML = '';
  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.innerHTML = `
      <span>${item.title}</span>
      <button onclick="updateItem(${item.id}, prompt('Enter new title:'))">Update</button>
      <button onclick="deleteItem(${item.id})">Delete</button>
    `;
    itemList.appendChild(itemElement);
  });
}

// Initial read
readAll();

// Expose functions to global scope for inline event handlers
window.updateItem = updateItem;
window.deleteItem = deleteItem;
