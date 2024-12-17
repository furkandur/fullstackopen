import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    if (event.target.value === null || event.target.value === '') {
      dispatch({
        type: 'filter/filterChange',
        payload: true
      })
    } else {
      dispatch({
        type: 'filter/filterChange',
        payload: event.target.value
      })
    }
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter