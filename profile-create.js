import { ref, push, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { database } from './firebase-config.js';

const auth = getAuth();
let inactivityTimer; // Variable to store the inactivity timer

// Function to log out the user
function autoLogout() {
    signOut(auth).then(() => {
        window.location.href = "index.html"; // Redirect to login page
    }).catch((error) => {
        console.error("Error logging out: ", error);
    });
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(autoLogout, 300000); // 5 minutes timeout
}

// Add authentication check
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is authenticated, allow access to profile creation

        // Form submission logic
        document.getElementById('profile-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const email = document.getElementById('email').value;
            const town = document.getElementById('town').value; // New select input for town

            // Add new profile to Firebase with the additional fields
            const newProfileRef = push(ref(database, 'businesses/'));
            set(newProfileRef, {
                name: name,
                phone: phone,
                location: location,
                email: email,
                town: town  // Store the selected town
            });

            alert('Business added successfully!');
            document.getElementById('profile-form').reset(); // Clear the form
        });

        // Logout button functionality
        const logoutButton = document.getElementById("logout-button");
        logoutButton.addEventListener("click", () => {
            signOut(auth).then(() => {
                window.location.href = "index.html"; // Redirect to login page
            }).catch((error) => {
                console.error("Error logging out: ", error);
            });
        });

        // Home button functionality
        const homeButton = document.getElementById("home-button");
        homeButton.addEventListener("click", () => {
            window.location.href = "home.html"; // Redirect to the home page
        });

        // Reset the inactivity timer on user interaction (click, scroll, etc.)
        document.body.addEventListener("click", resetInactivityTimer);
        document.body.addEventListener("scroll", resetInactivityTimer);
        document.body.addEventListener("mousemove", resetInactivityTimer);
        document.body.addEventListener("keydown", resetInactivityTimer);

        // Start the inactivity timer when the user is authenticated
        resetInactivityTimer();

    } else {
        // User is not authenticated, redirect to login page
        window.location.href = "index.html";
    }
});
