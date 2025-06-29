/* eslint-disable no-unused-vars */
import './App.css'
import About from './components/About'
import Hero from './components/Hero'

function App() {
  return(
      <main className='w-screen min-h-screen relative overflow-x-hidden'>
        <Hero />
        <About />
      </main>
  )
}

export default App
