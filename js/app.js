let count = 0;

const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR0frgKPlWlnYv4TDNRhBse9Oep6W-3T_T1_E8fFeZJG_QEmtvji_EYVoao`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  console.log("Allproducts: ", allProducts);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    
 
      <div class="card single-product">
        <img src="${image}" class="card-img-top p-3 mx-auto" style="width:250px; height:250px" alt="..." />
        <div class="card-body text-start">
          <h4 class="card-title">${product.title}</h4>
          <p class="card-text">Category: ${product.category}</p>
          <h5 class="card-text">Price: $ ${product.price}</h5>
          <div class="card-text mt-3">
            <p class = "mb-1">Total ratings: ${product?.rating?.count}</p>
            <p>Average rating: ${product?.rating?.rate} </p>
          </div>
        </div>
        <div class="card-footer">
          <small class="text-muted">
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-addtocart">add to cart</button>
            <button id="details-btn" class="btn btn-details">Details</button></div>
          </small>
        </div>
      </div>
   
    
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
