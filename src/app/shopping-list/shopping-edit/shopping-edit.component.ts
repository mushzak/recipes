import {Component, ElementRef, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Ingredient} from "../../shared/ingredients.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef
  @ViewChild('amountInput') amountInputRef: ElementRef
  @Output() ingredientAdded = new EventEmitter<Ingredient>()

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newInstrument = new Ingredient(ingName, ingAmount);
    this.shoppingList.addIngredient(newInstrument);
  }

}