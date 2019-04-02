import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.page.html',
	styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

	user = {
		email: '',
		password: '',
	}

	constructor(
		public auth : AuthenticationService,
	) { }

	ngOnInit() {
	}

	createUser(){
		this.auth.registerUser(this.user.email , this.user.password)
		.then(
			(user) => {
			console.log(user);
		} )
		.catch( (err) =>{
			console.log(err);
		} )
	}
	
	login(){
		this.auth.loginUser(this.user.email , this.user.password)
		.then( user => {
			console.log('Login Exitoso');
			console.log(user);
		} )
		.catch( err => {
			console.log('Error en Login');
			console.log(err);
		} )
	}
	

}
