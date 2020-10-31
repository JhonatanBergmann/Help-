import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../imgs/logo.png'
import '../styles/pages/landing.css'

function Landing() {
    return (
        <div id='page-landing'>
          <div className="content-wrapper">
            
            <div className="logo">
              <img src={logoImg} alt='Help'/>
            </div>
    
            <main>
              <h1>Ajude pessoas em situação de rua</h1>
              <p>Ajude alguém e deixe esse dia mais feliz para todos.</p>
            </main>
    
            <div className='location'>
              <strong>Porto Alegre</strong>
              <span>Rio Grande do Sul</span>
            </div>
    
            <Link to='/app' className='enter-app'>
              <FiArrowRight size={26} color='#FFF' />
            </Link>
          </div>
        </div>

    )
}

export default Landing