import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC2DE6KdBy95FkqVpk26JFthAazE27eJ1c',
  authDomain: 'e-commers-97d51.firebaseapp.com',
  projectId: 'e-commers-97d51',
  storageBucket: 'e-commers-97d51.appspot.com',
  messagingSenderId: '764853163128',
  appId: '1:764853163128:web:f09c2e9f09486d363ec98d',
  measurementId: 'G-FQ84261ZHN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/** 
  استخدم هذا النطاقات من أجل تحديد الوصول للمستخدمين يمكنك قراءة المزيد في Docs 
  */
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const auth = getAuth(); // هنا سأقوم بتصدير مفتاح المصادقة ختى أستطيع استخدماه في مشرعي
const provider = new GoogleAuthProvider();
auth.languageCode = 'it';

export const GooglesignInWithPopup = () => signInWithPopup(auth, provider);

export const GoogleSignInWithRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();
export const addCollectionAndDcuments = async (
  collecationKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collecationKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log(`done`);
};
export const getCollectionAndDcuments = async () => {
  const collectionRef = collection(db, `categories`);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const getDataFromAuht = async (userAuth, additionalInfo) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShat = getDoc(userDocRef);

  if (!(await userSnapShat).exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        displayName,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log(`can't creat new user ${error.massage}`);
    }
  }
  return userDocRef;
};

export const getDataFromAuhtRedirect = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
};

export const signUpUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
