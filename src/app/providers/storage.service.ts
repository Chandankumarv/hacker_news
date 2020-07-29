import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string) {
    let item = localStorage.getItem(key);
    return item ? JSON.parse(item) : item;
  }

  set(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }
}
