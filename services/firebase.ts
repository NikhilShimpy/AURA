import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

/* 
  FIREBASE SECURITY RULES (AURA)
  
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      // User Profiles: Users read own; Admins read/write all
      match /users/{userId} {
        allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
        allow write: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      }
      
      // Notifications: Users read own
      match /users/{userId}/notifications/{notificationId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // Journals: Private to user
      match /journals/{docId} {
        allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      }
      
      // Campfires: Public read/write for auth users
      match /campfires/{circleId}/messages/{msgId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
      }
      
      // Checkins: Private to user
      match /dailyCheckins/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      }
    }
  }
*/

const firebaseConfig = {
  apiKey: "AIzaSyA5LPPM4X7-ZLOv1FXjIAFfXncf4Zn0M8w",
  authDomain: "afterclass-d6281.firebaseapp.com",
  projectId: "afterclass-d6281",
  storageBucket: "afterclass-d6281.firebasestorage.app",
  messagingSenderId: "569902765926",
  appId: "1:569902765926:web:e0fe3cabd1a042500f5aa7"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = getFirestore(app); 
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    return await auth.signInWithPopup(googleProvider);
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = () => auth.signOut();

export const COLLECTIONS = {
  USERS: 'users',
  JOURNALS: 'journals',
  CHECKINS: 'dailyCheckins',
  CAMPFIRES: 'campfires',
  MESSAGES: 'messages',
  METRICS: 'adminMetrics'
};

// --- NOTIFICATION UTILS ---

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return false;
  
  if (Notification.permission === 'granted') return true;
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendNotification = async (
  userId: string, 
  title: string, 
  message: string, 
  type: 'alert' | 'message' | 'success' | 'info' = 'info',
  link?: string
) => {
  try {
    // 1. Add to Firestore for In-App persistence
    await addDoc(collection(db, `users/${userId}/notifications`), {
      userId,
      title,
      message,
      type,
      read: false,
      timestamp: serverTimestamp(),
      link: link || null
    });

    // 2. Trigger Browser Notification (OS Level) if permissible
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: '/favicon.ico', // Fallback icon
      });
    }

  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};