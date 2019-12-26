import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.module';
import {ShoppingListService} from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {


  private recipes: Recipe[] = [
    new Recipe('Test Recipe',
      'This is a simply a test',
      'https://s1.1zoom.me/b5050/93/401725-svetik_3840x2400.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'Big Fat Burger - m-m-m-m om-nom-tra-la-la',
      'https://3.bp.blogspot.com/-O0Ti17quqWM/V5SnN2Y_EiI/AAAAAAAASYs/Xazew0vWJoIYtocVBj7WWdkUE8pZk46ygCLcB/s1600/Vegan%20megaburger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Cocomber', 1),
        new Ingredient('Onion', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
