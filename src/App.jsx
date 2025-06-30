/* eslint-disable no-unused-vars */

import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Story from './components/Story'

function App() {
  return(
      <main className='w-screen min-h-screen relative overflow-x-hidden bg-zinc-600'>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
      </main>
  )
}

export default App
