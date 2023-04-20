import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false
  isLogged = new EventEmitter<boolean>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
    ) { }

  async signin(email: string, senha: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, senha).then( 
      res => {
        this.isLoggedIn = true;
        this.isLogged.emit(true)
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/home']);
        console.log(res);
      }
      )
  }

  async signup(email: string, senha: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, senha).then( 
      res => {
      }
      )
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user')
    this.isLogged.emit(false)
    this.router.navigate(['/login']);
  }



  getAll(user: string) {
    return this.db.list(user).valueChanges();
   }


   insert(userID: string, objeto: any){
    this.db.list(userID).push(objeto)
    .then((result: any) => {
      this.router.navigate(['/home']);
      console.log(result.key);
    })
    .catch((error: any) => {
      console.log(error);
      
    })
  }

}
