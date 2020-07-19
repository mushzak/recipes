import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../services/recipes.service";
import * as fromApp from '../../../store/app.reducer';
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.store.select('recipes').pipe(
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          })
        })
      )
        .subscribe(recipe => {
          this.recipe = recipe
        });
    });

    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params.id;
    //     this.recipe = this.recipesService.getRecipe(this.id);
    //   }
    // )
  }

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
