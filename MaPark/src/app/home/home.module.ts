import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { DetailParkComponent } from './detail-park/detail-park.component';
import { InventoryTutorialComponent } from './detail-park/inventory-tutorial/inventory-tutorial.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'detail/:id',
        component: DetailParkComponent
      },
      {
        path: 'tutorial/:id',
        component: InventoryTutorialComponent
      }
    ])
  ],
  declarations: [HomePage, DetailParkComponent, InventoryTutorialComponent]
})
export class HomePageModule {}
