// @flow
// import {FirebaseDataProvider} from '@lib/data/providers/firebase';

class Service {
  _store;

  constructor() {
    // this.provider = FirebaseDataProvider;
  }

  init(store) {
    this._store = store;
    // this.provider.init(store);
  }

  async login({
    email,
    password,
  }: LoginRequestModel): Promise<LoginResponseModel> {
    return {
      accessToken: 'test',
      refreshToken: '',
      expiresIn: new Date().getTime(),
    };
  }

  async register({
    email,
    password,
  }: RegisterRequestModel): Promise<RegisterResponseModel> {
    return {
      accessToken: 'test',
      refreshToken: '',
      expiresIn: new Date().getTime(),
    };
  }

  async logOut(): Promise<void> {}
}

const instance = new Service();

export const DataService = instance;
