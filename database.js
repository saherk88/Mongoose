let mongoose = require('mongoose');
const MONDODB_URI = 'mongodb+srv://saher:saher123@cluster0.5k2u7.mongodb.net/data?retryWrites=true&w=majority' 
mongoose.connect(MONDODB_URI, { 
  
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}) 
   .then(() => {
    console.log('Database connection successful')
  })
   .catch(err => {
     console.error('Database connection error')
   })

 // Create Schema  Person Prototype
 let personSchema = new mongoose.Schema({
   name: { 
        type: String,
        require: true
      },
  age : Number,
  favoriteFoods: [String] ,
  date: { type: Date, default: Date.now },
});
let Person = mongoose.model('Person',personSchema);

// Create and Save a Record of a Model:

// async function createPerson(){
//   const wassim = new Person({
//     name: 'wassim',
//     age: 27,
//     favoriteFoods: ['Pizza' , 'Lasagne' ]
//   })
//   const result = await wassim.save();
//   console.log(result)
// }
// createPerson();

// Create Many Records with model.create()

const personsData = [
  { name: 'Omar', age: 27, favoriteFoods: ['Spaghetti' , 'Lasagne' ]},
  { name: 'Yassine', age: 27, favoriteFoods: ['lablabi' , 'couscous' ]},
  { name: 'Wael', age: 27, favoriteFoods: ['Riz' , 'Lasagne' ]},
  { name: 'Ibrahim', age: 27, favoriteFoods: ['Kafteji' , 'Spaghetti' ]}
]
async function createPersons(personsData){
  personsData.forEach(async (person) => {
    await new Person(person).save()
  })
}
createPersons(personsData);

// Use model.find() to Search Your Database             people having a given name

async function getnamePersons(){
  const persons = await Person.find({name : 1})
  console.log(persons)
}
getnamePersons();


// Use model.findOne()

async function getonePersons(){
  const persons = await Person.find({favoriteFoods : 'Pizza'})
  console.log(persons)
}
getonePersons();

// Use model.findById()

async function getPersons(){
  const persons = await Person.findById('5f786448d09e352a28f12f03')
  console.log(persons)
}
getPersons();

// Perform Classic Updates by Running Find, Edit, then Save

async function Update1Persons(){
  const persons = await Person.findById('5f786448d09e352a28f12f03', {push:{favoriteFoods:'Hamburger'}})
  console.log(persons)
}
Update1Persons();

// Perform New Updates on a Document Using model.findOneAndUpdate()
// Find a person by Name and set the person's age to 20. Use the function parameter personName as search key.

async function Update2Persons(){
  const persons = await Person.findByIdAndUpdate('5f786448d09e352a28f12f03', {
    $set:{ age : 20}
  } , {new:true})
  console.log(persons + 'Updated successfully !')
}
Update2Persons();

// Delete One Document Using model.findByIdAndRemove

async function deletePersons(){
  const persons = await Person.findByIdAndRemove('5f786448d09e352a28f12f63')
  console.log(persons + 'Deleeted successfully !')
}
deletePersons();

// Chain Search Query Helpers to Narrow Search Results

async function getburittoPerson(){
  const persons = await Person
    .find({favoriteFoods:buritto})
    .sort({name : 1})
    .limit(2)
    .select({age : 0})
    .exec()
    console.log(persons + 'Selected successfully !')
  }
getburittoPerson()