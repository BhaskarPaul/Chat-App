import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfigDetails } from "./config";

export const auth = firebase.initializeApp(firebaseConfigDetails).auth();
