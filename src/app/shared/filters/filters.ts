import { Component, signal, WritableSignal, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input
      type="text"
      placeholder="Search posts..."
      class="border p-2 rounded w-full mb-4"
      [(ngModel)]="filterTerm"
      (ngModelChange)="onFilterChange()"
    />
  `,
})
export class Filters {
  filterTerm: WritableSignal<string> = signal('');

  @Output() filterChanged = new EventEmitter<string>();

  onFilterChange(): void {
    this.filterChanged.emit(this.filterTerm());
  }
}
