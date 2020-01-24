import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageSevice} from '../shared/data-storage.sevice';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageSevice: DataStorageSevice,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageSevice.storeRecipes();
  }

  onFetchData() {
    this.dataStorageSevice.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
