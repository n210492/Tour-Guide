document.addEventListener("DOMContentLoaded", function() {
    const profileImg = document.getElementById("profile-img");
    const coverImg = document.getElementById("cover-img");
    const profileUpload = document.getElementById("profile-upload");
    const coverUpload = document.getElementById("cover-upload");
    const form = document.getElementById("account-form");
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");

    // Load stored data
    if (localStorage.getItem("profile-img")) {
        profileImg.src = localStorage.getItem("profile-img");
    }
    if (localStorage.getItem("cover-img")) {
        coverImg.src = localStorage.getItem("cover-img");
    }
    if (localStorage.getItem("name")) {
        nameInput.value = localStorage.getItem("name");
    }
    if (localStorage.getItem("phone")) {
        phoneInput.value = localStorage.getItem("phone");
    }

    // Handle profile image change
    profileUpload.addEventListener("change", function() {
        const file = profileUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
                localStorage.setItem("profile-img", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle cover image change
    coverUpload.addEventListener("change", function() {
        const file = coverUpload.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                coverImg.src = e.target.result;
                localStorage.setItem("cover-img", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("phone").addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10); // Enforce max 10 digits
        }
    });
    
    document.getElementById("phone").addEventListener("blur", function() {
        const phone = this.value;
        const errorMsg = document.getElementById("error-msg");
    
        if (!/^(63|7|8|9)\d{9}$/.test(phone)) {
            errorMsg.textContent = "Invalid phone number!";
        } else {
            errorMsg.textContent = "";
        }
    });

    // Enable edit mode
    editBtn.addEventListener("click", function() {
        nameInput.removeAttribute("readonly");
        phoneInput.removeAttribute("readonly");
        saveBtn.removeAttribute("disabled");
    });

    // Save changes
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("phone", phoneInput.value);
        nameInput.setAttribute("readonly", true);
        phoneInput.setAttribute("readonly", true);
        saveBtn.setAttribute("disabled", true);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const coverPhoto = document.getElementById("cover-photo");

    // Load saved image if available
    const savedImage = localStorage.getItem("coverImage");
    if (savedImage) {
        coverPhoto.style.backgroundImage = `url('${savedImage}')`;
    }

    // Event listener for image upload
    document.getElementById("cover-upload").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem("coverImage", e.target.result); // Save to localStorage
                coverPhoto.style.backgroundImage = `url('${e.target.result}')`;
            };
            reader.readAsDataURL(file);
        }
    });
});
