import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';


interface Item {
  name: string
};

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(){}
}
