import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, contactAdded,deleting,editing } from './action';
import { useState } from 'react'

function App() {
  const counter = useSelector(state => state.counter)
  const contactlist = useSelector(state => state.contactlist)
  const [phone, setPhone] = useState({})
  const dispatch = useDispatch();


  const handelChange = (event) => {
    const att = event.target.name
    const value = event.target.value
    const updatedValue = { ...phone }
    updatedValue[att] = value
    console.log("updatedValue", updatedValue);
    setPhone(updatedValue)

  }

  const handelSubmit = (event) => {
    event.preventDefault()
    dispatch(contactAdded(phone))
  }

  const handleEdit = (index) => {
    if (contactlist[index].name === phone.name &&
        contactlist[index].number === phone.number)
      return;
      
    dispatch(editing({index, phone}));
  }

    const deleteContact = (index) => {
      dispatch(deleting({index}));
    }

  return (
    <div >
      <h1>counter {counter}</h1>

      <button onClick={() => dispatch(increment(2))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>

      <ul>{contactlist.map((item, index) => {
        return (
          <div key={index}>
            <li>name {item.name} number {item.number} <input onClick={() => handleEdit(index)} type="button" value="edit" /> <input onClick={() => deleteContact(index)} type="button" value="delete" /></li>

          </div>
        )
      })}</ul>

      <form onSubmit={handelSubmit}>
        <label>
          <input type="text" name="number" onChange={handelChange} />
                number</label>
        <br />
        <label>
          <input type="text" name="name" onChange={handelChange} />
                name</label>
        <br />
        <div>
          <input type="submit" value="Add to the list" />
        </div>
      </form>

    </div>
  );
}

export default App;
