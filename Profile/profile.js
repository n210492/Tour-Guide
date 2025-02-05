// Enable Profile Editing
function editProfile() {
    document.querySelectorAll("#profile-form input").forEach(input => {
        input.removeAttribute("disabled");
    });
}

// Save Profile Changes
function saveProfile() {
    const name = document.getElementById("full-name").value;
    document.getElementById("profile-name").innerText = name;
    document.getElementById("greeting-name").innerText = name;
    document.getElementById("display-name").innerText = name;

    // Disable inputs after saving
    document.querySelectorAll("#profile-form input").forEach(input => {
        input.setAttribute("disabled", "true");
    });

    alert("Profile updated successfully!");
}

// Cancel Editing
function cancelEdit() {
    location.reload();  // Reset fields
}

// Avatar Upload & Preview (Fixed: No header image change)
document.getElementById("avatar-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profile-pic").src = e.target.result; // Update only profile picture
        };
        reader.readAsDataURL(file);
    }
});
