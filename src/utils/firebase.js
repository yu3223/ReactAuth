import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAQGnJBvZzpo-2y7x7BAchqxjEDgXeM4e4",
  authDomain: "reactauth-74526.firebaseapp.com",
  projectId: "reactauth-74526",
  storageBucket: "reactauth-74526.firebasestorage.app",
  messagingSenderId: "807556603438",
  appId: "1:807556603438:web:2374b6214d9847c477c9bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;