import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Ingredient} from "../../shared/ingredients.model";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from "../../store/app.reducer"




@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }else{
        this.editMode = false;
      }
    })
   // this.subscription = this.slService.startedEditing.subscribe(
   //   (index: number) => {
   //     this.editMode = true;
   //     this.editedItemIndex = index;
   //     this.editedItem = this.slService.getIngredient(index);
   //     this.slForm.setValue({
   //       name: this.editedItem.name,
   //       amount: this.editedItem.amount,
   //     })
   //   }
   // )
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newInstrument = new Ingredient(value.name, value.amount);
    if(this.editMode){
      // this.slService.updateIngredient(this.editedItemIndex, newInstrument);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newInstrument));
    }else{
      // this.slService.addIngredient(newInstrument);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newInstrument));
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

}
