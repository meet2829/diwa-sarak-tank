
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchDescriptionInput=document.getElementById("update-pitch-description");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");


//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");
let filterHomeDecoration=document.getElementById("filter-Home-Decoration");
let filterFashion=document.getElementById("filter-Fashion");
let filterEquipments=document.getElementById("filter-Equipments");
let filterBeautyProduct=document.getElementById("filter-Beauty Product");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// fetch the data

let productdata=[]


function fetchdata()
{

fetch("http://localhost:3000/pitches")
.then((res)=>res.json())
.then((data)=>
    {
        cardlist(data)
        productdata=data
    })
.catch((err)=>console.log(err))
}

fetchdata()

function cardlist(data)
{
    const store=data.map((el)=>singlecard(el.id,el.image,el.title,el.price,el.founder,el.category,el.description))
    mainSection.innerHTML=store.join("")
}


function singlecard(id,image,title,price,founder,category,description)
 {
    let cart=`
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}
    &category=${encodeURIComponent(category)}&description=${encodeURIComponent(description)}">
    <div class="card" data-id=${id}>
    <div class="card-img">
        <img src=${image} alt="pitch">
    </div>
    <div class="card-body">
    <h4 class="card-title">${title}</h4>
    <p class="card-founder">Founder : ${ founder}</p>
    <p class="card-category">category:${category}</p>
    <p>${description}<p>
    <p class="card-price">price:${price}</p>
    <a href="#" class="card-link" data-id="${id}">Edit</a>
    <button class="card-button" data-id="${id}">Delete</button>
    </div>
    </div>
    </a>
    `
    return cart
 }
    
        // post the data

pitchCreateBtn.addEventListener("click",()=>{
    let product=
    {
        title:pitchTitleInput.value,
        image:pitchImageInput.value,
        category:pitchCategoryInput.value,
        founder:pitchfounderInput.value,
        price:pitchPriceInput.value

    }

    fetch("http://localhost:3000/pitches",{
        method:"POST",
        headers:
        {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => console.log('POST request successful:', data))
    .catch(error => console.error('Error:', error));
})



        // delete the data


        document.addEventListener("click",(e)=>
        {
            if(e.target.classList.contains("card-button"))
            {
                deleteproduct(e.target.dataset.id)
            }
        });

        function deleteproduct(id)
        {
            fetch(`http://localhost:3000/pitches/${id}`,
                {
                    method:"DELETE",
                })
                .then((res)=>console.log(res))
                .then((data)=>
                    {
                        alert("data delete succesfully!")
                        console.log(data)

                    })
                .catch((err)=>console.log(err))
        }

        //filter the data 

filterFood.addEventListener("click",()=>
{
    let filterdata=productdata.filter((el)=>el.category==="Food")
    console.log(filterdata)
    cardlist(filterdata)
})


filterPersonalCare.addEventListener("click",()=>
    {
        let filterdata=productdata.filter((el)=>el.category==="Personal Care")
        console.log(filterdata)
        cardlist(filterdata)
    })



filterElectronics.addEventListener("click",()=>
    {
        let filterdata=productdata.filter((el)=>el.category==="Electronics")
        console.log(filterdata)
        cardlist(filterdata)
    })

filterBeautyProduct.addEventListener("click",()=>
{
    let filterdata=productdata.filter((el)=>el.category==="Beauty Product")
    console.log(filterdata)
    cardlist(filterdata)
})

filterEquipments.addEventListener("click",()=>
{
    let filterdata=productdata.filter((el)=>el.category==="Equipments")
    cardlist(filterdata)
})

filterFashion.addEventListener("click",()=>
{
    let filterdata=productdata.filter((el)=>el.category==="Fashion")
    cardlist(filterdata)
})

filterHomeDecoration.addEventListener("click",()=>
{
    let filterdata=productdata.filter((el)=>el.category==="Home Decoration")
    cardlist(filterdata)
})

    // sorting the data 

 sortAtoZBtn.addEventListener("click",()=>{
    let sortAtoZ=productdata.sort((a,b)=>a.price-b.price)
    cardlist(sortAtoZ)
 })

 sortZtoABtn.addEventListener("click",()=>{
    let sortZtoA=productdata.sort((a,b)=>b.price-a.price)
    cardlist(sortZtoA)
 })




// update

document.addEventListener("click",(e)=>
{
    if(e.target.classList.contains("card-link"))
    {
        let id=e.target.dataset.id;
        filldata(id);
    }

})

function filldata(id)
{
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>
    {
        updatePitchTitleInput.value=data.title
        updatePitchImageInput.value=data.image
        updatePitchCategoryInput.value=data.category
        updatePitchDescriptionInput.value=data.description
        updatePitchfounderInput.value=data.founder
        updatePitchPriceInput.value=data.price
        updatePitchIdInput.value=data.id

    })
}


updatePitchBtn.addEventListener("click",()=>
{
    let updateproductdata=
    {
        title: updatePitchTitleInput.value,
        image: updatePitchImageInput.value,
        category: updatePitchCategoryInput.value,
        description:updatePitchDescriptionInput.value,
        founder:updatePitchfounderInput.value,
        price:updatePitchPriceInput.value,
        id:updatePitchIdInput.value

    }

    fetch(`http://localhost:3000/pitches/${updatePitchIdInput.value}`,
        {
            method:"PUT",
            headers:
            {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updateproductdata)
        })

    .then(response => response.json())
    .then(data => console.log('data update successful:', data))
    .catch(error => console.error('Error:', error));
})

//  search

document.getElementById("search-btn").addEventListener("click", function () {
    const query = document.getElementById("search-by-input").value.toLowerCase();
  
    const filteredData = productdata.filter(item =>
      item.title.toLowerCase().includes(query)
    );
  
    cardlist(filteredData);
  });


