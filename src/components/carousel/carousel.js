import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import './carousel.scss'
import avatar from '../../assets/images/image2.png'
var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
        return <div className="dot"></div>;
    },
    dotsClass: "slick-dots slick-thumb"
};

var slider1Settings = { ...settings, autoplaySpeed: 8000 }

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.delay = this.delay.bind(this)
    }

    delay(slider, amount) {
        setTimeout(() => {
            slider.slickPlay()
        }, amount)
    }
    componentDidMount() {
        this.delay(this.slider1, 8000)
    }

    render() {
        return (

            <div className="carousel-landing-page">
                <Slider {...slider1Settings} ref={slider1 => (this.slider1 = slider1)}>
                    <div className="carousel-image" style={{ backgroundImage: `url(require("../../assets/images/image1.jpeg"))` }}>
                        <input className="input2 d-block d-lg-none mr-0" type="text" onClick={this.props.visible} placeholder="Wo suchst du?"></input>
                        <div className="info">
                            <img className="avatar" src={avatar} alt="participant" order="0" />
                            <h3>Gitarrenunterricht bei Dimi</h3>
                        </div>
                    </div>
                    <div className="carousel-image" style={{ backgroundImage: `url(require("../../assets/images/image1.jpeg"))` }}>
                        <input className="input2 d-block d-lg-none mr-0" type="text" onClick={this.props.visible} placeholder="Wo suchst du?"></input>
                        <div className="info">
                            <img className="avatar" src={avatar} alt="participant" order="0" />
                            <h3>Gitarrenunterricht bei Dimi</h3>
                        </div>
                    </div>
                    <div className="carousel-image" style={{ backgroundImage: `url(require("../../assets/images/image1.jpeg"))` }}>
                        <input className="input2 d-block d-lg-none mr-0" type="text" onClick={this.props.visible} placeholder="Wo suchst du?"></input>
                        <div className="info">
                            <img className="avatar" src={avatar} alt="participant" order="0" />
                            <h3>Gitarrenunterricht bei Dimi</h3>
                        </div>
                    </div>
                    <div className="carousel-image" style={{ backgroundImage: `url(require("../../assets/images/image1.jpeg"))` }}>
                        <input className="input2 d-block d-lg-none mr-0" type="text" onClick={this.props.visible} placeholder="Wo suchst du?"></input>
                        <div className="info">
                            <img className="avatar" src={avatar} alt="participant" order="0" />
                            <h3>Gitarrenunterricht bei Dimi</h3>
                        </div>
                    </div>
                    <div className="carousel-image" style={{ backgroundImage: `url(require("../../assets/images/image1.jpeg"))` }}>
                        <input className="input2 d-block d-lg-none mr-0" type="text" onClick={this.props.visible} placeholder="Wo suchst du?"></input>
                        <div className="info">
                            <img className="avatar" src={avatar} alt="participant" order="0" />
                            <h3>Gitarrenunterricht bei Dimi</h3>
                        </div>
                    </div>
                </Slider>
            </div>

        )
    }
}

export default Carousel;
