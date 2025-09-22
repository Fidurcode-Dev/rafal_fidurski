# Dokumentacja projektu: Aplikacja Postów z API JSONPlaceholder

## 1. Cel projektu
Aplikacja będzie wyświetlała listę postów pobranych z publicznego API [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts), umożliwiając:
- filtrowanie postów,
- przeglądanie szczegółów pojedynczego posta,
- dodawanie postów do ulubionych.

Aplikacja jest responsywna i działa na urządzeniach desktopowych oraz mobilnych.

---

## 2. Struktura katalogów

## 3. Lista komponentów

| Komponent       | Opis |
|-----------------|------|
| `Posts`         | Lista wszystkich postów. |
| `Post`          | Pojedynczy post w liście, z możliwością dodania do ulubionych. |
| `PostFilter`    | Filtruje posty po tytule lub użytkowniku. |
| `PostDetails`   | Wyświetla szczegóły pojedynczego posta. |
| `FavoritesList` | Lista ulubionych postów. |
| `FavoriteItem`  | Pojedynczy ulubiony post z możliwością usunięcia. |

---

## 4. Serwisy

### `postsApi.ts`
Funkcje do komunikacji z API:
- `getPosts()` – pobiera wszystkie posty.
- `getPostById(id: number)` – pobiera szczegóły pojedynczego posta.

## 5. Podejście do zarządzania stanem

W projekcie wykorzystujemy **NgRx Signals** do zarządzania stanem aplikacji. Stan globalny przechowuje informacje o postach, ładowaniu danych, komunikatach użytkownika oraz paginacji.

### 5.1 Struktura stanu (`PostState`)

```ts
export interface PostState {
  posts: Post[];           // lista postów
  loading: boolean;        // status ładowania
  message: string | null;  // komunikaty dla użytkownika
}
