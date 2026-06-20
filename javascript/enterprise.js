// HERO SLIDESHOW
let slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 3000);

// WHATSAPP ORDER BUTTON
function orderNow() {
  let phone = "233548416564";
  let message = "Hello, I want to order your supplement.";
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// PRODUCT CAROUSELS (multiple rows)
function initCarousel(carouselSelector, visibleCount = 3, interval = 3000) {
  const track = document.querySelector(`${carouselSelector} .product-track`);
  const productCards = track.querySelectorAll('.product-card');
  let index = 0;
  const cardWidth = productCards[0].offsetWidth + 20; // width + margin

  function moveCarousel() {
    index++;
    if (index > productCards.length - visibleCount) {
      index = 0;
    }
    const offset = -(index * cardWidth);
    track.style.transform = `translateX(${offset}px)`;
  }

  setInterval(moveCarousel, interval);
}

// Initialize both carousels
initCarousel('.product-carousel', 3, 3000);     // first row
initCarousel('.second-carousel', 3, 3500);      // second row

function rate(element, rating) {
  const parent = element.parentElement;
  const stars = parent.querySelectorAll("span");

  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });

  // Save rating (optional)
  const product = parent.getAttribute("data-product");
  localStorage.setItem(product, rating);
}

// If star rating gets stuck when testing,type localStorage.clear(); in the web broser console of that tab

window.onload = function () {
  document.querySelectorAll(".rating").forEach(ratingDiv => {
    const product = ratingDiv.getAttribute("data-product");
    const saved = localStorage.getItem(product);

    if (saved) {
      const stars = ratingDiv.querySelectorAll("span");
      stars.forEach((star, index) => {
        if (index < saved) {
          star.classList.add("active");
        }
      });
    }
  });
};

function orderProduct(productName) {
  const message = `Hello, I want to order ${productName}`;
  const url = `https://wa.me/233548416564?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}


 // Add event listener to the button in the hero section
 document.querySelector('#nav #home').addEventListener('click', () => {
  // Scroll to the about section
  document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
});

 // Add event listener to the button in the hero section
 document.querySelector('#nav #product').addEventListener('click', () => {
  // Scroll to the about section
  document.querySelector('#product_section').scrollIntoView({ behavior: 'smooth' });
});


let selectedProduct = "";

function showPopup(productName) {
  selectedProduct = productName;
  document.getElementById("trustPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("trustPopup").style.display = "none";
}

document.getElementById("confirmBtn").onclick = function () {
  const message = `Hello, I want to order ${selectedProduct}`;
  const url = `https://wa.me/233548416564?text=${encodeURIComponent(message)}`;
  
  window.open(url, "_blank");
  closePopup();
};