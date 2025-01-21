import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  /**
   * Sets the token in the local storage.
   *
   * @param {string} token - The token to be stored.
   */
  /*set token(token: string) {
    // Set the token in the local storage.
    localStorage.setItem('token', token);
  }*/

  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getItem(): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem("token") : null;
  }

  setItem(token: string): void {
    if (this.isLocalStorageAvailable()) {
      console.log("setting token")
      localStorage.setItem("token",token);
      console.log(token)
    }
  }

  removeItem(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem("token");
    }
  }

// <<<<<<<<<<<<<<  >>>>>>>>>>>>>>>>
  /**
+   * Gets the token from the local storage.
+   *
+   * @returns {string} The token stored in the local storage.
+   */
  //  get token(): string {
  //  // Retrieve the token from the local storage.
  //    return localStorage.getItem('token') as string;
  //  }
// <<<<<<<  b4ab98de-99a2-42d1-919a-afa60bd5c6b2  >>>>>>>
}
