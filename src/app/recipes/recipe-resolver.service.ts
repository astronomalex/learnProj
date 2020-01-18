import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageSevice} from '../shared/data-storage.sevice';
import {RecipeService} from './recipe.service';


@Injectable({
  providedIn : 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageSevice: DataStorageSevice,
              private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageSevice.fetchRecipes();
    } else {
      return recipes;
    }

  }
}
