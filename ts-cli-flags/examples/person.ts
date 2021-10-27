import flags from '../src/lib';

const mature = flags.boolean('mature', false, 'Describes if the person is of mature age');
const name = flags.string('name', 'John', "Person's name");
const surname = flags.string('surname', 'Doe', "Person's surname");
const age = flags.number('age', 0, "Preson's age");
const birthday = flags.date('birthday', new Date(0), "Person's birhday");

console.log({
  mature: mature.value,
  name: name.value,
  surname: surname.value,
  age: age.value,
  birthday: birthday.value,
});

try {
  flags.parse();
} catch (e) {
  console.log('USAGE:');
  flags.printDefaults();
}

console.log({
  mature: mature.value,
  name: name.value,
  surname: surname.value,
  age: age.value,
  birthday: birthday.value,
});
