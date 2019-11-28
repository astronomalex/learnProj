import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test Ricipe',
      'This is a simply a test',
      'https://www.gotemplates.store/wp-content/uploads/Rn1Ke6/recipe-cards.jpg'),
    new Recipe('Test Ricipe',
      'This is a simply a test',
      'https://www.gotemplates.store/wp-content/uploads/Rn1Ke6/recipe-cards.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
