import * as admin from "firebase-admin";
import firebaseConfig from "../config/firebase";

class FirebaseAdmin {
  constructor() {
    this.init();
  }

  init() {
    admin.initializeApp(firebaseConfig);
  }
}

export default new FirebaseAdmin();
