import { map, tap, subscribeOn } from 'rxjs/Operators';

import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-newpark',
  templateUrl: './newpark.page.html',
  styleUrls: ['./newpark.page.scss'],
})
export class NewparkPage implements OnInit {

   todo: FormGroup;
   _urlPost = `${environment.urlDominio}/api/geoparques/`;
   longitud: number;
   latitud: number;

  constructor( private formBuilder: FormBuilder,
               private http: HttpClient,
               private loadCtrl: LoadingController,
               private geolocation: Geolocation) {
    this.inicializar();

   }

  ngOnInit() {
  }

  inicializar(): void {
    this.todo = this.formBuilder.group({
      parqueId: new FormControl('', Validators.required),
      identificador_parque: new FormControl(''),
      estrato: new FormControl('', Validators.required),
      upz: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      estado_Certificacion: new FormControl('', Validators.required),
      clasificacion_Parque: new FormControl('', Validators.required),
      nombre_Parque: new FormControl('', Validators.required),
      administración_Parque: new FormControl(''),
      codigo_Localidad: new FormControl(''),
      codigo_POT: new FormControl(''),
      coord_x: new FormControl('', Validators.required),
      coord_y: new FormControl('', Validators.required)
    });
  }

  async logForm() {

    const loading = await this.loadCtrl.create();
    loading.present();


    const headers = new HttpHeaders().set('Content-Type', 'application/json');

     this.http.post(this._urlPost, this.todo.value, {headers: headers})
                    .subscribe(data => {
                      console.log(data);
                      loading.dismiss();
                      this.todo.reset();
                    });

  }

  async cargarUbicacion() {
    this.latitud = 0;
    this.longitud = 0;

    const myLatLng = await this.dondEestoy();

    this.latitud = myLatLng.lat;
    this.longitud = myLatLng.lng;
  }

  private async dondEestoy() {
    const rta = await this.geolocation.getCurrentPosition();

    return {
        lat: rta.coords.latitude,
        lng: rta.coords.longitude
          };
  }




}
