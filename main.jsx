import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Studio from './pages/Studio'
import Invoice from './pages/Invoice'
import Rate from './pages/Rate'
import Website from './pages/Website'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Website />} />
      <Route path="/studio" element={<Studio />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/rate" element={<Rate />} />
    </Routes>
  </BrowserRouter>
)
