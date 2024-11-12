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

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    const logoutBtn = document.getElementById("logoutBtn");
    const loadingElement = document.getElementById("loading");

    if (!user) {
        // If user is not logged in, redirect to login page
        window.location.href = "index.html";
    } else {
        // User is logged in, show the content
        loadingElement.style.display = "none";
        document.body.style.visibility = "visible";
        logoutBtn.style.display = "block"; // Show logout button
    }
});

// Logout button functionality
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html"; // Redirect to login page after logout
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});
