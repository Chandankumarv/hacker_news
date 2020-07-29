import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

  get(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      let item = localStorage.getItem(key);
      return item ? JSON.parse(item) : item;
    }
    return null;
  }

  set(key: string, item: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(item));
    }
  }
}
