import { Component, OnInit, ViewChild  } from '@angular/core';
import { ParquesService } from './../parques.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  dataList: any[] = [];
  parques: any[] = [];
  errorMessage = '';

  constructor(private parqueService: ParquesService) {

    //this.cargarDatos();
    //this.dataList = [];
    this.parqueService.getParques().subscribe(
			parques => this.parques = parques,
      error => this.errorMessage = <any>error,
			() => this.cargarDatos()
		);

  }

  cargarDatos() {
		for (let i = 0; i < 10; i++) {
      this.dataList.concat(this.parques);
      console.log(this.dataList);
    }
	}



  loadData(event) {

    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 10; i++) {

        this.dataList.concat(this.parques);
        console.log(this.dataList);
      }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
