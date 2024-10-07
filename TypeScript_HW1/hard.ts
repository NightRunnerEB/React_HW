// Проверяем, содержит ли строка символ подчеркивания (_)
// Если подчеркивание найдено, разделяем строку на две части: перед и после подчеркивания
// Затем применяем рекурсию к части после подчеркивания (Tail) и превращаем первый символ этой части в заглавный (с помощью Capitalize)
// Таким образом, преобразуем строку в формате snake_case в camelCase
type SnakeToCamelCase<S extends string> = 
  S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<SnakeToCamelCase<Tail>>}` // Рекурсия: Преобразуем часть после подчеркивания (Tail) в camelCase
    : S;

// Тип, который проходит по ключам объекта T и преобразует их в camelCase, используя SnakeToCamelCase
// Если значение свойства — объект, то применяем Camelize рекурсивно
type Camelize<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: 
    T[K] extends object ? Camelize<T[K]> : T[K]; // Рекурсивно обрабатываем вложенные объекты
};

// Пример объекта с именами свойств в snake_case
interface SnakeCaseObj {
  first_name: string;
  last_name: string;
  address_info: {
    street_name: string;
  };
}

type CamelizedObj = Camelize<SnakeCaseObj>; 

const camelizedExample: CamelizedObj = {
  firstName: "Evgeniy",
  lastName: "Don",
  addressInfo: {
    streetName: "Porkrovsk str"
  }
};

// --- DeepPick<T, Paths> - Реализация Pick для вложенных объектов ---

// Вспомогательный тип, который обрабатывает пути в виде 'ключ.ключ'
// Если путь включает несколько уровней, обрабатываем каждый уровень рекурсивно
type DeepPickHelper<T, K> = 
  K extends `${infer Key}.${infer Rest}` // Если ключ разделен точкой на несколько уровней
    ? Key extends keyof T
      ? { [P in Key]: DeepPickHelper<T[Key], Rest> } // Если да, рекурсивно переходим к следующему уровню
      : never // Если ключ не найден, возвращаем never
    : K extends keyof T ? { [P in K]: T[P] } : never;

// Конвертируем объединение типов в пересечение
type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

// Основной тип DeepPick, который использует DeepPickHelper для обработки путей
type DeepPick<T, Paths extends string> = UnionToIntersection<DeepPickHelper<T, Paths>>;

// Пример использования с объектом и путями
interface DeepPerson {
  name: string;
  address: {
    city: string;
    street: string;
  };
}

// Мы выбираем только name и вложенное address.city
type PickedDeepPerson = DeepPick<DeepPerson, 'address.city' | 'name'>;
const deepPickedExample: PickedDeepPerson = {
  name: "Bob",
  address: {
    city: "BobTown"
  }
};
