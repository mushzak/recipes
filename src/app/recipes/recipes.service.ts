import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredients.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()

export class RecipesService {
  recipeChanged = new Subject();

  private recipes: Recipe[] = [];

  constructor(private slServide: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slServide.addIngredients(ingredients);
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
