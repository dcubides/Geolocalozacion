import { ParquesService } from './../parques.service';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';


declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  mapRef = null;
  parques: any[] = [];
  errorMessage = '';

_filtroParque = 'UB';
valor = '';

get filtroParque(): string {
  return this._filtroParque;
}

set filtroParque(value: string) {
  this._filtroParque = value;
  this.filteredParks = this.filtroParque ? this.performFilter(this.filtroParque) : this.parques;
}

filteredParks: any[] = [];

performFilter(filterBy: string): any[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.parques.filter((parques: any) =>
  parques.nombre_Parque.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

filtrarParque() {
  this.performFilter('um');
}




  constructor(
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private parqueervice: ParquesService
  ) {}

  ngOnInit() {
    this.parqueervice.getParques().subscribe(
      parques => {
        this.parques = parques;
        this.filteredParks = this.parques;
      },
      error => this.errorMessage = <any>error,
      () => this.loadMap()
    );

   // this.loadMap();
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

    for (let i = 0; i < this.filteredParks.length; i++) {
      this.AddMarker(parseFloat(this.parques[i].coord_y), parseFloat(this.parques[i].coord_x), this.parques[i].nombre_Parque, 'parking');
    }


    console.log(this.parques);
  //  marker.setMap(this.mapRef);

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
    this.AddMarker(myLatLng.lat, myLatLng.lng, 'Mi Ubicación', 'info');
     loading.dismiss();
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
