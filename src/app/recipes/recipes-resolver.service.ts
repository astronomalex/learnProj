import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import {map, switchMap, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn : 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageSevice: DataStorageService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageSevice.fetchRecipes();
    return this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
          return recipeState.recipes;
        }
      ),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
