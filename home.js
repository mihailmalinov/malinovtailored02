import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
const database = getDatabase(app);

// Authentication state listener
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html"; // Redirect if not logged in
    } else {
        document.body.style.visibility = "visible";
        loadVideos(); // Load videos when authenticated
    }
});

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});

// Function to load videos
function loadVideos() {
    const videoList = document.getElementById("video-list");
    const videosRef = ref(database, "videos");

    onValue(videosRef, (snapshot) => {
        videoList.innerHTML = ""; // Clear current videos
        const videos = snapshot.val();

        if (videos) {
            Object.keys(videos).forEach((key) => {
                const { videoId, videoNumber } = videos[key];

                const videoItem = document.createElement("div");
                videoItem.className = "video-item";

                const label = document.createElement("p");
                label.textContent = `Video #${videoNumber}`;
                label.style.fontWeight = "bold";

                const iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;

                videoItem.appendChild(label);
                videoItem.appendChild(iframe);
                videoList.appendChild(videoItem);
            });
        } else {
            videoList.innerHTML = "<p>No videos available at the moment.</p>";
        }
    });
}
 
