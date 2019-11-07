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

        if(user != null){
            var email_id = user.email;
            var email_verified = user.emailVerified;
            document.getElementById("welcome-user").innerHTML = "Welcome: " + email_id +
                                                                "User Verification: " + email_verified; 
        }

    } else {
        //No user is logged in

        // Show the not-logged in view and hide the logged in view
        document.getElementById("loggedin-div").style.display = "none";
        document.getElementById("not-loggedin-div").style.display = "block";
    }
});

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


// Creating user in function
//NAT CAN U SEE THIS
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



// Sign out function
function logout() {
    firebase.auth().signOut();
}