import React from 'react'
import './category.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { category } from '../../assets/data/data'
import Slider from 'react-slick'

import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
const SimpleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <GrFormNext className="icon"></GrFormNext>
      </button>
    </div>
  )
}

const SimplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <GrFormPrevious className="icon"></GrFormPrevious>
      </button>
    </div>
  )
}

export const Category = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }
  return (
    <>
      <section className="category">
        <div className="content">
          <Slider {...settings}>
            {category.map((item) => (
              <div className="boxs" key={item.id}>
                <div className="box">
                  <img src={item.cover} alt="" />

                  <div className="overlay">
                    <h4>{item.category}</h4>
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}
