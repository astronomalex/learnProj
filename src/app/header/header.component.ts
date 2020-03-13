import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeAction from '../recipes/store/recipe.actions';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    // this.dataStorageSevice.storeRecipes();
    this.store.dispatch(new RecipeAction.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageSevice.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeAction.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
