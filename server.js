 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: process.env.FIREBASE_KEY,
   authDomain: "boo-party.firebaseapp.com",
   projectId: "boo-party",
   storageBucket: "boo-party.appspot.com",
   messagingSenderId: "1084116078707",
   appId: "1:1084116078707:web:2db8711c9994eba6bf9a06"
 };

 firebase.initializeApp(firebaseConfig);

 const firestore = firebase.firestore();

 const guestData = {
   guest_name: "John Doe",
   status: "Going",
   party_size: "2",
   bringing: "Food",
   notes: "Excited to join the party!"
 };
 
 function add_guest(guest_object, successful_submission, failed_submission, loading) {
   $('#done_btn').attr('disabled', 'disabled');
   window.scrollTo(0, 0);
   loading();
   // Add the data to the "guests" collection
   firestore.collection("guests").add(guest_object)
   .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      successful_submission(guest_object.status);
   })
   .catch((error) => {
      console.error("Error adding document: ", error);
      failed_submission();
   });
}