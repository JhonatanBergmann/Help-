import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent  } from 'leaflet'
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-help.css';

export default function CreateHelp() {
  const history = useHistory()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [preViewImages, setPreViewImages] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({ 
      latitude: lat,
      longitude: lng
    })
  }

function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
  if (!event.target.files) {
    return
  }

  const selectedImages = Array.from(event.target.files)

  setImages(selectedImages)

  const selectedImagesPreview = selectedImages.map(image => {
    return URL.createObjectURL(image)
  })

  setPreViewImages(selectedImagesPreview)
}

async function handleSubmit(event: FormEvent) {
  event.preventDefault()

  const { latitude, longitude } = position

  const data = new FormData()

  data.append('name', name)
  data.append('about', about)
  data.append('latitude', String(latitude))
  data.append('longitude', String(longitude))

  images.forEach(image => {
    data.append('images', image)
  })

  await api.post('helps', data)

  history.push('/app')
}

  return (
    <div id="page-create-help">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-help-form">
          <fieldset>
            <legend>Cadastro</legend>

            <Map 
              center={[-30.029941,-51.2395647]}
              zoom={15}
              style={{ width: '100%', height: 280 }}
              onClick={handleMapClick}
            >
              <TileLayer 
                url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              { position.latitude != 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value={about} 
                onChange={event => setAbout(event.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {preViewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
