import { ParquesService } from './../parques.service';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mapRef = null;
  parques: any[] = [];
  errorMessage = '';

  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private parqueervice: ParquesService
  ) {}

  ngOnInit() {
    this.loadMap();

    this.parqueervice.getParques().subscribe(
      parques => {
        this.parques = parques;
      },
      error => this.errorMessage = <any>error
    );

    console.log(this.parques);

  }

  async loadMap() {

    const loading = await this.loadCtrl.create();
    loading.present();

    const myLatLng = await this.getLocation();
   // console.log(myLatLng);

    const mapEle: HTMLElement = document.getElementById('map');

    this.mapRef = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 12
    });

    for (let i = 0; i < this.parques.length; i++) {
      this.AddMarker(parseFloat(this.parques[i].coord_y), parseFloat(this.parques[i].coord_x), this.parques[i].nombre_Parque, 'parking');
    }

  //  marker.setMap(this.mapRef);

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
        loading.dismiss();
        this.AddMarker(myLatLng.lat, myLatLng.lng, 'Mi Ubicación', 'info');
    });

  }

  private AddMarker(lat: number, lng: number, nombre: string, type: string) {
    const iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';

    const icons = {
      parking: {
        icon: iconBase + 'parking_lot_maps.png'
      },
      library: {
        icon: iconBase + 'library_maps.png'
      },
      info: {
        icon: iconBase + 'info-i_maps.png'
      }
    };

    const marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      zoom: 8,
      map: this.mapRef,
      title: nombre,
      icon :  icons[type].icon
    });

    marker.setMap(this.mapRef);
  }



  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();

    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }


}
