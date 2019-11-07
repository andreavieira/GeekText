/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function accountDrop() {
    document.getElementById("accDropdown").classList.toggle("show");
}
  
// Close the dropdown if the user cursor moves outside of it
window.onclick = function(event) {
    if (!event.target.matches('.account-btn')) {
        var dropdowns = document.getElementsByClassName("account-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Add a realtime listener to check if user is logged in or not
firebase.auth().onAuthStateChanged(function(user) {
    if (user){
        // A user is signed in

        // Show the logged in view and hide the not-logged in view
        document.getElementById("loggedin-div").style.display = "block";
        document.getElementById("not-loggedin-div").style.display = "none";

        var user = firebase.auth().currentUser;

        if(user != null) {
            var email_id = user.email;
            var email_verified = user.emailVerified;
            
            if(email_verified) {
                document.getElementById("welcome-user").innerHTML = "Welcome: " + email_id + "\n";
                document.getElementById("verify-btn").style.display = "none";
            } else {
                document.getElementById("welcome-user").innerHTML = "Welcome: " + email_id +
                                                                "\n" + "User NOT Verified"; 
                document.getElementById("verify-btn").style.display = "block";
            }
        }

    } else {
        //No user is logged in

        // Show the not-logged in view and hide the logged in view
        document.getElementById("loggedin-div").style.display = "none";
        document.getElementById("not-loggedin-div").style.display = "block";
    }
});

// Creating user in function
function createUser() {
    // TODO: Validate for REAL email

    // Obtains and initializes var with user email and pass
    var userEmail = document.getElementById("userEmailin").value;
    var userPass = document.getElementById("userPassword").value;

    // Sign into firebase with email and pass. Stores to a promise for error catching
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {

        // Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
    });    
}


// Signing user in function
function login() {
    // Obtains and initializes var with user email and pass
    var userEmail = document.getElementById("userEmailin").value;
    var userPass = document.getElementById("userPassword").value;

    // Sign into firebase with email and pass. Stores to a promise for error catching
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {

        // Handle errors here
        var errorCode = error.code;
        var errorMessage = error.message;
    });    
}

// Sign out function
function logout() {
    firebase.auth().signOut();
}

// Send user verification by email to ensure that the email account belongs to the user
function sendUserVerification() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        window.alert("Verification sent");   // Email sent.
    }).catch(function(error) {
        window.alert("Error: " + error.message);// An error happened.
    });
}