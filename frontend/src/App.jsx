import { useState } from 'react'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
import ListVarients from './component/ListVarients'
function App() {
  const [count, setCount] = useState(0)

  return (
	<div className="App">
	  <FrappeProvider>
	  	<ListVarients />
	  </FrappeProvider>
	</div>
  )
}

export default App
