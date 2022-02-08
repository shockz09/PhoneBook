const express = require('express');
const morgan = require('morgan')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.static('build'))

morgan.token('post', (request) => {
  if (request.method === 'POST')
    return JSON.stringify(request.body)
  else
    return ''
})

morgan.format('postFormat', ':method :url :status :res[content-length] - :response-time ms :post')
app.use(morgan('postFormat'))
let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.use(express.json())
const generateId = () => {
  const maxId = 9999
  return Math.floor(Math.random() * maxId);
}

app.post('/api/people', (request, response) => {
  const body = request.body

  if (!body.name || !body.number || !body.name=== people.map(p => p.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }


  const person = {
    name: body.name,
    number: body.number,
    important: body.important || false,
    id: generateId()
  }

  people = people.concat(person)

  response.json(person)
})
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })


  app.get('/api/people', (request, response) => {
    response.json(people)
  })

  app.get('/info', (request, response) => {
    response.send(`<b>PhoneBook has info for about  ${people.length} people <br>  <br>${new Date()}</b>`)
  })

  app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })