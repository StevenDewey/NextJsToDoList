// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTBbPPZT9_Ozkj9zkQEA6orD6Q2AeWHhE",
  authDomain: "todo-dd660.firebaseapp.com",
  projectId: "todo-dd660",
  storageBucket: "todo-dd660.appspot.com",
  messagingSenderId: "316267929392",
  appId: "1:316267929392:web:514460dcd09d7f80bf72f5",
  measurementId: "G-NRF92YZ3P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, push, set, onValue, remove  } from "firebase/database";

export interface ToDoTask {
  item: string,
  isComplete: boolean,
  id: string,
}

export const addNewItem = (item: string): void => {
  const db = getDatabase();
  const postListRef = ref(db, 'todoitems');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    item: item,
    isComplete: false
  });
}

export const updateItem = (itemId: string, itemName: string, isComplete: boolean): void => {
  const db = getDatabase();
  const postListRef = ref(db, `todoitems/${itemId}`);
  set(postListRef, {
    item: itemName,
    isComplete: isComplete
  });
}

export function deleteItem(item: string): void {
  const db = getDatabase();
  const postListRef = ref(db, 'todoitems');
  let key: string;
  getItemKey(item).then((result) => {
    key = result;
    const postListRef = ref(db, `todoitems/${key}`);
    remove(postListRef);
  });
}

function getItemKey(item: string): Promise<any> {
  const db = getDatabase();
  const dbRef = ref(db, 'todoitems');

  let promise = new Promise((resolve, reject)=> {
    onValue(dbRef, async (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val().item;
        if(childData === item){
          resolve(childKey);
        }
      });

    }, {
      onlyOnce: true
    });
  });
  return promise;
}

export function getItems(): Promise<ToDoTask[]> {
 // return ['test', 'wet'];
  const db = getDatabase();
  const dbRef = ref(db, 'todoitems');
  const items:ToDoTask[] = [];
  let promise = new Promise<ToDoTask[]>((resolve, reject)=> {
    onValue(dbRef, async (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        childData['id'] = childKey;
        items.push(childData);
      });
      resolve(items);
    }, {
      onlyOnce: true
    });
  });
  return promise;
}
