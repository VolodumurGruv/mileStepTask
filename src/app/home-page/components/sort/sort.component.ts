import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent implements OnInit {
  @Output() public sorted = new EventEmitter<string>();

  public sortDefault = 'isDone';
  public sortedValues = ['priority', 'isDone', 'dueDate'];

  constructor() {}

  ngOnInit(): void {}

  selectedCategory(event: string): void {
    this.sorted.emit(event);
  }
}
