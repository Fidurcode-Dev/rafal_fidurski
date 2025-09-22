import { Component, signal, WritableSignal, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search posts..."
        class="border p-2 rounded w-full"
        [ngModel]="filterTerm()"
        (ngModelChange)="filterTerm.set($event); onFilterChange()"
      />

      <label class="flex items-center space-x-2">
        <input
          type="checkbox"
          [ngModel]="showFavorites()"
          (ngModelChange)="showFavorites.set($event); onFilterChange()"
          class="form-checkbox"
        />
        <span class="text-sm">Favorites</span>
      </label>
    </div>
  `,
})
export class Filters {
  filterTerm: WritableSignal<string> = signal('');
  showFavorites: WritableSignal<boolean> = signal(false);

  @Output() filterChanged: EventEmitter<{term: string; favorites: boolean}> = new EventEmitter<{ term: string; favorites: boolean }>();

  onFilterChange(): void {
    this.filterChanged.emit({
      term: this.filterTerm(),
      favorites: this.showFavorites(),
    });
  }
}
