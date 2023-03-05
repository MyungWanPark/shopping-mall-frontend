import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { CartProductType, ProductType } from '../types/product';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export function login() {
    signInWithPopup(auth, provider).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
    });
}

export function logout() {
    signOut(auth).catch((error) => {
        // An error happened.
    });
}

export function onUserStateChanged(callback: (user: User & { isAdmin: boolean }) => void) {
    onAuthStateChanged(auth, async (user) => {
        const considerAdmin = user ? await checkAdmin(user!) : null;
        callback(considerAdmin!);
    });
}

async function checkAdmin(user: User): Promise<User & { isAdmin: boolean }> {
    return get(ref(getDatabase(), 'admins')).then((snapshot) => {
        if (snapshot.exists()) {
            const admins = snapshot.val();
            const isAdmin = admins.includes(user?.uid);
            return { ...user, isAdmin };
        }
        return { ...user, isAdmin: false };
    });
}

export async function addNewProduct(product: ProductType, imgURL: string): Promise<void> {
    const id = uuid();
    return set(ref(database, `products/${id}`), {
        ...product,
        id,
        imgURL,
        price: product.price!,
    });
}

export async function getProductsFromDB(path?: string) {
    return get(ref(database, 'products')) //
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
            return [];
        });
}

export async function getCartFromDB(userId: string): Promise<CartProductType[] | unknown[]> {
    return get(ref(database, `carts/${userId}`)) //
        .then((snapshot) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
            return [];
        });
}

export async function changeItemFromCart(userId: string, product: CartProductType) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeItemFromCart(userId: string, productId: string) {
    return remove(ref(database, `carts/${userId}/${productId}`));
}
