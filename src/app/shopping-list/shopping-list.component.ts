import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.module';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import {LoggingService} from '../logging.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangesSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private loggingService: LoggingService
  ) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangesSub = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!')
  }

  ngOnDestroy(): void {
    this.igChangesSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startEditing.next(index);
  }
}
