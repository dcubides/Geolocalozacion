import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParquesService } from './../../parques.service';

@Component({
  selector: 'app-detail-park',
  templateUrl: './detail-park.component.html',
  styleUrls: ['./detail-park.component.scss'],
})
export class DetailParkComponent implements OnInit {

  constructor(
    private routes: ActivatedRoute,
    private parqueervice: ParquesService,
    ) { }

  
  id;
  parkDetail: any[];
  errorMessage: any = '';
  


  ngOnInit() {
    this.id = this.routes.snapshot.paramMap.get('id');

    this.parqueervice.getParqueById(this.id).subscribe(
      data => this.parkDetail = data,
      error => this.errorMessage = <any>error
    )

  }
  
}
