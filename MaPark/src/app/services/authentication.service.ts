import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	authState: any = null;

	constructor(
		private afAuth :  AngularFireAuth
	) {
		// console.log('Hello AuthProvider Provider');
	}

    // Registro de usuario
	registerUser(email:string, password:string){
		return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
		.then((res)=>{
			console.log(res);
			console.log('El usuario se ha creado correctamente');
			// El usuario se ha creado correctamente.
		})
		.catch(err=>Promise.reject(err))
	}

	// ↓↓ Login User
	loginUser( email:string , password:string ){
		return this.afAuth.auth.signInWithEmailAndPassword(email , password)
		.then(
			user=>Promise.resolve(user)
		)
		.catch(
			err=>Promise.reject(err)
		)
	}

	// Devuelve la session
	// Returns true if user is logged in
	
	get authenticated(): boolean {
		return this.authState !== null;
	}
	
	// Cerrar session
	logout(){
		this.afAuth.auth.signOut()
		.then( close => {
			console.log(close);
		} )
	}

}


export const firebaseConfig = {
	apiKey: "AIzaSyAFVoJtcUIfzD3j981ONH3HDaDeFRYz3R4",
	authDomain: "mappark-f1940.firebaseapp.com",
	databaseURL: "https://mappark-f1940.firebaseio.com",
	projectId: "mappark-f1940",
	storageBucket: "mappark-f1940.appspot.com",
	messagingSenderId: "529655158454"
};