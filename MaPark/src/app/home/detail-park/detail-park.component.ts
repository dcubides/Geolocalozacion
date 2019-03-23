import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private parqueervice: ParquesService,
    private loadCtrl: LoadingController
    ) { }

  
  id;
  mapRef = null;
  parkDetail: any[] = [];
  errorMessage: any = '';
  
  
  
  ngOnInit() {
    this.id = this.routes.snapshot.paramMap.get('id');
    let dd = this.routes.snapshot.paramMap.get('id');
    dd = dd.replace(':' , '');
    console.log(dd);
    console.log("↓↓onInit");
    console.log(this.parkDetail); 

    this.parqueervice.getParqueById(parseInt(dd)).subscribe(
      data => this.parkDetail = data,
      error => this.errorMessage = <any>error,
      () =>  this.loadMap(this.parkDetail)
    );

  }

  async loadMap(data: any ) {
    console.log("↓↓loadmap");
    console.log(this.parkDetail);
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
      this.AddMarker(parseFloat(data.coord_y), parseFloat(data.coord_x) ,'pepito perez', 'parking');
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


  
}
