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

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  /**
   * Create Event 
   */
  createEvent(data: any) {
    const eventDetails = data.eventDetails;
    delete data.eventDetails;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const id = this.db.createId();
        const createEventRef = this.db.collection('events');
        const createDetailsRef = this.db.collection('details');
        createEventRef.doc(id).set({...data, uid: user.uid, is_verified: false, is_sponserd: false});
        createDetailsRef.add({...eventDetails, eid: id});
  
      } else {
        console.log('you are not logged!');
      }
    })
  }


  /**
   * Get Categories
   */
  getEventCategories() {
    if(!this.categories) {
      this.subscription = this.db.collection('categories').valueChanges({idField: 'id'})
      .subscribe(categories => this.categories = categories);
    }
  }

  /**
   * Get Events Created By user
   */
  getUserCreatedEvents() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.db.collection('events', ref=> 
          ref.where('uid', '==', user.uid)).valueChanges({idField: 'id' });
        } else {
          return [];
        }
      })
    )
  }

  /**
   * Get Events Created By user
   */
  getAllEvents() {
    return this.db.collection('events').valueChanges({idField: 'id' });
  }

  /**
   * Get Categoriy Vise Events
   */
  getCategoryViseEvents(category: string) {
    return this.db.collection('events', ref => ref.where('eventCategory', '==', category)).valueChanges({idField: 'id'});
  }

  /**  
   * Get Event Detais
   */
  getEventById(id: string) {
    return this.db.collection('events').doc(id).valueChanges();
  }
  /**  
   * Get Event Detais
   */
  getEventDetails(id: string) {
    return this.db.collection('details', ref => 
      ref.where('eid', '==', id))
    .valueChanges({idField: 'id'});
  }

  /** Join login user to events */
  joinEvent(eid: string) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        const uid = user.uid;
        // console.log(`${uid} ${eid}`);
        this.db.collection('attendees').doc(eid)
        .set({
          joinedUsers: firebase.firestore.FieldValue.arrayUnion({ uid, isPaid: false, joinDate: new Date().toLocaleDateString() })
        })
      }
    })
  }
  
}
