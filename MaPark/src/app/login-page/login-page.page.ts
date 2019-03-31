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

	signin(){
		this.auth.registerUser(this.user.email , this.user.password).then( (user) => {
			console.log(user);
		} )
		.catch( (err) =>{
			console.log(err);
		} )
	}
	

}
