// Function to handle Google Sign-In
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // User successfully signed in
            console.log("Google Sign-In Success:", result.user);
            // Updated redirect path below
            window.location.replace("dashboard(1).html");
        })
        .catch((error) => {
            console.error("Google Sign-In Error:", error);
            alert("Google Sign-In failed: " + error.message);
        });
}

// Function to handle Microsoft Sign-In
function signInWithMicrosoft() {
    const provider = new firebase.auth.OAuthProvider('microsoft.com');
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // User successfully signed in
            console.log("Microsoft Sign-In Success:", result.user);
            // Updated redirect path below
            window.location.replace("dashboard(1).html");
        })
        .catch((error) => {
            console.error("Microsoft Sign-In Error:", error);
            alert("Microsoft Sign-In failed: " + error.message);
        });
}

// Auth State Listener to handle session redirects
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirecting to dashboard
        setTimeout(() => {
            window.location.replace("dashboard(1).html");
        }, 300);
    }
});
