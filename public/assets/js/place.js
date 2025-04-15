const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
const sliderContainer = document.querySelector('.slider-container');

let currentIndex = 0; // Tracks the current slide index
let autoSlideInterval; // Will hold the interval ID for auto-sliding

// Function to update the active dot indicator
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Function to display a specific slide based on the index
function showSlides(index) {
    if (index >= slides.length) {
        currentIndex = 0; // Reset to first slide if at the end
    } else if (index < 0) {
        currentIndex = slides.length - 1; // Go to last slide if at the beginning
    } else {
        currentIndex = index; // Otherwise, set to the provided index
    }
    slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Slide transition
    updateDots(); // Update the dots to reflect the current slide
}

// Function to move to the next slide
function nextSlide() {
    showSlides(currentIndex + 1);
}

// Function to move to the previous slide
function prevSlide() {
    showSlides(currentIndex - 1);
}

// Start the automatic sliding of images
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000); // Slide every 4 seconds
}

// Stop the automatic sliding
function stopAutoSlide() {
    clearInterval(autoSlideInterval); // Clear the interval
}

// Add click event listeners to dots for direct slide navigation
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide when manually selecting a slide
        showSlides(parseInt(dot.dataset.index)); // Show the selected slide
        startAutoSlide(); // Restart auto-slide
    });
});

// Add event listeners for navigation buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Stop auto-slide when the mouse enters the slider container
sliderContainer.addEventListener('mouseover', stopAutoSlide);

// Restart auto-slide when the mouse leaves the slider container
sliderContainer.addEventListener('mouseout', startAutoSlide);

// Start auto-slide when the page loads
startAutoSlide();
updateDots(); 

document.addEventListener("DOMContentLoaded", function () {
  let dateInput = document.querySelector("#datePicker");

  if (!dateInput) {
      console.error("Flatpickr: #datePicker element not found!");
      return;
  }

  console.log("Initializing Flatpickr on:", dateInput); // Debugging

  flatpickr(dateInput, {
      mode: "range",
      dateFormat: "M j, Y",
      minDate: "today",
      showMonths: window.innerWidth < 650 ? 1 : 2,
      disable: [date => date < new Date()]
  });

  // Also update on resize
  window.addEventListener("resize", function () {
      flatpickr(dateInput, {
          mode: "range",
          dateFormat: "M j, Y",
          minDate: "today",
          showMonths: window.innerWidth < 650 ? 1 : 2,
          disable: [date => date < new Date()]
      });
  });
});

document.getElementById("participantBtn").addEventListener("click", function() {
  let menu = document.getElementById("participantMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

function changeCount(type, change) {
  let countSpan = document.getElementById(type + "Count");
  let count = parseInt(countSpan.textContent) + change;
  if((type==="adult")&(count<=1))
      {count = 1;}
  if (count < 0) count = 0;
  if (count >= 50) count = 50;
  countSpan.textContent = count;
  updateParticipantText();
}

function updateParticipantText() {
  let adults = document.getElementById("adultCount").textContent;
  let infants = document.getElementById("infantCount").textContent;
  let childs = document.getElementById("childCount").textContent; 

  let text = `Adult x ${adults}, Infant x ${infants}, Child x ${childs}`;
  document.getElementById("participantBtn").textContent = text;
}

const locations = {
    "Taj Mahal, Delhi": {
        images: ["imgs/taj1.jpg", "imgs/taj2.jpg", "imgs/taj3.jpg"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.400553850174!2d78.03995351505036!3d27.175144783015277"
    },
    "Red Fort,  Delhi": {
        images: ["imgs/redfort1.jpg", "imgs/redfort2.jpg"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.4559025447083!2d77.2409!3d28.6562"
    },
    // Add more locations here...
};

// Function to update the location
function updateLocation(locationName) {
    if (locations[locationName]) {
        document.querySelector(".head h2").innerText = locationName;

        // Update Images in Slider
        const slider = document.querySelector(".slider");
        slider.innerHTML = ""; // Clear existing images

        locations[locationName].images.forEach((imgSrc) => {
            let slide = document.createElement("div");
            slide.classList.add("slide");
            slide.innerHTML = `<a href="${imgSrc}" class="glightbox"><img src="${imgSrc}" alt=""></a>`;
            slider.appendChild(slide);
        });

        // Update Map - This part ensures the correct map URL is loaded
        document.getElementById("map-iframe").src = locations[locationName].mapUrl;
    }
}

// Auto-update the location when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateLocation("Taj Mahal, Delhi"); // Default location
});

// Add event listeners to location links
document.querySelectorAll(".location-link").forEach((link) => {
    link.addEventListener("click", (e) => {
        let selectedLocation = e.target.innerText;
        updateLocation(selectedLocation);
    });
});


// Status Box Dynamic

function openStatusBox(data) {
    document.getElementById("statusTitle").innerText = data.title;
    document.getElementById("statusDescription").innerText = data.description;
    document.getElementById("statusTime").innerText = data.time;
    document.getElementById("statusDuration").innerText = data.duration;
    document.getElementById("statusLocation").innerText = data.location;
    document.getElementById("statusSeats").innerText = data.seats;
    document.getElementById("statusPrice").innerText = "₹" + data.price;

    let inclusionsList = document.getElementById("statusInclusions");
    inclusionsList.innerHTML = ""; // Clear previous inclusions
    data.inclusions.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        inclusionsList.appendChild(li);
    });

    document.getElementById("statusBox").style.display = "block";
    document.getElementById("statusOverlay").style.display = "block";
}

function closeStatusBox() {
    document.getElementById("statusBox").style.display = "none";
    document.getElementById("statusOverlay").style.display = "none";
}

document.getElementById("statusOverlay").addEventListener("click", closeStatusBox);

document.querySelector(".check-btn").addEventListener("click", function () {
    // Replace with backend API call
    let fakeData = {
        title: "Albufeira: Catamaran Cruise with BBQ & Open Bar",
        description: "Enjoy a luxury cruise with live BBQ and open bar service.",
        time: "10:00 AM",
        duration: "4 hours",
        location: "Albufeira Marina",
        seats: "12 available",
        inclusions: ["BBQ Lunch", "Drinks (Open Bar)", "Live Music", "Swimming Stop"],
        price: "10,880"
    };
    openStatusBox(fakeData);
});

function bookNow() {
    alert("Booking confirmed! (Backend integration needed)");
}

function addToCart() {
    alert("Added to cart! (Backend integration needed)");
}