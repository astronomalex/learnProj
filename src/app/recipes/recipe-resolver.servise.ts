import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageSevice} from '../shared/data-storage.sevice';


@Injectable({
  providedIn : 'root'
})
export class RecipeResolverServise implements Resolve<Recipe[]> {
  constructor(private dataStorageSevice: DataStorageSevice) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataStorageSevice.fetchRecipes();
  }
}
