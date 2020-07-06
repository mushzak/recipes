import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from "../../recipe.model";

@Component({
  selector: 'app-recepe-item',
  templateUrl: './recepe-item.component.html',
  styleUrls: ['./recepe-item.component.css']
})
export class RecepeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor() {
  }

  ngOnInit(): void {
  }


}
