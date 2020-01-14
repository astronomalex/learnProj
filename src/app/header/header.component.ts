import {Component} from '@angular/core';
import {DataStorageSevice} from '../shared/data-storage.sevice';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageSevice: DataStorageSevice) {
  }

  onSaveData() {
    this.dataStorageSevice.storeRecipes();
  }

  onFetchData() {
    this.dataStorageSevice.fetchRecipes().subscribe();
  }
}
