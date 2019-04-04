import { Component, OnInit } from '@angular/core';
//import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-tutorial',
  templateUrl: './inventory-tutorial.component.html',
  styleUrls: ['./inventory-tutorial.component.scss'],
})
export class InventoryTutorialComponent implements OnInit {


  constructor(//private storage: Storage, 
              private router: Router) {}
  ngOnInit() {}

  async finish() {
   // await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/');
  }

}
