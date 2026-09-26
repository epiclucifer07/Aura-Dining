// ==========================================
// AURA DINING - FIREBASE SIGN IN
// ==========================================

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    onAuthStateChanged
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
// GOOGLE PROVIDER
// ==========================================

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});


// ==========================================
// MICROSOFT PROVIDER
// ==========================================

const microsoftProvider = new OAuthProvider("microsoft.com");


// ==========================================
// BUTTONS
// ==========================================

const googleButton = document.getElementById("google-btn");
const microsoftButton = document.getElementById("microsoft-btn");


// ==========================================
// SHOW ERROR MESSAGE
// ==========================================

function showError(message) {
    alert(message);
}


// ==========================================
// BUTTON LOADING STATE
// ==========================================

function setButtonLoading(button, loading, originalText) {

    if (!button) return;

    button.disabled = loading;

    if (loading) {
        button.dataset.originalText = originalText || button.textContent;
        button.textContent = "Signing in...";
    } else {
        button.textContent =
            button.dataset.originalText || originalText || button.textContent;

        delete button.dataset.originalText;
    }
}


// ==========================================
// FIREBASE ERROR HANDLER
// ==========================================

function getErrorMessage(error) {

    switch (error.code) {

        case "auth/popup-closed-by-user":
            return "The sign-in window was closed. Please try again.";

        case "auth/popup-blocked":
            return "Your browser blocked the sign-in popup. Please allow popups for this website.";

        case "auth/cancelled-popup-request":
            return "Another sign-in window is already open.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/unauthorized-domain":
            return "This website is not authorized in Firebase. Add your website domain to Firebase Authorized Domains.";

        case "auth/operation-not-allowed":
            return "This sign-in method is not enabled in Firebase.";

        case "auth/account-exists-with-different-credential":
            return "An account already exists with this email using another sign-in method.";

        case "auth/user-disabled":
            return "This account has been disabled.";

        default:
            return error.message || "Sign-in failed. Please try again.";
    }
}


// ==========================================
// GOOGLE SIGN IN
// ==========================================

async function signInWithGoogle() {

    if (!googleButton) return;

    setButtonLoading(
        googleButton,
        true,
        "Continue with Google"
    );

    try {

        const result = await signInWithPopup(
            auth,
            googleProvider
        );

        const user = result.user;

        console.log("Google login successful:", user);

        // Save basic user information
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

        // Go to dashboard
        window.location.replace("dashboard.html");

    } catch (error) {

        console.error("Google Sign-In Error:", error);

        showError(getErrorMessage(error));

        setButtonLoading(
            googleButton,
            false,
            "Continue with Google"
        );
    }
}


// ==========================================
// MICROSOFT SIGN IN
// ==========================================

async function signInWithMicrosoft() {

    if (!microsoftButton) return;

    setButtonLoading(
        microsoftButton,
        true,
        "Continue with Microsoft"
    );

    try {

        const result = await signInWithPopup(
            auth,
            microsoftProvider
        );

        const user = result.user;

        console.log("Microsoft login successful:", user);

        // Save basic user information
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

        // Go to dashboard
        window.location.replace("dashboard.html");

    } catch (error) {

        console.error(
            "Microsoft Sign-In Error:",
            error
        );

        showError(getErrorMessage(error));

        setButtonLoading(
            microsoftButton,
            false,
            "Continue with Microsoft"
        );
    }
}


// ==========================================
// BUTTON EVENTS
// ==========================================

if (googleButton) {

    googleButton.addEventListener(
        "click",
        signInWithGoogle
    );

}


if (microsoftButton) {

    microsoftButton.addEventListener(
        "click",
        signInWithMicrosoft
    );

}


// ==========================================
// CHECK EXISTING LOGIN
// ==========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "User already signed in:",
            user.email
        );

        // If already logged in, go directly
        // to the dashboard.

        // Small delay prevents redirect problems
        // while the page is loading.

        setTimeout(() => {
            window.location.replace("dashboard.html");
        }, 300);

    }

});