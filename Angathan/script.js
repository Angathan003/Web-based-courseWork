// let colectionbutton = document.querySelectorAll(".btn button");
// let parentdiv = document.querySelector(".btn");
// let selectvalue;
// parentdiv.addEventListener("mouseover", function (event) {
//   if (event.target.className == "click") {
  
//     event.target.style.backgroundColor = "orange";
  
//   }
// });
// parentdiv.addEventListener("click", function (e) {
//   if (e.target.className == "click") {
//     selectvalue = e.target.innerHTML;
   


//      }
  
// });


      
// parentdiv.addEventListener("mouseout", function (e) {
//   if (e.target.className == "click") {
//     e.target.style.backgroundColor = "gray";
//     setTimeout(function () {
//       e.target.style.backgroundColor = "#082032";
//     },500)
   
//   }
// });
// let sub1 = document.querySelector("input");
// sub1.onclick = function () {
//   document.querySelector(".appear").style.display = "none";
//   document.querySelector(".hide").classList.remove("hide");
// let scorediv = document.querySelector(".score");

// scorediv.innerText = `You selected ${selectvalue} out of 5`;
// }

// // initialize swiper js

// const swiper = new Swiper('.swiper', {
//   loop: true,

//    // If we need pagination
// pagination: {
//   el: '.swiper-pagination',
// },

//   // Navigation arrows
//   navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//   },


// })

// const menuToggle = document.querySelector('.menu-toggle');
// const navLinks = document.querySelector('.nav-links');

// menuToggle.addEventListener('click', () => {
//     // Toggle the class to show/hide the menu links
//     navLinks.classList.toggle('active');
// });

// // JavaScript (script.js)

// // Function to search products based on user input
// function searchProducts() {
//   const searchTerm = document.getElementById('searchInput').value.toLowerCase();
//   // Fetch data from XML file and display search results
// }

// // Function to validate email address
// function validateEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// // Event listener for subscription form submission
// document.getElementById('subscribeForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const email = document.getElementById('emailInput').value;
//   if (validateEmail(email)) {
//       // Send email for subscription
//       alert('Thank you for subscribing!');
//       document.getElementById('emailInput').value = ''; // Clear input field after successful submission
//   } else {
//       alert('Please enter a valid email address!');
//   }
// });

// function fetchProductData() {
//   fetch('product.xml')
//       .then(response => response.text())
//       .then(data => {
//           const parser = new DOMParser();
//           const xml = parser.parseFromString(data, 'application/xml');
//           const products = xml.querySelectorAll('product');
//           products.forEach(product => {
//               const name = product.querySelector('name').textContent;
//               const price = product.querySelector('price').textContent;
//               const description = product.querySelector('description').textContent;
//               console.log(name, price, description);
//               // Here you can use this data to display products or perform any other operation
//           });
//       })
//       .catch(error => console.error('Error fetching product data:', error));
// }

// // Function to submit a review
// function submitReview(event ) {
//   event.preventDefault();
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const rating = document.getElementById('rating').value;
//   const comment = document.getElementById('comment').value;
//   // Here you can perform further validation if needed
//   // Once validated, you can send the review data to a server or display it on the page
// }

// // Function to fetch recommended products from server or local storage
// function fetchRecommendedProducts() {
//   // Here you can fetch recommended products from a server or local storage
//   // Once fetched, you can display them on the page
// }

// // Call functions to fetch product data and recommended products when the page loads
// fetchProductData();
// fetchRecommendedProducts();

// Function to fetch product data and print sorted product names
function fetchAndPrintProducts() {
    fetch('product.xml')
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
            printSortedProductNames(xmlDoc);
            populateDropdown(xmlDoc);
        })
        .catch(error => console.error('Error fetching XML:', error));
}

// Function to print sorted product names
function printSortedProductNames(xmlDoc) {
    const products = xmlDoc.getElementsByTagName('product');
    const productsArray = Array.from(products);

    productsArray.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('rating').textContent);
        const ratingB = parseFloat(b.querySelector('rating').textContent);
        return ratingB - ratingA; // Sort in descending order
    });

    const recommendedProductsList = document.getElementById('recommendedProducts');

    // Clear any existing content in the recommendedProductsList
    recommendedProductsList.innerHTML = '';

    productsArray.forEach(product => {
        const name = product.querySelector('name').textContent;
        const listItem = document.createElement('li');
        listItem.textContent = name;
        recommendedProductsList.appendChild(listItem);
    });
}

// Function to populate dropdown menu with product names
function populateDropdown(xmlDoc) {
    const products = xmlDoc.getElementsByTagName('product');
    const productDropdown = document.getElementById('productDropdown');

    Array.from(products).forEach(product => {
        const name = product.querySelector('name').textContent;
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        productDropdown.appendChild(option);
    });
}

// Function to display comments based on selected product
function displayComments() {
    const selectedProduct = document.getElementById('productDropdown').value;
    if (!selectedProduct) return;

    fetch('product.xml')
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
            const products = xmlDoc.getElementsByTagName('product');

            Array.from(products).forEach(product => {
                const name = product.querySelector('name').textContent;
                const review = product.querySelector('review');
                const user = review.querySelector('user').textContent;
                const rating = parseFloat(review.querySelector('rating').textContent);
                const comment = review.querySelector('comment').textContent;

                if (name === selectedProduct) {
                    console.log(`Product: ${name}`);
                    console.log(`Rating: ${rating}`);
                    console.log(`Review by ${user}: ${comment}`);
                    console.log('----------------------------------');
                }
            });
        })
        .catch(error => console.error('Error fetching XML:', error));
}

// Event listener for rating functionality
document.addEventListener("DOMContentLoaded", function () {
    let colectionbutton = document.querySelectorAll(".btn button");
    let parentdiv = document.querySelector(".btn");
    let selectvalue;

    parentdiv.addEventListener("mouseover", function (event) {
        if (event.target.className == "click") {
            event.target.style.backgroundColor = "orange";
        }
    });

    parentdiv.addEventListener("click", function (e) {
        if (e.target.className == "click") {
            selectvalue = e.target.innerHTML;
        }
    });

    parentdiv.addEventListener("mouseout", function (e) {
        if (e.target.className == "click") {
            e.target.style.backgroundColor = "gray";
            setTimeout(function () {
                e.target.style.backgroundColor = "#082032";
            }, 500)
        }
    });

    let sub1 = document.querySelector("input");
    sub1.onclick = function () {
        document.querySelector(".appear").style.display = "none";
        document.querySelector(".hide").classList.remove("hide");
        let scorediv = document.querySelector(".score");
        scorediv.innerText = `You selected ${selectvalue} out of 5`;
    }
});


// Toggle menu links
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fetch and print products
fetchAndPrintProducts();
