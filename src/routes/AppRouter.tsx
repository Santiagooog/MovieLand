import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Home} from '../pages/Home'
import { MovieDetails } from '../pages/MovieDetails'
const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movie/:id' element={<MovieDetails/>}/>
    </Routes>
  )
}

export default AppRouter