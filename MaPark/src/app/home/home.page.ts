import { ParquesService } from './../parques.service';
import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


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
    private parqueervice: ParquesService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.loadMap()

    this.parqueervice.getParques().subscribe(
      parques => this.parques = parques,
      error => this.errorMessage = <any>error,
      () => this.alTerminardeCArgar()
    );

    

    //this.loadMap();
  }

  alTerminardeCArgar(): void{
    this.loadMap();
  }

  async loadMap() {

    const loading = await this.loadCtrl.create();
    loading.present();

    const myLatLng = await this.dondEestoy();
   // console.log(myLatLng);

    const mapEle: HTMLElement = document.getElementById('map');

    this.mapRef = new google.maps.Map(mapEle, {
        center: myLatLng,
        zoom: 12
    });

    for (let i = 0; i < this.parques.length; i++) {
      this.AddMarker(parseFloat(this.parques[i].coord_y), parseFloat(this.parques[i].coord_x), this.parques[i].nombre_Parque, 'parking' , this.parques[i].parqueId);
    }

  //  marker.setMap(this.mapRef);

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
    this.AddMarker(myLatLng.lat, myLatLng.lng, 'Mi Ubicación', 'info' , 0);
      loading.dismiss();
    });

  }

  private AddMarker(lat: number, lng: number, nombre: string, type: string, id: number ) {
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
    
    const infowindow = new google.maps.InfoWindow({
      content: `
          <div>
            <h4>
              ${nombre}
            </h4>
            <a href="/home/:${id}">Go to Detail</a>
          </div>
        `
    });

    marker.addListener('click', function() {
      infowindow.open(this.mapRef, marker);
    });

    // marker.setMap(this.mapRef);
  }

  private openDetalle(id:number){
    console.log(id);
  }



  private async dondEestoy() {
    const rta = await this.geolocation.getCurrentPosition();

    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }


}
