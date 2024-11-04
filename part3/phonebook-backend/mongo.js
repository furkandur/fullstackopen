const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit()
}

const args = {
  password: process.argv[2],
  name: process.argv[3],
  number: process.argv[4],
}

const url =
  `mongodb+srv://Krinkless:${args.password}@cluster0.gggid.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (args.name && args.number) {
  const person = new Person({
    name: args.name,
    number: args.number
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('phonebook:')
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}