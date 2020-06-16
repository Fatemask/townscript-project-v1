import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  categories = null;
  subscription;
  id;
  createEventRef;
  error: boolean;
  uId;
  data;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.id = this.db.createId();
        this.uId = user.uid;
      }
    });
  }

  createEvent(data: any) {
    const eventDetails = data.eventDetails;
    delete data.eventDetails;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.createEventRef = this.db.collection('events');
        const createDetailsRef = this.db.collection('details');

        this.createEventRef.doc(this.id).set({
          ...data,
          uid: user.uid,
          is_verified: false,
          is_sponserd: false,
          poster: 'temp',
          banner: 'temp'
        });
        createDetailsRef.add({ ...eventDetails, eid: this.id });
      } else {
        console.log('you are not logged!');
      }
    });
  }

  async uploadFile(event, name: string) {
    const file = event.target.files[0];
    const filePath = `event-images/${this.id}/${name}`;
    const fileref = this.storage.ref(filePath);
    await this.storage.upload(filePath, file);
    if (name == 'poster') {
      await fileref.getDownloadURL().subscribe(u => {
        this.db
          .collection('events')
          .doc(this.id)
          .update({
            poster: u
          });
      });
    }
    if (name == 'banner') {
      await fileref.getDownloadURL().subscribe(u => {
        this.db
          .collection('events')
          .doc(this.id)
          .update({
            banner: u
          });
      });
    }
  }

  /**
   * Get Categories
   */
  getEventCategories() {
    if (!this.categories) {
      this.subscription = this.db
        .collection('categories')
        .valueChanges({ idField: 'id' })
        .subscribe(categories => (this.categories = categories));
    }
  }

  /**
   * Get Events Created By user
   */
  getUserCreatedEvents() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection('events', ref => ref.where('uid', '==', user.uid))
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Get Events Created By user
   */
  getAllEvents() {
    return this.db
      .collection('events', ref => ref.where('is_verified', '==', true))
      .valueChanges({ idField: 'id' });
  }

  /**
   * Get Categoriy Vise Events
   */
  getCategoryViseEvents(category: string) {
    return this.db
      .collection('events', ref => ref.where('eventCategory', '==', category))
      .valueChanges({ idField: 'id' });
  }

  /**
   * Get Event Detais
   */
  getEventById(id: string) {
    return this.db
      .collection('events')
      .doc(id)
      .valueChanges();
  }
  /**
   * Get Event Detais
   */
  getEventDetails(id: string) {
    return this.db
      .collection('details', ref => ref.where('eid', '==', id))
      .valueChanges({ idField: 'id' });
  }

  userData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uId = user.uid;
        this.db
          .collection('users')
          .doc(this.uId)
          .valueChanges()
          .subscribe(u => (this.data = u));
      }
    });
    return this.data;
  }

  /** Join login user to events */
  joinEvent(eid: string) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        // console.log(`${uid} ${eid}`);
        this.db
          .collection('attendees')
          .doc(eid)
          .set({
            joinedUsers: firebase.firestore.FieldValue.arrayUnion({
              uid,
              isPaid: false,
              joinDate: new Date().toLocaleDateString()
            })
          });
      }
    });
  }
  async applyCreator() {
    this.db
      .collection('users')
      .doc(this.uId)
      .update({
        isCreator: true,
        creatorVerified: false
      })
      .then(
        () => console.log('oid added to user col'),
        e => console.log('Error in user', e)
      );
  }
}
