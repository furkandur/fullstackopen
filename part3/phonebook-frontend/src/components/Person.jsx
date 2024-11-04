const Person = ({ person, handlePersonDelete }) => {
    return (
      <tr key={person.id}>
        <td>{person.name}</td>
        <td>{person.number}</td> 
        <td><button onClick={() => handlePersonDelete(person.id)}>delete</button></td>
      </tr>
    )
}

export default Person