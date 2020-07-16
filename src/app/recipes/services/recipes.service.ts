import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../../shared/ingredients.model";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromApp from "../../store/app.reducer";
@Injectable()

export class RecipesService {
  recipeChanged = new Subject();

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    // this.slServide.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

}
