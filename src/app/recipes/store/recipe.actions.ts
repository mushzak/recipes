import { Action } from '@ngrx/store';
import {Recipe} from "../models/recipe.model";

export const SET_RECIPES = '[Recipes] set recipes';

export class SetRecipes implements Action{
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export type RecipesActions = SetRecipes;
