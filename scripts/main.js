const apiUrl = "http://localhost:5000/products/";
const headers = {
  "Content-Type": "application/json",
};

const showToast = (message, firstColor, secondColor) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: `linear-gradient(to right, ${firstColor}, ${secondColor})`,
  }).showToast();
}

// Initialize Toastify
showToast("Welcome to CRUD App", "#00b09b", "#96c93d");

let currentUserId = null;

// DOM Elements
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productdescription = document.getElementById("productDesc");

const addBtn = document.getElementById("add");
const updateBtn = document.getElementById("update");

// Clear form function
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productdescription.value = "";
}

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl, { headers });
    const products = await response.json();
    displayProducts(products);
    // console.log(products[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Search products
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", async () => {
      const searchQuery = document.getElementById("searchInput").value.trim();
      // console.log("Search Query:", searchQuery); // Log the search query

      try {
        const response = await fetch(`${apiUrl}search/?name=${searchQuery}`, {
          headers,
        });
        // console.log("Search Response:", response); // Log the response
        const products = await response.json();
        // console.log("Products Found:", products); // Log the products
        displayProducts(products);
      } catch (error) {
        console.error("Error searching products:", error);
        showToast("Error searching products", "#ff5f6d", "#ffc371");
      }
    });
  }
});

// Display products in table
function displayProducts(products) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    ${products
      .map(
        (product) => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="editProduct('${product.id}')" class="btn btn-outline-primary">Edit</button>
                <button onclick="deleteProduct('${product.id}')" class="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
    `
      )
      .join("")}`;
}

// Add new product
addBtn.addEventListener("click", async () => {
  if (!productName.value || !productPrice.value || !productdescription.value) {
    showToast("Please fill all fields", "#ff5f6d", "#ffc371");
    return;
  }

  const product = {
    name: productName.value,
    price: parseFloat(productPrice.value),
    description: productdescription.value,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(product),
    });
    const newProduct = await response.json();
    fetchProducts();
    clearForm();
    showToast("Product added successfully!", "#00b09b", "#96c93d");
  } catch (error) {
    console.error("Error adding product:", error);
  }
});

// Edit product
window.editProduct = async function (id) {
  try {
    const response = await fetch(`${apiUrl}${id}`, { headers });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let product = await response.json();
    product = product[0];

    productName.value = product.name;
    productPrice.value = product.price;
    productdescription.value = product.description;
    currentUserId = id;
    addBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Update product
updateBtn.addEventListener("click", async () => {
  const product = {
    id: currentUserId,
    name: productName.value,
    price: productPrice.value,
    description: productdescription.value,
  };

  try {
    await fetch(`${apiUrl}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(product),
    });
    fetchProducts();
    clearForm();
    addBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    currentUserId = null;
    showToast("Product updated successfully!", "#00b09b", "#96c93d");
  } catch (error) {
    console.error("Error updating product:", error);
  }
});

// Delete product
window.deleteProduct = async function (id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmDelete) return;

  try {
    await fetch(`${apiUrl}`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id: id }),
    });
    fetchProducts();
    showToast("Product deleted successfully!","#00b09b", "#96c93d");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

// Initial fetch
fetchProducts();
