import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { TransitionGroup, Transition } from 'react-transition-group'
import { gsap } from 'gsap'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'

import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <Route
        render={(props) => {
          // const { key } = props.location // для browser router
          const key = props.location.pathname // для hasrouter

          return (
            <TransitionGroup component={null}>
              <Transition
                key={key}
                timeout={{ enter: 200, exit: 1000 }}
                onEnter={(node) => {
                  node.style.display = 'none'
                  setTimeout(() => (node.style.display = 'block'), 300)
                }}
                onExit={() => {
                  const wrapper = document.createElement('div')
                  wrapper.classList.add('wrapper-animation')
                  document.body.appendChild(wrapper)

                  gsap.to('.wrapper-animation', {
                    x: '-100%',
                    duration: 1,
                    onComplete: () => document.body.removeChild(wrapper),
                  })
                }}
              >
                <Main location={props.location} />
              </Transition>
            </TransitionGroup>
          )
        }}
      />
      <Footer />
    </Router>
  )
}

export default App
