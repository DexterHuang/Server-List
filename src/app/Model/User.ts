import * as firebase from 'firebase';
export class User {
    private static currentUser: User = undefined;
    private static currentUserUid: string = undefined;
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean
    photoURL: string;
    providerId: string;
    public static init() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setCurrentUserUid(firebase.auth().currentUser.uid);
            } else {
                this.currentUser = undefined;
            }
        })
    }
    public static getCurrentUser() {
        return this.currentUser;
    }
    public static setCurrentUserUid(uid: string) {
        this.currentUserUid = uid;
        firebase.database().ref('users/' + uid).once('value', e => {
            this.currentUser = new User();
            Object.assign(this.currentUser, e.val());
        })
    }
    public static isLogedIn(): boolean {
        if (firebase.auth().currentUser) {
            return true;
        } else {
            return false;
        }
    }
}
