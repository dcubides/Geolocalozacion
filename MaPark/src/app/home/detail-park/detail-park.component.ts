import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { ParquesService } from './../../parques.service';



declare var google;

@Component({
  selector: 'app-detail-park',
  templateUrl: './detail-park.component.html',
  styleUrls: ['./detail-park.component.scss'],
})
export class DetailParkComponent implements OnInit {

  constructor(
    private routes: ActivatedRoute,
    private route: Router,
    private parqueervice: ParquesService,
    private loadCtrl: LoadingController
    ) { }

  id;
  mapRef = null;
  parkDetail: any[] = [];
  errorMessage: any = '';

  ngOnInit() {
    this.id = this.routes.snapshot.paramMap.get('id');
    let identificador: string = this.routes.snapshot.paramMap.get('id');
    identificador = identificador.replace(':' , '');

    this.parqueervice.getParqueById(parseInt(identificador)).subscribe(
      data => {
        this.parkDetail = data;
        console.log(data);
      },
      error => this.errorMessage = <any>error,
      () =>  this.loadMap(this.parkDetail)
    );

  }

  async loadMap(data: any ) {

    const loading = await this.loadCtrl.create();
    loading.present();

    const mapEle: HTMLElement = document.getElementById('map');

    this.mapRef = new google.maps.Map(mapEle, {
        center: {
          lat: parseFloat(data.coord_y),
          lng: parseFloat(data.coord_x)
        },
        zoom: 16,
        disableDefaultUI: true
    });

    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      this.AddMarker(parseFloat(data.coord_y), parseFloat(data.coord_x) , 'pepito perez', 'parking');
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
      // zoom: 8,
      map: this.mapRef,
      title: nombre,
      icon :  icons[type].icon
    });

    // marker.setMap(this.mapRef);
  }

  irTutorial() {
    this.route.navigateByUrl('home/tutorial/' + this.id);
  }


}
