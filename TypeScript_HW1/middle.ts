// --- DeepPartial<T> - Тип, где все ключи объекта опциональны, включая вложенные объекты ---
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// Пример использования:
interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    street: string;
  };
}

type PartialPerson = DeepPartial<Person>;
// Ожидается: {
//   name?: string;
//   age?: number;
//   address?: {
//     city?: string;
//     street?: string;
//   };
// }

const partialPersonExample: PartialPerson = {
  name: "Vladimir",
  address: {
    city: "Moscow"
  }
};


// --- MyCapitalize<T> - реализация Capitalize<T> из TypeScript ---
type MyCapitalize<T extends string> = T extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : T;

// Пример использования:
type Capitalized = MyCapitalize<'hello'>; // Ожидается: 'Hello'

const capitalizedExample: Capitalized = 'Hello'; // Работает корректно
const invalidCapitalizedExample: Capitalized = 'hello'; // Ошибка, ожидается 'Hello'


// --- DeepMutable<T> - Тип, который делает все ключи изменяемыми, включая вложенные объекты ---
type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// Пример использования:
interface ReadonlyPerson {
  readonly name: string;
  readonly address: {
    readonly city: string;
    readonly street: string;
  };
}

type MutablePerson = DeepMutable<ReadonlyPerson>;

const mutablePersonExample: MutablePerson = {
  name: "Carmat",
  address: {
    city: "New York",
    street: "Main St"
  }
};

mutablePersonExample.name = "Poseidon";
mutablePersonExample.address.city = "Pentagon";


// --- ParseURLParams<StringElem> - Тип, который извлекает параметры URL ---
type ParseURLParams<StringElem extends string> = 
  StringElem extends `${infer _Start}:${infer Param}/${infer Rest}` 
    ? Param | ParseURLParams<`/${Rest}`>
    : StringElem extends `${infer _Start}:${infer Param}`
    ? Param
    : never;

// Пример использования:
type URLParams = ParseURLParams<'posts/:id/:user'>; // Ожидается: 'id' | 'user'
const urlParam1: URLParams = 'id';
const urlParam2: URLParams = 'user'; // Работает корректно
