import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import { Firebase } from '@/services/firebase/firebase.interface.js';
import { Service } from 'typedi';
import firebase from 'firebase-admin';

@Service()
export class FirebaseService {
  @Logger()
  private readonly logger: CustomLogger;
  private admin: firebase.app.App;

  constructor() {
    this.admin = firebase.initializeApp({
      credential: firebase.credential.applicationDefault(),
    });
  }

  async decodeToken(
    params: Firebase.DecodeToken.Params
  ): Promise<firebase.auth.UserRecord> {
    const { token } = params;
    const user = await this.admin.auth().verifyIdToken(token);
    return this.admin.auth().getUser(user.uid);
  }
}
