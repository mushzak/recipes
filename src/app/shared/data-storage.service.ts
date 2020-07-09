import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {Recipe} from "../recipes/recipe.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipesService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://angular-aa7aa.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes(){
    this.http.get<Recipe[]>('https://angular-aa7aa.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        })
      }))
      .subscribe(response => {
      this.recipesService.setRecipes(response)
    })
  }
}
