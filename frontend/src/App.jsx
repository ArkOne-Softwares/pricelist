import { useState } from 'react'
import { FrappeProvider } from 'frappe-react-sdk'
import ListVarients from './component/ListVarients'
function App() {
  return (
	<div className="App">
	  <FrappeProvider>
	  	<ListVarients />
	  </FrappeProvider>
	</div>
  )
}

export default App
