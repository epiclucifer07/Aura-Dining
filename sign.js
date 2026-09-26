// ==========================================
// AURA DINING - GOOGLE STYLE SIGN IN
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithRedirect,
    getRedirectResult
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
// GOOGLE SIGN IN
// ==========================================

async function googleLogin() {

    if (!googleButton) return;

    googleButton.disabled = true;

    const originalText = googleButton.innerHTML;

    googleButton.innerHTML = "Connecting to Google...";

    try {

        await signInWithRedirect(
            auth,
            googleProvider
        );

    } catch (error) {

        console.error("Google Sign-In Error:", error);

        googleButton.disabled = false;
        googleButton.innerHTML = originalText;

        alert(
            "Google sign-in failed.\n\n" +
            error.message
        );
    }
}


// ==========================================
// MICROSOFT SIGN IN
// ==========================================

async function microsoftLogin() {

    if (!microsoftButton) return;

    microsoftButton.disabled = true;

    const originalText = microsoftButton.innerHTML;

    microsoftButton.innerHTML = "Connecting to Microsoft...";

    try {

        await signInWithRedirect(
            auth,
            microsoftProvider
        );

    } catch (error) {

        console.error("Microsoft Sign-In Error:", error);

        microsoftButton.disabled = false;
        microsoftButton.innerHTML = originalText;

        alert(
            "Microsoft sign-in failed.\n\n" +
            error.message
        );
    }
}


// ==========================================
// BUTTON EVENTS
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
// HANDLE RETURN FROM GOOGLE
// ==========================================

async function checkRedirectLogin() {

    try {

        const result = await getRedirectResult(auth);

        if (result && result.user) {

            const user = result.user;

            console.log(
                "Google login successful:",
                user
            );


            // Save actual user information

            sessionStorage.setItem(
                "user_name",
                user.displayName || "User"
            );

            sessionStorage.setItem(
                "user_email",
                user.email || ""
            );

            sessionStorage.setItem(
                "user_photo",
                user.photoURL || ""
            );

            sessionStorage.setItem(
                "user_provider",
                "Google"
            );


            // Go to dashboard

            window.location.replace(
                "dashboard(1).html"
            );
        }

    } catch (error) {

        console.error(
            "Redirect Sign-In Error:",
            error
        );

        alert(
            "Google sign-in failed.\n\n" +
            error.message
        );
    }
}


// ==========================================
// START REDIRECT CHECK
// ==========================================

checkRedirectLogin();
