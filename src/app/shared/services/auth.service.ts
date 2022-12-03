import { Injectable } from '@angular/core';


import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = '/users';

  

  Ref: AngularFirestoreCollection<any>;
  images: any = [];


  constructor(
    private db: AngularFirestore,
    ) {
    this.Ref = db.collection(this.dbPath);
  }

  
  getAll(): AngularFirestoreCollection<any> {
    return this.Ref;
  }

  create(data: any): any {
    //news.dateCreated = new Date();
    return this.Ref.add({ ...data });
 }

  getOne(data: any) {
    //return this.Ref.doc(id).ref.get();
   // return this.Ref;
    return this.db.collection('users', ref => ref.where('username', '==', data.username).where('password', '==', data.password));
  }
    
}
