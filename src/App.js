import React, { useState, useEffect } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [items, setItems] = useState([
    { itemName: 'Milk', quantity: '1', isSelected: false },
    { itemName: 'Eggs', quantity: '12', isSelected: true },
    { itemName: 'Oats', quantity: '6', isSelected: false },
  ])
  const [inputValue, setInputValue] = useState('')
  const [itemCount, setItemCount] = useState(0)

  function handleAddButtonClick() {
    if (inputValue.trim() === '') return

    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    }

    const newItems = [...items, newItem]
    setItems(newItems)
    setInputValue('')
  }

  function toggleSelected(index) {
    const newItems = [...items]
    newItems[index].isSelected = !newItems[index].isSelected
    setItems(newItems)
  }

  function handleQuantityDecrease(index) {
    const newItems = [...items]
    if (newItems[index].quantity === 1) return
    newItems[index].quantity--
    setItems(newItems)
    calculateTotal()
  }

  function handleQuantityIncrease(index) {
    const newItems = [...items]
    newItems[index].quantity++
    setItems(newItems)
    calculateTotal()
  }

  function calculateTotal() {
    const totalItems = items.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    setItemCount(totalItems)
  }

  return (
    <div className='app-background'>
      <div className='main-container'>
        <div className='add-item-box'>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='add-item-input'
            placeholder='Add an item...'
          />
          <FontAwesomeIcon
            onClick={() => handleAddButtonClick()}
            icon={faPlus}
          />
        </div>
        <div className='item-list'>
          {items.map((item, index) => (
            <div className='item-container'>
              <div className='item-name'>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon
                      onClick={() => toggleSelected(index)}
                      icon={faCheckCircle}
                    />
                    <span
                      onClick={() => toggleSelected(index)}
                      className='completed'
                    >
                      {item.itemName}
                    </span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      onClick={() => toggleSelected(index)}
                      icon={faCircle}
                    />
                    <span onClick={() => toggleSelected(index)}>
                      {item.itemName}
                    </span>
                  </>
                )}
              </div>
              <div className='quantity'>
                <button>
                  <FontAwesomeIcon
                    onClick={() => handleQuantityDecrease(index)}
                    icon={faChevronLeft}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    onClick={() => handleQuantityIncrease(index)}
                    icon={faChevronRight}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='total'>Total: {itemCount}</div>
      </div>
    </div>
  )
}

export default App
