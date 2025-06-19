import React, { useState } from 'react'
import { ShoppingBasket, Plus, Trash2, Check, X } from 'lucide-react'

interface GroceryItem {
  id: string
  name: string
  purchased: boolean
}

function App() {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [newItem, setNewItem] = useState('')

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return
    
    setItems([...items, {
      id: crypto.randomUUID(),
      name: newItem.trim(),
      purchased: false
    }])
    setNewItem('')
  }

  const togglePurchased = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShoppingBasket className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Lista de Compras</h1>
          </div>
          <p className="text-gray-600">Organize suas compras de forma simples e eficiente</p>
        </div>

        {/* Add Item Form */}
        <form onSubmit={addItem} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Adicionar novo item..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Adicionar</span>
            </button>
          </div>
        </form>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {items.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <ShoppingBasket className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Sua lista está vazia. Adicione alguns itens!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map(item => (
                <li 
                  key={item.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePurchased(item.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                        item.purchased 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {item.purchased && <Check className="w-4 h-4" />}
                    </button>
                    <span className={`${item.purchased ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center px-2">
            <span>Total de itens: {items.length}</span>
            <span>Comprados: {items.filter(item => item.purchased).length}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
