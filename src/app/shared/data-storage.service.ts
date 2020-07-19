import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipesService} from "../recipes/services/recipes.service";
import {Recipe} from "../recipes/models/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://angular-aa7aa.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    })
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://angular-aa7aa.firebaseio.com/recipes.json'
    ).pipe(map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        })
      }),
      tap(recipes => {
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));

        // this.recipesService.setRecipes(recipes)
      }))


  }
}
