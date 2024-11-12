import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZziH8_jEztiuWTzJJnioLxdPRPGtJhAM",
    authDomain: "web-175a0.firebaseapp.com",
    databaseURL: "https://web-175a0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-175a0",
    storageBucket: "web-175a0.firebasestorage.app",
    messagingSenderId: "1027545840213",
    appId: "1:1027545840213:web:e36e5652690342df5df2dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// References for the logout button and loading indicator
const logoutBtn = document.getElementById("logoutBtn");
const loadingElement = document.getElementById("loading");

// Function to check if the user is authenticated
function checkAuth() {
    // Check authentication status on page load
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            // If no user is authenticated, redirect to the login page (index.html)
            window.location.href = "index.html";
        } else {
            // If the user is authenticated, proceed to show the page content
            loadingElement.style.display = "none"; // Hide loading indicator
            document.body.style.visibility = "visible"; // Show content
            logoutBtn.style.display = "block"; // Show logout button
        }
    });
}

// Pages that require authentication
const protectedPages = ['skopje.html', 'kocani.html', 'stip.html', 'profile-create.html'];

// Check if the current page is protected
const currentPage = window.location.pathname;
if (protectedPages.some(page => currentPage.includes(page))) {
    checkAuth(); // Only proceed to show page if authenticated
}

// Logout functionality
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        // Redirect to login page after successful logout
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});

// Optional: Log out when the browser tab is closed
window.addEventListener("beforeunload", () => {
    signOut(auth).catch((error) => {
        console.error("Error signing out on tab close: ", error);
    });
});

// Function to display loading and hide content until authentication is confirmed
function showLoadingScreen() {
    document.body.style.visibility = "hidden"; // Hide the content initially
    loadingElement.style.display = "block"; // Show loading screen
}

// Initial loading screen display
showLoadingScreen();
