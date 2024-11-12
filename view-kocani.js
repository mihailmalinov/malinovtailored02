import { ref, onValue, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
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

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Get the business list element and search bar
        const businessList = document.getElementById("business-list");
        const searchBar = document.getElementById("search-bar");

        // Clear the list first
        businessList.innerHTML = '';

        // Fetch data from Firebase for Kocani
        const businessesRef = ref(database, 'businesses/');
        const queryKocani = query(businessesRef, orderByChild('town'), equalTo('Kocani'));

        onValue(queryKocani, (snapshot) => {
            if (snapshot.exists()) {
                const businesses = snapshot.val();
                let index = 1; // Initialize counter for numbering
                for (let id in businesses) {
                    let business = businesses[id];
                    let li = document.createElement('li');
                    li.innerHTML = `<strong>${index}. ${business.name}</strong> <br>
                                    Phone: ${business.phone} <br>
                                    Location: ${business.location} <br>
                                    Email: ${business.email}`;
                    businessList.appendChild(li);
                    index++; // Increment the counter for each business
                }
            } else {
                businessList.innerHTML = '<p>No businesses found for Kocani</p>';
            }
        }, (error) => {
            console.error("Error fetching data: ", error);
            businessList.innerHTML = '<p>Failed to load businesses. Please try again later.</p>';
        });

        // Add search functionality
        searchBar.addEventListener('input', function() {
            const searchText = searchBar.value.toLowerCase();
            const businesses = document.querySelectorAll("#business-list li");
            businesses.forEach(business => {
                const businessName = business.querySelector('strong').textContent.toLowerCase();
                if (businessName.includes(searchText)) {
                    business.style.display = "list-item";
                } else {
                    business.style.display = "none";
                }
            });
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
