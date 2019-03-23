import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { DetailParkComponent } from './detail-park/detail-park.component';

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
        path: ':id',
        component: DetailParkComponent
      }
    ])
  ],
  declarations: [HomePage, DetailParkComponent]
})
export class HomePageModule {}
