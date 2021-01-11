import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map as MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../imgs/map-marker.png'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

import '../styles/pages/helps-map.css'

interface Help {
  id: number
  latitude: number
  longitude: number
  name: string
}

function HelpsMap() {
  const [helps, setHelps] = useState<Help[]>([])

  useEffect(() => {
    api.get('helps').then(response => {
      setHelps(response.data)
    })
  }, [])

  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarkerImg} alt='Help' />

          <h2>Escolha no mapa quem você quer ajudar</h2>
          <p>Muitas pessoas estão esperando a sua ajuda :)</p>
        </header>

        <footer>
          <strong>Porto Alegre</strong>
          <span>Rio Grande do Sul</span>
        </footer>
      </aside>

      <MapContainer
        center={[-30.029941, -51.2395647]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}>

        <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {helps.map(help => {
          return (
            <Marker
              key={help.id}
              icon={mapIcon}
              position={[help.latitude, help.longitude]}>
              <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
                {help.name}
                <Link to={`/helps/${help.id}`}>
                  <FiArrowRight size={20} color='#FFF' />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <Link to='/helps/create' className='create-help'>
        <FiPlus size={32} color={'#FFF'} />
      </Link>
    </div>
  )
}

export default HelpsMap