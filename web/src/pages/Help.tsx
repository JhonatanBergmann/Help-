import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/help.css';

interface Help {
  latitude: number
  longitude: number
  name: string
  about: string
  images: Array<{
    id: number
    url: string
  }>
}

interface HelpParams {
  id: string
}

export default function Help() {
  const params = useParams<HelpParams>()
  const [help, setHelp] = useState<Help>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
      api.get(`helps/${params.id}`).then(response => {
          setHelp(response.data) 
      })
  }, [params.id])

  if (!help) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-help">
      <Sidebar />

      <main>
        <div className="help-details">
          <img src={help.images[activeImageIndex].url} alt={help.name} />

          <div className="images">
            {help.images.map((image, index) => {
              return (
                <button 
                key={image.id} 
                className={activeImageIndex == index ? 'active' : ''} 
                type="button"
                onClick={() => {
                  setActiveImageIndex(index)
                }}
                >
                 <img src={image.url} alt={help.name} />
                </button>
              )
            })}
          </div>
          
          <div className="help-details-content">
            <h1>{help.name}</h1>
            <p>
              {help.about}
            </p>

            <div className="map-container">
              <Map 
                center={[help.latitude, help.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker interactive={false} icon={mapIcon} position={[help.latitude, help.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${help.latitude},${help.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />
          </div>
        </div>
      </main>
    </div>
  );
}