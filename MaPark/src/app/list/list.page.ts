import { Component, OnInit, ViewChild  } from '@angular/core';
import { ParquesService } from './../parques.service';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage  implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  inicio: number;
  fin: number;
  dataList: any[] = [];
  parques: any[] = [];
  errorMessage = '';
  _ListFilter: string;
  filteredParques: any[];

  constructor(private parqueService: ParquesService) {
    this.inicio = 0;
    this.fin = 10;
  //  this.dataList = [];
 //   this.parqueService.getParques().subscribe(
  //    parques => {this.parques = parques,
  //    this.filteredParks = this.parques;
  //  },
  //    error => this.errorMessage = <any>error,
  //    () => this.cargarDatos()
  //    );
  }

  ngOnInit(): void {
    this.parqueService.getParques().subscribe(
      parques => {this.parques = parques;
        this.filteredParques = this.parques;
      },
      error => this.errorMessage = <any>error,
      () => this.cargarDatos()
      );
  }

  cargarDatos() {
    this.dataList = this.filteredParques.slice(this.inicio, this.fin);

    // localStorage.setItem('datos', JSON.stringify({ inicio: this.inicio, fin: this.fin }));
    // this.dataList = this.dataList.concat(this.parques);
   }

   get listFilter(): string{
    return this._ListFilter;
  }

  set listFilter(value: string) {
    this._ListFilter = value;
    this.filteredParques = this.listFilter ? this.performFilter(this.listFilter) : this.parques;

  }



  loadData(event) {
    console.log('Done');
    setTimeout(() => {
      // let datos: any = localStorage.getItem('datos');

      /* if (datos !== null || datos !== undefined) {
        datos = JSON.parse(datos);
        this.inicio = datos.inicio + 10;
        this.fin = datos.fin + 10;

        localStorage.setItem('datos', JSON.stringify({ inicio: this.inicio, fin: this.fin }));
      }
      */

      this.inicio = this.inicio + 10;
      this.fin = this.fin + 10;
      this.dataList =  this.dataList.concat(this.filteredParques.slice(this.inicio, this.fin));

      event.target.complete();
      // for (let i = 0; i < 10 ; i++) {
      //   this.dataList.push(this.parques[i]);
      //   event.target.complete();
      // }
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length >= this.parques.length) {
        event.target.disabled = true;
        this.inicio = 0;
        this.fin = 10;
      }

    }, 500);
  }

  buscarParque(): void {

  }

  performFilter(filterBy: string): any[] {

    filterBy = filterBy.toLocaleLowerCase();
    // return this.parques.filter((parque: any) =>
    // parque.nombre_Parque.toLocaleLowerCase().indexOf(filterBy) !== -1);
    console.log(filterBy);

    this.dataList = this.parques.filter((parque) => {
      console.log((parque.nombre_Parque.indexOf(filterBy) > -1))
      return (parque.nombre_Parque.indexOf(filterBy) > -1);
    });

    console.log(this.dataList, 'YRR');

    return [];
  }


}
