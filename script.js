
//  category-section
const loadCategories = () => {

    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategory(json.categories));
};


const displayCategory = (allCategories) => {

    const categoryContainer = document.getElementById("category-container");

    for (let category of allCategories) {


        const categoryDiv = document.createElement("ul");
        categoryDiv.innerHTML = ` <ul>
          <li  onclick="loadTree(${category.id})" class=" cursor-pointer items-center rounded-xl w-[full] h-[40px] mb-1 py-2 mx-auto ">${category.category_name}</li>
        </ul>`

        categoryContainer.append(categoryDiv);
    };
};
loadCategories();



// category wise plant

const loadTree = (id) => {

    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayTree(json.plants))
}

const displayTree = (allPlants) => {


    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = " ";

    for (const plants of allPlants) {

        const plantDiv = document.createElement("div");
        plantDiv.innerHTML = ` 
                <div class="card bg-white rounded-lg shadow-lg ">
                <img class="w-full h-60 rounded-t-xl object-cover " src="${plants.image}" alt="">
                <div class=" p-4 ">
                <button onclick="loadPlantDetails(${plants.id}).showModal()" class="name text-[16px] sm:text-xl lg:text-2xl  text-green-600 font-semibold">${plants.name}</button>
                <p class="text-[10px] sm:text-[12px] lg:text-[14px] text-justify items-center line-clamp-2 mb-2">${plants.description}</p>
                <div class="flex justify-between">
                    <h3 class="bg-blue-200 text-green-800 text-[10px] sm:text-[14px] lg:text-[16px] rounded-full p-1 ">${plants.category}</h3>
                    <p class="price font-semibold text-[10px] sm:text-[16px] lg:text-xl ">৳${plants.price}</p>
                </div>
                <div class=" pl-4">
                <button class=" add-btn bg-green-600 text-white cursor-pointer font-semibold rounded-full w-[95%] h-[43px]  py-3 px-3 mt-4">Add to Cart</button>
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

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for (let plants of allPlant) {

        const plantDiv = document.createElement("div");
        plantDiv.innerHTML = ` 
                <div class="card bg-white rounded-lg shadow-lg ">
                <img class="w-full h-60 rounded-t-xl object-cover " src="${plants.image}" alt="">
                <div class=" p-4 ">
                <button onclick="loadPlantDetails(${plants.id}).showModal()" class="name text-2xl text-green-600 font-semibold">${plants.name}</button>
                <p class="text-[14px] text-justify items-center line-clamp-2 mb-2">${plants.description}</p>
                <div class="flex justify-between">
                    <h3 class="bg-blue-200 text-green-800 rounded-full p-1 ">${plants.category}</h3>
                    <p class="price font-semibold lg:text-xl ">৳${plants.price}</p>
                </div>
                <div class=" pl-4">
                <button class=" add-btn cursor-pointer bg-green-600 text-white  font-semibold rounded-full w-[95%] h-[43px]  py-3 px-3 mt-4">Add to Cart</button>
                </div>
                </div>
            </div> `

        cardContainer.append(plantDiv);
    };

};
loadPlant();


// modal-plants details

const loadPlantDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url)
    const details = await res.json();
    displayPlantDetails(details.plants);
};

const displayPlantDetails = (plants) => {

    const detailsModal = document.getElementById("details-container");
    detailsModal.innerHTML = `
                <div>
                    <img class="w-full h-60 rounded-t-xl object-cover" src="${plants.image}" alt="">
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

document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById('cartList');
    const totalPrice = document.getElementById('total-price');
    let total = 0;


    document.addEventListener("click", cart => {
        if (cart.target.classList.contains("add-btn")) {
            const card = cart.target.closest(".card");
            const name = card.querySelector(".name").innerText;
            const price = parseInt(card.querySelector(".price").innerText.slice(1));

            alert('Added to Cart' + '>>>' + name + ' = ' + price + ' ')

            console.log(price)

            const li = document.createElement("li");

            li.innerHTML = `
            <li>
            <div class="flex bg-slate-200 rounded-lg p-2 justify-between mb-2">
                <h3 class="tree-name text-xl font-semibold">${name}</h3>
                <p class="price text-xl font-semibold">৳${price}<span class="remove cursor-pointer">❌</span></p>
                
            </div>
            </li>
             `;
            cartList.appendChild(li);

            total += price;
            totalPrice.innerText = total;

        }

        if (cart.target.classList.contains("remove")) {
            const li = cart.target.closest("li");
            const price = parseInt(li.querySelector(".price").innerText.slice(1));
            total -= price;
            totalPrice.innerText = total;
            li.remove();
        };

    });


    const categories = document.getElementById("category-container");
    categories.onclick = (activeBg) => {
        if (activeBg.target.tagName === "LI") {
            categories.querySelectorAll("li").forEach(li => li.classList.remove("bg-green-700","hover:bg-green-500", "text-white"));
            activeBg.target.classList.add("bg-green-700", "hover:bg-green-500", "text-white");
        }
    }

});