import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { Route, Routes } from "react-router-dom"
import Fixedbutton from './components/Fixedbutton'



export default class App extends Component {
  constructor(){
    super()
    this.pagesize = 20
  }
  render() {
    return (
      <>
        <Navbar/>
        <Routes>
            <Route exact path="/" element={<News key="general" pagesize={this.pagesize} country="in" category="general" />} />
            <Route path="/business" element={<News key="buisness" pagesize={this.pagesize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" pagesize={this.pagesize} country="in" category="entertainment" />} />
            <Route path="/health" element={<News key="health" pagesize={this.pagesize} country="in" category="health" />} />
            <Route path="/science" element={<News key="science" pagesize={this.pagesize} country="in" category="science" />} />
            <Route path="/sports" element={<News key="sports" pagesize={this.pagesize} country="in" category="sports" />} />
            <Route path="/technology" element={<News key="technology" pagesize={this.pagesize} country="in" category="technology" />} />
        </Routes>
        <Fixedbutton/>
      </>
    )
  }
}
