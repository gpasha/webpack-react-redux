import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './app.less'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Main from './main/Main'
import Card from './main/card/Card'

export default function App() {
  const dispath = useDispatch()

  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
            <Route index exact path="/" element={<Main />} />
            <Route path="/card/:username/:reponame" element={<Card />} />
            <Route path="*" element={<Navigate to="/" />}
          />
        </Routes>
        </div>
    </BrowserRouter>
  )
}
