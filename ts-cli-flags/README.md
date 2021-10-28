# Flags

A CLI flags parser inspired by golang's `flag` module.

Usage:

```ts
import flags from 'ts-cli-flags';

const mature = flags.boolean('mature', false, 'Describes if the person is of mature age');
const name = flags.string('name', 'John', "Person's name");
const age = flags.number('age', 0, "Preson's age");
const birthday = flags.date('birthday', new Date(0), "Person's birhday");

try {
  flags.parse();
} catch (e) {
  console.log('USAGE:');
  flags.printDefaults();
}

console.log({
  mature: mature.value,
  name: name.value,
  age: age.value,
  birthday: birthday.value,
});
```

Inspiration:

- https://pkg.go.dev/flag
- https://www.youtube.com/watch?v=mpqaQIrVgew
