import Person from './Person'

const Persons = ({ persons, filter, handlePersonDelete }) => {
  
    if (filter) {
      return (
        <table>
          <tbody>
          {persons.map(person => {
            if (person.name.match(new RegExp(filter, 'i'))) {
              return <Person key={person.id} person={person} handlePersonDelete={handlePersonDelete} />
            }
          })}
          </tbody>
        </table>
      )
    }
  
    else {
      return (
        <table>
          <tbody>
          {persons.map(person => 
            <Person key={person.id} person={person} handlePersonDelete={handlePersonDelete} />
          )}
          </tbody>
        </table>
      )
    }
}

export default Persons