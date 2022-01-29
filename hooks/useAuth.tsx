import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
// import { useRouter } from "next/router";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/firestore";
import config from "configs/firebaseConfig";
import { UserInfo } from "@firebase/auth-types";

interface IAuthContext {
  user: UserInfo | null;
  signin: (email: string, password: string) => void;
  signinWithGoogle: () => void;
  signup: (email: string, password: string) => void;
  signout: () => void;
  authenticated: boolean;
}

if (!getApps().length) {
  initializeApp(config);
}

const auth = getAuth();

const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: "select_account" });

const authContext = createContext<IAuthContext>({
  user: null,
  signin: () => {},
  signinWithGoogle: () => {},
  signup: () => {},
  signout: () => {},
  authenticated: false,
});

export function ProvideAuth({ children }: { children: ReactNode }) {
  const authValues = useProvideAuth();
  return (
    <authContext.Provider value={authValues}>{children}</authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  // const { addToast } = useToasts();
  // const router = useRouter();

  const signin = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    setUser(user);
  };

  const signinWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, googleAuthProvider);
    setUser(user);
  };

  const signup = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(user);
  };

  const signout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // const createUserProfileDocument = async (userAuth, additionalData) => {
  //   if (!userAuth) return;

  //   const userRef = firebase.firestore().doc(`users/${userAuth.uid}`);
  //   const snapShot = await userRef.get();

  //   if (!snapShot.exists) {
  //     const { displayName, email, photoURL } = userAuth;
  //     const createdAt = new Date();
  //     const documents = { count: 0, list: [] };

  //     try {
  //       await userRef.set({
  //         displayName,
  //         email,
  //         photoURL,
  //         createdAt,
  //         documents,
  //         ...additionalData,
  //       });
  //     } catch (error) {
  //       console.error("Error creating user", error.message);

  //       addToast("Something went wrong. Please try again...", {
  //         appearance: "error",
  //       });
  //     }
  //   }

  //   return userRef;
  // };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // const userRef = await createUserProfileDocument(user);
        // userRef.onSnapshot((snapShot) => {
        //   setUser({
        //     id: snapShot.id,
        //     ...snapShot.data(),
        //   });
        // });
      } else {
        // setUser(null);
        // if (router.pathname === "/dashboard") {
        //   router.push("/");
        // }
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user: user,
    signin,
    signinWithGoogle,
    signup,
    signout,
    // createUserProfileDocument,
    authenticated: !!user,
  };
}
