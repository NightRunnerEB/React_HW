// --- MyPick<T, K> - реализация Pick из TypeScript ---
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Пример использования:
interface Person {
  name: string;
  age: number;
  address: string;
}

type PickedPerson = MyPick<Person, 'name' | 'age'>; 
// Ожидается: { name: string; age: number }


// --- NOfArray<ArrayObj, N> - дженерик для массива, возвращающий тип его N элемента ---
type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

// Пример использования:
type MyArray = [string, number, boolean];
type SecondElement = NOfArray<MyArray, 1>; // Ожидается: number

const secondElementExample: SecondElement = 42; // Ожидается число


// --- Unshift<ArrayType, Elem> - Дженерик для мамссива, первый элемент которого имеет тип Elem, а остальные элементы - тип массива в первом переданном параметре ---
type Unshift<ArrayType extends any[], Elem> = [Elem, ...ArrayType];

// Пример использования:
type MyNewArray = Unshift<[number, string], boolean>;
const unshiftedArrayExample: MyNewArray = [true, 42, "text"]; // Ожидается: [boolean, number, string]


// --- MyExclude<T, U> - реализация Exclude из TypeScript ---
type MyExclude<T, U> = T extends U ? never : T;

// Пример использования:
type Letters = 'a' | 'b' | 'c';
type WithoutA = MyExclude<Letters, 'a'>; // Ожидается: 'b' | 'c'
