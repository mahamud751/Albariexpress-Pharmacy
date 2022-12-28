const body = document.body;
const mainNav = document.querySelector(".main-header");
const bar = document.querySelector(".fa-bars");
const sideBar = document.querySelector(".wrapper aside.main-sidebar");
const media992 = window.matchMedia("(max-width: 992px)");
const media768 = window.matchMedia("(max-width: 768px)");

// product details information
const description = document.querySelector(".pro-desc .desc-head h5");
const addition = document.querySelector(".pro-desc .desc-head span");
const descInfo = document.querySelector(".pro-desc .desc-info");
const addInfo = document.querySelector(".pro-desc .add-info");

// remove left margin from from main header by click
bar.addEventListener("click", function (e) {
  e.preventDefault;
  mainNav.style = "margin-left: 0!important";
});

// window load effect
window.addEventListener("load", (e) => {
  // e.preventDefault;
  mainNav.style = "margin-left: 0!important";
  // description.style = "border-bottom: 2px solid var(--blue2);"
});

// Scroll effect for side bar minimize and maximize
window.addEventListener("scroll", () => {
  // pharmacy logo nav
  var navMid = document.querySelector(".nav-mid");
  // category nav
  var cat2 = document.querySelector(".sidebar .nav .cat-2");
  var upload2 = document.querySelector(".sidebar .nav .upload-2");
  var health2 = document.querySelector(".sidebar .nav .health-2");

  if (window.scrollY > 0) {
    // pharmacy logo nav
    navMid.classList.add("sticky-nav");
    navMid.style = `top: 0; 
                        left: 0; 
                        right: 0;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        `;

    sideBar.style = `top: 78px !important`;
    // side categoy nav
    cat2.style = `display: block !important`;
    // upload precripton
    upload2.style = `display: block !important`;
    // health
    health2.style = `display: block !important`;
    // media query 992 changes side bar if scroll down
    if (media992.matches) {
      sideBar.style = `top: 0 !important;`;
    }
    if (media768.matches) {
    }
  } else {
    navMid.classList.remove("sticky-nav");
    sideBar.style = `top: 176px !important`;
    // side categoy nav
    cat2.style = `display: none`;
    // upload precripton
    upload2.style = `display: none`;
    // health
    health2.style = `display: none`;
    // media query 992 changes side bar if scroll up
    if (media992.matches) {
      sideBar.style = `top: 0 !important`;
    }
  }
});
// delivery btn changes
// const allBtn = document.querySelectorAll(
//   ".nav-mid .delivery .modal-body .btn-row .col-4 p"
// );

// allBtn.forEach((btn) => {
//   if (btn) {
//     btn.addEventListener(
//       "click",
//       (e) => {
//         btn.style = `background-color: var(--blue2);
//                         color: var(--white);
//                         border: 0`;
//       },
//       false
//     );
//   }
// });

// product details image changes
$(document).ready(function () {
  $(".wrapper .content-wrapper .card .detail-img .sm-img").click(function () {
    var smallImages = $(this).attr("src");
    console.log(smallImages);
    $(".wrapper .content-wrapper .card .detail-img .big-img").attr(
      "src",
      smallImages
    );
  });
});

// product details information
if (description) {
  description.addEventListener(
    "click",
    () => {
      description.style = `border-bottom: 2px solid #25aae1;
                        color: #25aae1;
                        transition: .2s ease-in`;
      addition.style = `border-bottom: none;
                    color: #000`;

      descInfo.style = `display: block !important`;
      addInfo.style = `display: none !important`;
    },
    false
  );
}

if (addition) {
  addition.addEventListener(
    "click",
    () => {
      description.style = `border-bottom: none;
                        color: #000`;
      addition.style = `border-bottom: 2px solid #25aae1;
                    color: #25aae1;
                    transition: .2s ease-in`;

      descInfo.style = `display: none !important`;
      addInfo.style = `display: block !important`;
    },
    false
  );
}

// place order section of cart
const userCartIcon = document.querySelector(".nav-mid .user-cart");
const closeCart = document.getElementById("closeCart");
const placeOrderDiv = document.querySelector(".place-order");

// hide/show cart section
userCartIcon.addEventListener("click", () => {
  placeOrderDiv.style = `transform: translateX(0)`;
  body.style = `overflow: hidden;`;
});
closeCart.addEventListener("click", () => {
  placeOrderDiv.style = `transform: translateX(460px)`;
  body.style = `overflow: visible`;
});

// cart-checkout
const cartCheckout = document.getElementById("cart-checkout");
const checkoutBtn = document.getElementById("checkout");
// cart place order
const cartPlaceOrder = document.getElementById("cart-place-order");
const cartPlaceBtn = document.getElementById("cart-place-order-btn");
// delivery address of customer
const customerDiv = document.getElementById("customer-div");
const customerBtn = document.getElementById("customer-btn");

checkoutBtn.addEventListener("click", () => {
  cartCheckout.style = `display: none`;
  cartPlaceOrder.style = `display: block !important`;
});
cartPlaceBtn.addEventListener("click", () => {
  cartPlaceOrder.style = `display: none !important`;
  customerDiv.style = `display: block !important`;
});

//
const cash = document.querySelector(".place-order .cash input");
const cardPay = document.querySelector(".place-order .pay input");

cash.addEventListener("click", () => {
  cardPay.checked = false;
});
cardPay.addEventListener("click", () => {
  cash.checked = false;
});

// counter range
// const counting = document.getElementById('counting');
// var counting = $('#counting')
// function increment() {
//     var x = counting.innerText;
//     x++;
//     counting.innerText = x;
// }
// function decrement() {
//     var x = counting.innerText;
//     if(x > 0)
//     x--;
//     counting.innerText = x;
// }
// increment();
// decrement();

// index.html page splide library code
$(function () {
  // carousel slider effect
  var splide = new Splide(".splide2", {
    type: "loop",
    perPage: 1,
    autoplay: true,
    interval: 2500,
    speed: 1000,
    heightRatio: 0.25,
  });
  splide.mount();

  // flash sale product auto slider effect
  var sp = new Splide(".splide3", {
    type: "loop",
    drag: "free",
    // focus  : 'center',
    gap: "1em",
    perPage: 6,
    arrows: false,
    pagination: false,
    breakpoints: {
      992: {
        width: "100%",
        perPage: 5,
      },
      768: {
        perPage: 4,
      },
    },
  });
  sp.mount(window.splide.Extensions);

  // just for you slider effect
  var sp4 = new Splide(".splide4", {
    type: "loop",
    drag: "free",
    // focus  : 'center',
    // arrows: false,
    gap: "1em",
    perPage: 6,
    pagination: false,
    breakpoints: {
      992: {
        width: "100%",
        perPage: 5,
      },
      768: {
        perPage: 4,
      },
    },
  });
  sp4.mount();
});

// Terms and policies

const faq = document.querySelectorAll(".faq");
const icon = document.querySelectorAll(".icon");

faq.forEach((para) => {
  para.addEventListener("click", () => {
    para.classList.toggle("active");
  });
});
