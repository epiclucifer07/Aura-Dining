// ==========================================
// AURA DINING - REAL FIREBASE SIGN IN
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyDdpHP9KxF1YBcSkxDkb1VeRLcgT1cyGSs",
    authDomain: "aura-dining.firebaseapp.com",
    projectId: "aura-dining",
    storageBucket: "aura-dining.firebasestorage.app",
    messagingSenderId: "539074345247",
    appId: "1:539074345247:web:7455455f711652d595182a",
    measurementId: "G-WLWQW1B707"
};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ==========================================
// GOOGLE
// ==========================================

const googleProvider = new GoogleAuthProvider();

// ALWAYS show Google account chooser
googleProvider.setCustomParameters({
    prompt: "select_account"
});


// ==========================================
// MICROSOFT
// ==========================================

const microsoftProvider = new OAuthProvider("microsoft.com");


// ==========================================
// BUTTONS
// ==========================================

const googleButton = document.getElementById("google-btn");
const microsoftButton = document.getElementById("microsoft-btn");


// ==========================================
// ERROR MESSAGE
// ==========================================

function showError(error) {

    console.error("Firebase Error:", error);

    switch (error.code) {

        case "auth/popup-closed-by-user":
            alert("Sign-in cancelled.");
            break;

        case "auth/popup-blocked":
            alert("Your browser blocked the sign-in popup. Please allow popups for this website.");
            break;

        case "auth/unauthorized-domain":
            alert("This website is not authorized in Firebase. Add your website domain in Firebase Authorized Domains.");
            break;

        case "auth/operation-not-allowed":
            alert("This sign-in method is not enabled in Firebase.");
            break;

        case "auth/network-request-failed":
            alert("Internet connection problem. Please try again.");
            break;

        default:
            alert("Sign-in failed: " + error.message);
    }
}


// ==========================================
// GOOGLE LOGIN
// ==========================================

async function googleLogin() {

    if (!googleButton) {
        console.error("Google button not found.");
        return;
    }

    const oldText = googleButton.textContent;

    googleButton.disabled = true;
    googleButton.textContent = "Connecting...";

    try {

        console.log("Opening Google sign-in...");

        const result = await signInWithPopup(
            auth,
            googleProvider
        );

        const user = result.user;

        console.log("Google user:", user);

        // Store user information
        sessionStorage.setItem(
            "user_name",
            user.displayName || "User"
        );

        sessionStorage.setItem(
            "user_email",
            user.email || ""
        );

        sessionStorage.setItem(
            "user_provider",
            "Google"
        );

        // Login successful
        window.location.href = "dashboard.html";

    } catch (error) {

        showError(error);

        googleButton.disabled = false;
        googleButton.textContent = oldText;
    }
}


// ==========================================
// MICROSOFT LOGIN
// ==========================================

async function microsoftLogin() {

    if (!microsoftButton) {
        console.error("Microsoft button not found.");
        return;
    }

    const oldText = microsoftButton.textContent;

    microsoftButton.disabled = true;
    microsoftButton.textContent = "Connecting...";

    try {

        console.log("Opening Microsoft sign-in...");

        const result = await signInWithPopup(
            auth,
            microsoftProvider
        );

        const user = result.user;

        console.log("Microsoft user:", user);

        // Store user information
        sessionStorage.setItem(
            "user_name",
            user.displayName || "User"
        );

        sessionStorage.setItem(
            "user_email",
            user.email || ""
        );

        sessionStorage.setItem(
            "user_provider",
            "Microsoft"
        );

        // Login successful
        window.location.href = "dashboard.html";

    } catch (error) {

        showError(error);

        microsoftButton.disabled = false;
        microsoftButton.textContent = oldText;
    }
}


// ==========================================
// BUTTON CLICK EVENTS
// ==========================================

if (googleButton) {
    googleButton.addEventListener(
        "click",
        googleLogin
    );
}

if (microsoftButton) {
    microsoftButton.addEventListener(
        "click",
        microsoftLogin
    );
}


// ==========================================
// IMPORTANT
// ==========================================
//
// There is NO onAuthStateChanged redirect here.
//
// The user must actually click a sign-in button.
// ==========================================
