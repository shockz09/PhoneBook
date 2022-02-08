const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log("give password as a argument")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://shockz:${password}@cluster0.iltq2.mongodb.net/phone-book?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
     name: String,
     number: String
    })

const Person = mongoose.model('Person', personSchema)

if(process.argv[3] && process.argv[4]){
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        name:name,
        number:number
    })
    person.save().then(() =>{
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}else{
    Person.find({}).then(result =>{
        console.log('phone -book')
        result.forEach(person => console.log(person.name, person.number))
        mongoose.connection.close()
    })
}



