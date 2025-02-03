(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  console.log(preloader ? 'Preloader found!' : 'Preloader NOT found!'); // Debug
  
  if (preloader) {
    window.addEventListener('load', () => {
      console.log('Page loaded. Applying animations...');
      setTimeout(() => {
        preloader.classList.add('loaded');
        console.log('Preloader class added');
      }, 1000);
  
      setTimeout(() => {
        preloader.remove();
        console.log('Preloader removed');
      }, 2000);
    });
  }
  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


const mapIframe = document.getElementById('map-iframe');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const closeBtn = document.getElementById('close-fullscreen-btn');

// Function to toggle fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (mapIframe.requestFullscreen) {
      mapIframe.requestFullscreen();
    } else if (mapIframe.mozRequestFullScreen) { // Firefox
      mapIframe.mozRequestFullScreen();
    } else if (mapIframe.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      mapIframe.webkitRequestFullscreen();
    } else if (mapIframe.msRequestFullscreen) { // IE/Edge
      mapIframe.msRequestFullscreen();
    }
    // Show the close button
    closeBtn.style.display = 'block';
    console.log('Entered fullscreen. Close button should be visible.');
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    // Hide the close button
    closeBtn.style.display = 'none';
    console.log('Exited fullscreen. Close button should be hidden.');
  }
}

// Add event listener to the fullscreen button
fullscreenBtn.addEventListener('click', toggleFullscreen);

// Add event listener to the close button
closeBtn.addEventListener('click', toggleFullscreen);

// Handle exiting fullscreen using the Esc key or browser's exit button
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    closeBtn.style.display = 'none'; // Hide the close button when exiting fullscreen
    console.log('Exited fullscreen via Esc/keyboard. Close button hidden.');
  }
});

// JavaScript to handle image fullscreen with a close button

document.addEventListener("DOMContentLoaded", function () {
  // Select all category images
  const images = document.querySelectorAll(".menu-item a");
  
  images.forEach(img => {
      img.addEventListener("click", function (event) {
          event.preventDefault();
          openFullscreen(this.href);
      });
  });

  function openFullscreen(imgSrc) {
      // Create overlay
      let overlay = document.createElement("div");
      overlay.id = "fullscreen-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.background = "rgba(0, 0, 0, 0.9)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "1000";

      // Create image element
      let img = document.createElement("img");
      img.src = imgSrc;
      img.classList.add("fullscreen-img");
      img.style.maxWidth = "90%";
      img.style.maxHeight = "90%";

      // Create close button
      let closeButton = document.createElement("button");
      closeButton.innerHTML = "&times;";
      closeButton.id = "close-btn";
      closeButton.style.position = "absolute";
      closeButton.style.top = "20px";
      closeButton.style.right = "20px";
      closeButton.style.fontSize = "30px";
      closeButton.style.background = "red";
      closeButton.style.color = "white";
      closeButton.style.border = "none";
      closeButton.style.padding = "10px 15px";
      closeButton.style.cursor = "pointer";
      closeButton.style.zIndex = "1001";
      
      // Append elements to overlay
      overlay.appendChild(img);
      overlay.appendChild(closeButton);
      document.body.appendChild(overlay);

      // Close event
      closeButton.addEventListener("click", closeFullscreen);
      overlay.addEventListener("click", function(event) {
          if (event.target === overlay) closeFullscreen();
      });
  }

  function closeFullscreen() {
      let overlay = document.getElementById("fullscreen-overlay");
      if (overlay) overlay.remove();
  }
});