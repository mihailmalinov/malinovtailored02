// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZziH8_jEztiuWTzJJnioLxdPRPGtJhAM",
    authDomain: "web-175a0.firebaseapp.com",
    databaseURL: "https://web-175a0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-175a0",
    storageBucket: "web-175a0.firebasestorage.app",
    messagingSenderId: "1027545840213",
    appId: "1:1027545840213:web:e36e5652690342df5df2dc"
  };

// Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
