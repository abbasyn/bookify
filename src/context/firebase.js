import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const provider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCBkzkQlAbvnhujUbSL-_Gswe-E15Fe2P4",
  authDomain: "bookify-46a55.firebaseapp.com",
  projectId: "bookify-46a55",
  storageBucket: "bookify-46a55.appspot.com",
  messagingSenderId: "520967460553",
  appId: "1:520967460553:web:7143e7454ddf4f34685f18",
};

export const useFirebase = () => useContext(FirebaseContext);

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);
const storage = getStorage(app);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const loginUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const loginWithGoogle = () => {
    signInWithPopup(firebaseAuth, provider);
  };

  const createNewListing = async (bookname, bookprice, bookcode, bookimage) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${bookimage.name}`
    );

    console.log("abbas ", user);

    const uploadResult = await uploadBytes(imageRef, bookimage);

    return await addDoc(collection(firestore, "books"), {
      bookname,
      bookprice,
      bookcode,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      UserEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const isLoggedIn = user ? true : false;

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const BookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "order");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      UserEmail: user.email,
      displayName: user.displayName,
      qty: Number(qty),
    });
    return result;
  };

  const fetchMyOrders = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", user.uid));
    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "order");
    const result = await getDocs(collectionRef);
    return result;
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        loginWithGoogle,
        createNewListing,
        isLoggedIn,
        listAllBooks,
        BookById,
        fetchMyOrders,
        getImageURL,
        placeOrder,
        getOrders,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
