(function() {
	// Your web app's Firebase configuration
	var firebaseConfig = {
    	apiKey: "AIzaSyDbjxds4lv8aivC4Kh-ZwBZ-PV8Csz1sWw",
		authDomain: "bookstore-c3315.firebaseapp.com",
	    databaseURL: "https://bookstore-c3315.firebaseio.com",
	    projectId: "bookstore-c3315",
	    storageBucket: "bookstore-c3315.appspot.com",
	    messagingSenderId: "619357749595",
	    appId: "1:619357749595:web:9ede0658615350eaa39a7e"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);


	// Get Elements
	const txtEmail = document.getElementByID('txtEmail');
	const txtPass = document.getElementByID('txtPass');
	const btnLogin = document.getElementByID('btnLogin');
	const btnSignUp = document.getElementByID('btnSignUp');

	// Add login event
	btnLogin.addEventListener('click', e => {
		// Get email and pass
		const email = txtEmail.value;
		const pass = txtPass.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);

		promise.catch(e => console.log(e.message));
	});

	// Add signup event
	btnSignUp.addEventListener('click', e => {
		// Get email and pass
		// TODO: Check if the input is an email
		const email = txtEmail.value;
		const pass = txtPass.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.createUserWithEmailAndPassword(email, pass);

		promise.catch(e => console.log(e.message));
	});

	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			console.log(firebaseUser);
		} else {
			console.log('not logged in');
		}
	});
})