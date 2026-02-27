const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

const app = initializeApp({
  apiKey: "AIzaSyCJ_2GHarIYlhYonz1aB33j_nKJ7vi2pM8",
  authDomain: "aust-robotics-club-app-1cfd8.firebaseapp.com",
  projectId: "aust-robotics-club-app-1cfd8",
  storageBucket: "aust-robotics-club-app-1cfd8.firebasestorage.app",
  messagingSenderId: "372646948771",
  appId: "1:372646948771:web:bfb6d873318c9ee27eb416",
  measurementId: "G-YWX0HWSG81"
});

const db = getFirestore(app);

async function test() {
  const docRef = doc(db, 'All_Data', 'Research_Projects', 'research_projects', 'AUSTElevate');
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
  process.exit(0);
}
test();
