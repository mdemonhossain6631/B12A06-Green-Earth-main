//  category-section
const loadCategories = () => {
    
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategory(json.categories));
};

const removeActive = () =>{
    const allClass = document.querySelectorAll(".active")
    allClass.forEach((Class) =>Class.classList.remove("active"))
}


const displayCategory = (allCategories) => {
    
// console.log(allCategories)

    const categoryContainer = document.getElementById("category-container");
    // categoryContainer.innerHTML = "";

    for(let category of allCategories){

        // console.log(category)

     const categoryDiv = document.createElement("ul");
    categoryDiv.innerHTML = ` <ul">
          <li  onclick="loadTree(${category.id})" class="active:bg-green-500  cursor-pointer items-center rounded-xl w-[95%] h-[40px] mb-1 py-2 px-3 ">${category.category_name}</li>
    </ul>`
    removeActive()

    categoryContainer.append(categoryDiv);
    };
};
 loadCategories ();


// category wise plant

const loadTree = (id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((json) => displayTree(json.plants))
}



const displayTree = (allPlants) => {
    

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = " ";

    for(const plants of allPlants){

     const plantDiv = document.createElement("div");
        plantDiv.innerHTML = ` 
                <div class="bg-white rounded-lg shadow-lg ">
                <img class="w-full h-60 rounded-t-xl " src="${plants.image}" alt="">
                <div class=" p-4 ">
                <button onclick="loadPlantDetails(${plants.id}).showModal()" class="text-2xl  text-green-600 font-semibold">${plants.name}</button>
                <p class="text-[14px] text-justify items-center line-clamp-2 mb-2">${plants.description}</p>
                <div class="flex justify-between">
                    <h3 class="bg-blue-200 text-green-800 rounded-full p-1 ">${plants.category}</h3>
                    <p class="font-semibold lg:text-xl ">৳${plants.price}</p>
                </div>
                <div class=" pl-4">
                <button class=" bg-green-600 text-white  font-semibold rounded-full w-[95%] h-[43px]  py-3 px-3 mt-4">Add to Cart</button>
                </div>
                </div>
            </div> `

    cardContainer.append(plantDiv);
    };

}
loadTree();



//  card-section

 const loadPlant = () => {
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => plantDisplay(json.plants));
};
const plantDisplay = (allPlant) => {
    // console.log(allPlant)

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for(let plants of allPlant){

        // console.log(plants)

     const plantDiv = document.createElement("div");
        plantDiv.innerHTML = ` 
                <div onclick="loadPlant(${plants})" class="plant-card bg-white rounded-lg shadow-lg ">
                <img class="w-full h-60 rounded-t-xl " src="${plants.image}" alt="">
                <div class=" p-4 ">
                <button onclick="loadPlantDetails(${plants.id}).showModal()" class="text-2xl text-green-600 font-semibold">${plants.name}</button>
                <p class="text-[14px] text-justify items-center line-clamp-2 mb-2">${plants.description}</p>
                <div class="flex justify-between">
                    <h3 class="bg-blue-200 text-green-800 rounded-full p-1 ">${plants.category}</h3>
                    <p class="price font-semibold lg:text-xl ">৳${plants.price}</p>
                </div>
                <div class=" pl-4">
                <button class=" add-to-cart bg-green-600 text-white  font-semibold rounded-full w-[95%] h-[43px]  py-3 px-3 mt-4">Add to Cart</button>
                </div>
                </div>
            </div> `

    cardContainer.append(plantDiv);
    };

};

loadPlant();


// modal-plants details

const loadPlantDetails = async (id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url)
    const details = await res.json();
    displayPlantDetails(details.plants);
};

const displayPlantDetails = (plants) => {

    const detailsModal = document.getElementById("details-container");
    detailsModal.innerHTML = `
                <div>
                    <img class="w-full h-60 rounded-t-xl " src="${plants.image}" alt="">
                    <div class=" p-4 ">
                    <button onclick="loadPlantDetails(${plants.id}).showModal()" class="text-2xl  text-green-600 font-semibold">${plants.name}</button>
                    <p class="text-[14px] text-justify items-center mb-2">${plants.description}</p>
                    <div class="flex justify-between">
                        <h3 class="bg-blue-200 text-green-800 rounded-full p-1 ">${plants.category}</h3>
                        <p class="font-semibold lg:text-xl ">৳${plants.price}</p>
                    </div>
                    </div>
                </div>  
    
    `;

    document.getElementById("details_modal").showModal();

};


// Add to cart


// const cart = document.getElementById('cart');
// const totalPrice = document.getElementById('total-price');

// const addBtn = document.querySelectorAll(".add-to-cart")

// for (let btn of addBtn) {
//     btn.addEventListener("click", function () {

//         const PlantCard = btn.closest(".plant-card");
//         let plantName = PlantCard.querySelector(".plant-name").innerText;
//         let plantPrice = PlantCard.querySelector(".plant-price").innerText;

//         alert('Added to Cart' + plantName + ' >>> ' + plantPrice + ' ')

//         console.log(plantPrice)
        
//     //    const cartList = document.createElement("div");
       

//     //         cartList.innerHTML = `
//     //         <div>
//     //         <div class="flex justify-between">
//     //             <h3 class="tree-name text-xl font-semibold">${name}</h3>
//     //             <p id="tree-price"><span>৳</span>${price}</p>
//     //         </div>
            
//     //         </div>
//     //          `;

//     //         cart.appendChild(cartList);
//     }

// )};


function addToCart(id, name, price) {
  cart.push({ id, name, price });
  alert(`${name} added to cart.`);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cartList");
  const totalPrice = document.getElementById("total-Price");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-green-100 rounded p-2";
    div.innerHTML = `
      <div>
        <h3 class="text-[11px] sm:text-[13px] md:text-[14px] lg:text-[16px] font-medium text-gray-900">${item.name}</h3>
        <p class="text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] text-gray-600">৳${item.price}</p>
      </div>
      <button onclick="removeFromCart(${index})">
        <i class="fa fa-times cursor-pointer text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] text-red-600"></i>
      </button>
    `;
    cartList.appendChild(div);
  });

  totalPrice.textContent = "৳" + total;
}