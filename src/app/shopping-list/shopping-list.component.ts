import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {Ingredient} from "../shared/ingredients.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription

  constructor(private shoppingList: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
    this.igChangeSub =this.shoppingList.ingredientsChanges.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    )
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
