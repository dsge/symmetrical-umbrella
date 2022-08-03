import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  protected storage = {} as any;

  constructor() {
    this.storage = localStorage || sessionStorage || {};
  }

  public set(key: string, value: any) {
    this.storage[key] = value;
  }

  public get(key: string) {
    return this.storage[key] ?? undefined;
  }

}
