
// ================= HERO SLIDESHOW =================

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index){
    slides.forEach(slide=>slide.classList.remove("active"));
    slides[index].classList.add("active");
}

setInterval(()=>{
    currentSlide++;
    if(currentSlide >= slides.length){
        currentSlide = 0;
    }
    showSlide(currentSlide);
},6000);


// ================= PRODUCT CAROUSEL =================

function initCarousel(selector, autoTime=7000){

    const carousel = document.querySelector(selector);
    const track = carousel.querySelector(".product-track");
    const cards = track.querySelectorAll(".product-card");

    const cardWidth = cards[0].offsetWidth + 20;

    let index = 0;
    let startX = 0;

    function updateCarousel(){
        const maxIndex = cards.length - 1;

        if(index < 0) index = 0;
        if(index > maxIndex) index = maxIndex;

        track.style.transform =
        `translateX(-${index * cardWidth}px)`;
    }

    // Auto Slide
    setInterval(()=>{
        index++;

        if(index > cards.length - 1){
            index = 0;
        }

        updateCarousel();
    },autoTime);

    // Mobile Swipe
    carousel.addEventListener("touchstart",(e)=>{
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend",(e)=>{
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if(Math.abs(diff) > 50){
            if(diff > 0){
                index++;
            }else{
                index--;
            }

            updateCarousel();
        }
    });

    // Desktop Drag
    carousel.addEventListener("mousedown",(e)=>{
        startX = e.clientX;
    });

    carousel.addEventListener("mouseup",(e)=>{
        const diff = startX - e.clientX;

        if(Math.abs(diff) > 50){
            if(diff > 0){
                index++;
            }else{
                index--;
            }

            updateCarousel();
        }
    });
}

initCarousel(".product-carousel",19000);
initCarousel(".second-carousel",19000);


// ================= STAR RATING =================

function rate(element,rating){

    const parent = element.parentElement;
    const stars = parent.querySelectorAll("span");

    stars.forEach((star,index)=>{
        if(index < rating){
            star.classList.add("active");
        }else{
            star.classList.remove("active");
        }
    });

    localStorage.setItem(
        parent.getAttribute("data-product"),
        rating
    );
}

window.onload = function(){

    document.querySelectorAll(".rating")
    .forEach(ratingDiv=>{

        const saved =
        localStorage.getItem(
            ratingDiv.getAttribute("data-product")
        );

        if(saved){

            const stars =
            ratingDiv.querySelectorAll("span");

            stars.forEach((star,index)=>{
                if(index < saved){
                    star.classList.add("active");
                }
            });
        }
    });
};


// ================= ORDER BUTTON =================

function orderNow(){

    const url =
    `https://wa.me/233548416564?text=${encodeURIComponent("Hello, I want to order your supplement.")}`;

    window.open(url,"_blank");
}

let selectedProduct="";

function showPopup(productName){
    selectedProduct = productName;
    document.getElementById("trustPopup").style.display="flex";
}

function closePopup(){
    document.getElementById("trustPopup").style.display="none";
}

document.getElementById("confirmBtn").onclick=function(){

    const url =
    `https://wa.me/233548416564?text=${encodeURIComponent("Hello, I want to order " + selectedProduct)}`;

    window.open(url,"_blank");
    closePopup();
};


// ================= NAVIGATION =================

document.querySelector("#home").addEventListener("click",()=>{
    document.querySelector("#hero")
    .scrollIntoView({behavior:"smooth"});
});

document.querySelector("#product").addEventListener("click",()=>{
    document.querySelector("#product_section")
    .scrollIntoView({behavior:"smooth"});
});
