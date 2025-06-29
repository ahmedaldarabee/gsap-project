/* eslint-disable no-unused-vars */
import './App.css'
import About from './components/About'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
  return(
      <main className='w-screen min-h-screen relative overflow-x-hidden bg-zinc-600'>
        <Navbar />
        <Hero />
        <About />
      </main>
  )
}

export default App
