const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const sideNav = document.querySelector(".sidenav");
const mainSlider = document.getElementById("main-slider");
const mainCarouselSlider = document.getElementById("main-carousel-slider");
const newArrivalCarousel = document.getElementById("new-arrival-carousel");
const requestQuoteBtn = document.querySelectorAll(".request-quote");
const modals = document.querySelectorAll(".modal");
const quoteModal = document.getElementById("quote-modal");
const modalCloseBtn = document.querySelectorAll(".modal-close");
const modalSendBtn = document.querySelectorAll(".modal-send");
const contactForm = document.getElementById("contact-form");
const sendContactInfo = document.querySelectorAll("#send-contact-info");


// Initialize Material Components

document.addEventListener("DOMContentLoaded", function () {
    var instances = M.Sidenav.init(sideNav);
    var slider1 = M.Slider.init(mainSlider, {
        fullWidth: true,
        autoplay: true,
        height: 720,
        indicators: false
    });

    var slider2 = M.Carousel.init(mainCarouselSlider, {
        fullWidth: true,
        autoplay: true,
        indicators: false
    });

    var carousel1 = M.Carousel.init(newArrivalCarousel, {
        indicators: true
    });
    var quoteModal = M.Modal.init(modals, {
        dismissible: true
    });
});

if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        var instance = M.Sidenav.getInstance(sideNav);
        instance.open();
    });
}

menuClose.addEventListener("click", function () {
    var instance = M.Sidenav.getInstance(sideNav);
    instance.close();
});

// Main Slider Autoplay

const autoplayMainSlider = () => {
    let slider = M.Carousel.getInstance(mainCarouselSlider);
    if (slider) slider.next();
    setTimeout(autoplayMainSlider, 7000);
};

if (mainCarouselSlider) setTimeout(autoplayMainSlider, 7000);

// Premium Products Autoplay

const autoplayProductSlider = () => {
    let slider = M.Carousel.getInstance(newArrivalCarousel);
    if (slider) slider.next();
    setTimeout(autoplayProductSlider, 5000);
};

if (newArrivalCarousel) autoplayProductSlider();

// Contact info

sendContactInfo.forEach(btn => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        const name = contactForm.childNodes[2].childNodes[0].childNodes[0].childNodes[0].value;
        const email = contactForm.childNodes[2].childNodes[1].childNodes[0].childNodes[0].value;
        const phone = contactForm.childNodes[2].childNodes[2].childNodes[0].childNodes[0].value;
        const message = contactForm.childNodes[2].childNodes[3].childNodes[0].childNodes[0].value;

        const dataString = 'name=' + name + '&email=' + email + '&contact=' + phone + '&message=' + message;

        const error = infoValidation(
            name,
            email,
            phone,
            message
        );

        if (error.length > 0) {
            let output = "<ul>";
            error.forEach(item => {
                output += `<li>${item}</li>`
            });
            output += "</ul>";
            contactForm.childNodes[1].innerHTML = output;
        } else {

            $.ajax({
                url: "send_contacts.php",
                type: "POST",
                data: dataString,
                success: function (data) {
                    M.toast({
                        html: 'Message Sent. Thank you !'
                    });
                },
                error: function (xhr, err) {
                    M.toast({
                        html: 'Message Failed. Try again !'
                    });
                }
            });

            contactForm.childNodes[1].innerHTML = "";
            contactForm.childNodes[2].reset();


        }

    });
});

// Request Quote Feature

requestQuoteBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        const item = this.getAttribute("data-item");
        quoteModal.childNodes[0].childNodes[0].innerHTML = "Request Quote: " + item;
        quoteModal.childNodes[0].childNodes[3].dataset.item = item;
    });
});

modalCloseBtn.forEach(btn => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
    });
});

modalSendBtn.forEach(btn => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        const form = document.getElementById("request-quote-form");
        const name = form.childNodes[0].childNodes[0].value;
        const email = form.childNodes[1].childNodes[0].value;
        const contact = form.childNodes[2].childNodes[0].value;
        const pincode = form.childNodes[3].childNodes[0].value;
        const location = form.childNodes[4].childNodes[0].value;
        const message = form.childNodes[5].childNodes[0].value;
        const info = {
            name,
            email,
            contact,
            pincode,
            location,
            message
        };

        const error = fieldValidation(
            name,
            email,
            contact,
            message,
            pincode,
            location
        );

        if (error.length > 0) {
            console.log(error);
            let output = "<ul>";
            error.forEach(item => {
                output += `<li>${item}</li>`
            });
            output += "</ul>";
            quoteModal.childNodes[0].childNodes[2].innerHTML = output;
        } else {
            const form = quoteModal.childNodes[0].childNodes[3];
            info.product = form.getAttribute("data-item");
            const dataString = 'name=' + info.name + '&email=' + info.email + '&contact=' + info.contact + '&pincode=' + info.pincode + '&location=' + info.location + '&product=' + info.product + '&message=' + info.message;
            $.ajax({
                url: "request_quote.php",
                type: "POST",
                data: dataString,
                success: function (data) {
                    M.toast({
                        html: 'Request Sent. Thank you !'
                    });
                },
                error: function (xhr, err) {
                    M.toast({
                        html: 'Request failed. Try again !'
                    });
                }
            });
            const modalInstance = M.Modal.getInstance(quoteModal);
            if (modalInstance) modalInstance.close();

            // form.reset();
            quoteModal.childNodes[0].childNodes[2].innerHTML = "";
        }
    });
});


function infoValidation(name, email, phone, message) {
    let error = [];

    if (name == "" ||
        email == "" ||
        phone == "" ||
        message == "") {
        error.push("Form Incomplete. Complete all the fields");
    }
    if (!validateEmail(email)) {
        error.push("Invalid Email Address. Please correct it");
    }
    if (!validatePhone(phone)) {
        error.push("Invalid Mobile Number. Do not prefix +91 or 0. Do not add space or characters.");
    }
    return error;
}


function fieldValidation(name, email, contact, message, pincode, location) {
    let error = [];

    if (!validateEmpty(name, email, contact, message, pincode, location)) {
        error.push("Form Incomplete. Complete all the fields");
    }
    if (!validateEmail(email)) {
        error.push("Invalid Email Address. Please correct it");
    }
    if (!validatePhone(contact)) {
        error.push("Invalid Mobile Number. Do not prefix +91 or 0. Do not add space or characters.");
    }
    if (!validatePincode(pincode)) {
        error.push("Invalid Pincode. Please correct it");
    }

    return error;
}

function validateEmpty(name, email, contact, message, pincode, location) {
    if (
        name == "" ||
        email == "" ||
        contact == "" ||
        message == "" ||
        pincode == "" ||
        location == ""
    ) {
        return false;
    } else {
        return true;
    }
}

function validateEmail(email) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(email)) {
        return true;
    } else {
        return false;
    }
} // End of validateEmail function.

function validatePhone(contact) {
    if (contact && contact.length == 10) {
        return true;
    } else {
        return false;
    }
}

function validatePincode(pincode) {
    if (pincode.length == 6) {
        return true;
    } else {
        return false;
    }
}

function validateLength(word) {
    if (word.length > 2) {
        return true;
    } else {
        return false;
    }
}

//Xzoom Library

$(".xzoom").xzoom({

    // top, left, right, bottom, inside, lens, fullscreen, #ID
    position: 'right', 
  
    // inside, fullscreen
    mposition: 'inside', 
  
    // In the HTML structure, this option gives an ability to output xzoom element, to the end of the document body or relative to the parent element of main source image.
    rootOutput: true,
  
    // x/y offset
    Xoffset: 0,
    Yoffset: 0,
  
    // Fade in effect, when zoom is opening.
    fadeIn: true,
  
    // Fade transition effect, when switching images by clicking on thumbnails.
    fadeTrans: true,
  
    // Fade out effect, when zoom is closing.
    fadeOut: false,
  
    // Enable smooth effects
    smooth: true,
  
    // Smooth move effect of the big zoomed image in the zoom output window. 
    // The higher value will make movement smoother.
    smoothZoomMove: 3,
  
    // Smooth move effect of lens.
    smoothLensMove: 1,
  
    // Smooth move effect of scale.
    smoothScale: 6,
  
    // From -1 to 1, that means -100% till 100% scale
    defaultScale: 0, 
  
    // Scale on mouse scroll.
    scroll: true,
  
    // Tint color. Color must be provided in format like "#color". 
    tint: false,
  
    // Tint opacity from 0 to 1.
    tintOpacity: 0.5,
  
    // Lens color. Color must be provided in format like "#color". 
    lens: false,
  
    // Lens opacity from 0 to 1.
    lensOpacity: 0.5,
  
    // 'box', 'circle'
    lensShape: 'box', 
  
    // Custom width of zoom window in pixels.
    zoomWidth: 'auto',
  
    // Custom height of zoom window in pixels.
    zoomHeight: 'auto',
  
    // Class name for source "div" container.
    sourceClass: 'xzoom-source',
  
    // Class name for loading "div" container that appear before zoom opens, when image is still loading.
    loadingClass: 'xzoom-loading',
  
    // Class name for lens "div".
    lensClass: 'xzoom-lens',
  
    // Class name for zoom window(div).
    zoomClass: 'xzoom-preview',
  
    // Class name that will be added to active thumbnail image.
    activeClass: 'xactive',
  
    // With this option you can make a selection action on thumbnail by hover mouse point on it.
    hover: false,
  
    // Adaptive functionality.
    adaptive: true,
  
    // When selected position "inside" and this option is set to true, the lens direction of moving will be reversed.
    lensReverse: false,
  
    // Same as lensReverse, but only available when adaptive is true.
    adaptiveReverse: false,
  
    // Lens will collide and not go out of main image borders. This option is always false for position "lens".
    lensCollision: true,
  
    //  Output title/caption of the image, in the zoom output window.
    title: false,
  
    // Class name for caption "div" container.
    titleClass: 'xzoom-caption',
  
    // Zoom image output as background
    bg: false 
    
  });

// Scroll to top

const scrolltopBtn = document.getElementById("scroll-top");

scrolltopBtn.addEventListener('click', function(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrolltopBtn.style.display = "block";
    } else {
        scrolltopBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}