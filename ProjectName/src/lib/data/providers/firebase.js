// import auth from '@react-native-firebase/auth';
class Service {
  _store;

  constructor() {
    // this.auth = auth();
  }

  init(store) {
    this._store = store;
  }

  // async signInWithEmailAndPassword(email, password) {
  //   return this.auth.signInWithEmailAndPassword(email, password);
  // }
  //
  // async createUserWithEmailAndPassword(email, password) {
  //   return await this.auth.createUserWithEmailAndPassword(email, password);
  // }
  //
  // async signOut() {
  //   return await this.auth.signOut();
  // }
}

const instance = new Service();

export const FirebaseDataProvider = instance;
