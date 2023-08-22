import style from './Landing.module.css'
//import React, { useState } from 'react';
import ClientComments from '../ClientComments/ClientComments'
import { NavLink } from 'react-router-dom'
import {SimpleSlider} from '../Swiper/Swiper'
//import  Animation from '../../assets/Gif.gif'

export const Landing = () => {
  /*const [loading, setLoading] = useState(true)//useState inicializa el estado loading como true.
  //Si loading es true, se muestra una animación de carga y el mensaje "Loading...".    
  if(loading){
    return(
      <div className={style.container}>
          <img src={Animation} className={style.loading} alt=""/>
          Loading...
      </div>
    )
//Si loading es false, se muestra el contenido principal de la página (buscador, paginación y el boton de reset)
  } else{*/
  return (
    <>
      <div className={style.parent}>
          <div className={style.div1}>
              <h1> GreenLand <hr/></h1>
              <div> Discover Our Eco-Friendly Collection Offering a Diverse Range of Products, Accessories, and Sustainable Alternatives for Every Need and Occasion.
                    Join the Movement Toward Sustainability with Our Diverse Selection of Eco-Friendly Products, Curated for Eco Warriors Like You. 
                    From Zero-Waste Essentials to Biodegradable Delights, Our Eco-Conscious Lineup is Designed to Uplift Your Lifestyle and the Planet.
              </div>
              <NavLink to="/login" className={style.buttonLink}>LOG IN</NavLink>
          </div>
          <div className={style.div2}> 
              <SimpleSlider/>
          </div>
      </div>
      <ClientComments/>
    </>
  )
 }

