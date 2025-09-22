import {Component, signal, WritableSignal, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {httpResource, HttpResourceRef} from '@angular/common/http';
import {Author} from '../../features/posts/interfaces/author.model';

interface User {
  id: number;
  name: string;
}

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

      @if (!users) {
        <p>Empty users list</p>
      } @else {
        <select
          [ngModel]="selectedUserId()"
          (ngModelChange)="selectedUserId.set($event); onFilterChange()"
          class="border p-2 rounded"
        >
          <option value="">Select Author</option>
          @for (user of (users.value() ?? []); track user.id) {
            <option [value]="user.id">{{ user.name }}</option>
          }
        </select>
      }

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
  selectedUserId: WritableSignal<number | ''> = signal('');

  private readonly API_URL: string = 'https://jsonplaceholder.typicode.com/users';

  @Output() filterChanged: EventEmitter<{ term: string; favorites: boolean; userId: number | '' }> =
    new EventEmitter<{ term: string; favorites: boolean; userId: number | '' }>();

  users: HttpResourceRef<User[] | undefined> = httpResource<User[] | undefined>(() => {
    return {url: this.API_URL};
  });

  onFilterChange(): void {
    this.filterChanged.emit({
      term: this.filterTerm(),
      favorites: this.showFavorites(),
      userId: this.selectedUserId(),
    });
  }
}
