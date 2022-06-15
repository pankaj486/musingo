import { Grid } from "@material-ui/core";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
var settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  customPaging: function (i) {
    return <div className="dot"></div>;
  },
  dotsClass: "slick-dots slick-thumb",
};
const SectionBgImg = "https://i.ibb.co/bKgVDhB/image4.jpg";

const UserImg = "https://i.ibb.co/kK26pnm/image1.png";

var slider1Settings = { ...settings, autoplaySpeed: 8000 };

class CarouselNew extends React.Component {
  constructor(props) {
    super(props);
    this.delay = this.delay.bind(this);
  }

  

  delay(slider, amount) {
    setTimeout(() => {
      slider.slickPlay();
    }, amount);
  }
  componentDidMount() {
    this.delay(this.slider1, 8000);
  }

  render() {

    return (
      <div className="carousel-landing-page">
        <Slider
          {...slider1Settings}
          ref={(slider1) => (this.slider1 = slider1)}
        >
          <div
            className="wrapper-inner"
            
          >
            <div className="wrapper-inner--content">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={4}
              >
                <Grid item>
                  <Grid
                    container
                    alignItems="center"
                    spacing={4}
                    style={{ padding: "2.5rem", paddingTop: '0' }}
                  >
                    <Grid item xl={6}>
                      <div className="">
                        <img
                          className="wrapper-inner-image"
                          src={UserImg}
                          style={{
                            width: "4.75rem",
                            height: "4.75rem",
                          }}
                          alt="musingo user image"
                        />
                      </div>
                    </Grid>
                    <Grid item xl={6}>
                      <h1 className="wrapper-inner-heading">
                        Musikunterric ht bei Dimi
                      </h1>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <h1 className="wrapper-inner--content-heading">
                Music is everywhere
              </h1>
              <h2 className="wrapper-inner--content-title">
                Komm in unsere Community und finde Musikunterricht, Instrumente
                und Konzerte von Musikern in deiner Nähe
              </h2>
              <p className="wrapper-inner--content-sub-heading">
                Diese Künstler vertrauen Musingoo
              </p>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">Max Grubinger</p>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">Elis Murton</p>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">UDOLINDENBERG</p>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">Die Prinzen</p>
                </Grid>
              </Grid>
            </div>
          </div>
          <div
            className="wrapper-inner"
            style={{
              backgroundImage: `url(${SectionBgImg})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: 'auto'
            }}
          >
            <div className="wrapper-inner--content">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={4}
              >
                <Grid item>
                  <Grid
                    container
                    alignItems="center"
                    spacing={4}
                    style={{ padding: "2.5rem", paddingTop: '0' }}
                  >
                    <Grid item xl={6}>
                      <div className="">
                        <img
                          className="wrapper-inner-image"
                          src={UserImg}
                          style={{
                            width: "4.75rem",
                            height: "4.75rem",
                          }}
                          alt="musingo user image"
                        />
                      </div>
                    </Grid>
                    <Grid item xl={6}>
                      <h1 className="wrapper-inner-heading">
                        Musikunterric ht bei Dimi
                      </h1>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <h1 className="wrapper-inner--content-heading">
                It’s all about Music
              </h1>
              <h2 className="wrapper-inner--content-title">
                Komm in unsere Community und finde Musikunterricht, Instrumente
                und Konzerte von Musikern in deiner Nähe
              </h2>
              <p className="wrapper-inner--content-sub-heading">
                Diese Künstler vertrauen Musingoo
              </p>
              <Grid container spacing={4} justifyContent="center">
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">Max Grubinger</p>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">Elis Murton</p>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">UDOLINDENBERG</p>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6}>
                  <p className="wrapper-inner--footer-desc">Die Prinzen</p>
                </Grid>
              </Grid>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default CarouselNew;
