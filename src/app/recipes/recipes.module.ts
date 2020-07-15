import {NgModule} from "@angular/core";
import {RecipesComponent} from "./components/recipes/recipes.component";
import {RecipeListComponent} from "./components/recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./components/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./components/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./components/recipe-edit/recipe-edit.component";
import {RecepeItemComponent} from "./components/recipe-list/recepe-item/recepe-item.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecepeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecepeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ],
})

export class RecipesModule {

}
