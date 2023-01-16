/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/



const btns = document.querySelectorAll('.tab__button');
console.log(btns)
const tabsSection = document.querySelector('.solutions__section--tabs');

const tabs = document.querySelectorAll('.content');

tabsSection.addEventListener('click',function(e){
    const id = e.target.dataset.id;
    if(id){
        // remove  active from other buttons
        btns.forEach(function(btn){
            btn.classList.remove("active"); 
            e.target.classList.add('active')
        });
        // hide all the  articles which dont match id
        tabs.forEach(function(tab){
            tab.classList.remove('active');
        })
        const element = document.getElementById(id);
        element.classList.add('active');

    }
    // console.log(e.target.dataset.id);
})



// smooth scroll

const scrollLinks = document.querySelectorAll(".scroll-link");
// console.log(scrollLinks);
scrollLinks.forEach((link)=>{
 link.addEventListener('click', (e)=>{
    e.preventDefault();
    //navigate to specific spot

    const selectedLink = e.currentTarget.getAttribute("href").slice(1);
    // console.log(selectedLink);
    const element = document.getElementById(selectedLink);
    // console.log(element);
    const navbar = document.querySelector('.nav')
    const navHeight = navbar.getBoundingClientRect().height;
    // console.log(navHeight)
    const position = element.offsetTop - navHeight;

    window.scrollTo({
        left:0,
        top:position
    })

    

 })
})


// product fetching

const url = 'https://course-api.com/javascript-store-products';

const productsDOM = document.querySelector('.products__container');

const fetchProducts = async() =>{
    productsDOM.innerHTML = `<center> <span>Loading...</span></center>`
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);    
        return data;
    } catch (error) {
        productsDOM.innerHTML = `There was an error`;
    }
}

const displayProducts = (list) =>{
    const productList = list.map((product)=>{
        const {id} = product;
        const {name:title,price} = product.fields;
        const {url:img} = product.fields.image[0];
        const formatPrice = price/100;
        return `
        <a href='product.html?id=${id}'>
        <div class="products__container--single__product">
        <h4 class="single__product--name">
            ${title}
        </h4>
        <img src="${img}" alt="">
        
        <span class="single__product--price">
           <small>

               $ ${formatPrice}
           </small>
        </span>
    </div>
    </a>
    
    `
    }).join('');
    productsDOM.innerHTML = `${productList}`
    console.log(list)
}

const start = async()=>{
    const data = await fetchProducts();
    displayProducts(data);
}

start();

fetchProducts();