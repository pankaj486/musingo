import { Grid } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TypeWriterEffect from 'react-typewriter-effect';
import CarouselNew from "src/components/carousel-new/carousel-new";
import LandingSearchBar from "src/components/layout/landingSearchBar";
import useWindowResize from "src/custom-hooks/useWindowResize";
import './Landing-page-new.scss';
import Lan from '../../../assets/images/new/lan.png'
import ExperieceSearchBar from "src/components/layout/experieceSearchBar";
import LnadingSearchBar from "src/components/layout/landingSearchBar";
import Finger from '../../../assets/images/new/finger.png'

const LandingPageNew = () => {

  const UserImg = "https://i.ibb.co/kK26pnm/image1.png";
  const image = "https://i.ibb.co/bKgVDhB/image4.jpg";
  const rightBlogImg = "https://i.ibb.co/7vvkfJs/image21.png";
  const profileImg = "https://i.ibb.co/kK26pnm/image1.png";
  const { dimensions } = useWindowResize();

  const GetLocation = () => {
    let location = useLocation();
    return location;
  };

  const [likes, setLikes] = useState(10);
  const [animationLikes, setAnimationLikes] = useState('initial');
  const [likes2, setLikes2] = useState(572);
  const [animationLikes2, setAnimationLikes2] = useState('initial');
  const [likes3, setLikes3] = useState(100);
  const [animationLikes3, setAnimationLikes3] = useState('initial');

  const handleLikes = () => {
    // 1. Old number goes up
    setTimeout(() => setAnimationLikes('goUp'), 7000);
    // 2. Incrementing the counter  
    setTimeout(() => setLikes(likes + 1), 7000);
    // 3. New number waits down  
    setTimeout(() => setAnimationLikes('waitDown'), 7000);
    // 4. New number stays in the middle
    setTimeout(() => setAnimationLikes('initial'), 7200);


    setTimeout(() => setAnimationLikes2('goUp'), 7200);
    // 2. Incrementing the counter  
    setTimeout(() => setLikes2(likes2 + 1), 7200);
    // 3. New number waits down  
    setTimeout(() => setAnimationLikes2('waitDown'), 7200);
    // 4. New number stays in the middle
    setTimeout(() => setAnimationLikes2('initial'), 7400);


    setTimeout(() => setAnimationLikes3('goUp'), 7600);
    // 2. Incrementing the counter  
    setTimeout(() => setLikes3(likes3 + 1), 7600);
    // 3. New number waits down  
    setTimeout(() => setAnimationLikes3('waitDown'), 7600);
    // 4. New number stays in the middle
    setTimeout(() => setAnimationLikes3('initial'), 7800);

  }

  useEffect(() => {
    handleLikes()
  }, [likes])


  return (
    <>
      <div className="container">
        {dimensions.width > 1024 && GetLocation().pathname === "/landing-page-new" && (
          <Fragment>
            <div style={{ visibility: "visible", paddingBottom: 10 }}>
              <LnadingSearchBar
                width={dimensions.width}
              />
            </div>
          </Fragment>
        )}
       
          <CarouselNew />
          {/* <img src={SectionBgImg} height={100} width={100} /> */}
      </div>
      <div className="container">
        <div className="section-wrapper">
          <div className="section-wrapper--heading">
            <h1 className="section-wrapper--heading-header">
              no limits bei musingoo
            </h1>
            <p className="section-wrapper--heading-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus exercitationem veniam distinctio perspiciatis illum
              culpa ad iste minima quod ipsam atque blanditiis.
            </p>
          </div>
          <Grid container spacing={6} alignItems="center">
            <img className="lan-img" src={Lan} />
          </Grid>
        </div>
      </div>
      <div className="container mr-5 mr-md-0 ml-0 ml-md-5 pl-5">
        <div className="wrapper">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xl={7} lg={7} md={7} sm={12}>
              <h1 className="wrapper-heading">Your Profile</h1>
              <p className="wrapper-title">in the music scene</p>
              <div>
                <p className="wrapper-sub-title">
                  Ein Musingoo Profil ist dein Basic footprint in der
                  Musikscene. Ob du dich mit anderen Musikern vernetzen willst,
                  deine Reichweite in der Szene aufbauen willst, ein Instrument
                  oder ein Konzert anbieten willst, um geld zu verdienen Sei
                  Teil der weltweit größten Community von Musikern. Registriere
                  dich in nur einem Schritt.{" "}
                </p>
              </div>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12}>
              <Grid
                container
                alignItems="center"
                className="wrapper--profile-desc ml-2"
              >
                <Grid item xl={6} lg={6} md={6} sm={6}>
                  <div className="wrapper--profile-desc-img" style={{
                    position: 'relative'
                  }}>
                    <img src={profileImg} className="wrapper--profile-desc-img" />
                    <img src={Finger} className="wrapper--profile-desc-img2" />
                  </div>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6}>
                  <div className="mt-4 mt-md-0 ml-4 ml-lg-0"  style={{
                    height: 200
                  }}>
                    <TypeWriterEffect
                      textStyle={{
                        fontSize: 28, marginBottom: 20, fontWight: 'bold',
                        fontFamily: 'Helvetica, sans-serif'
                      }}
                      startDelay={100}
                      cursorColor="white"
                      text="Jack Adams"
                      typeSpeed={400}
                    />
                    <TypeWriterEffect
                      textStyle={{
                        fontSize: 16, marginBottom: 20, fontWight: 'bold',
                        fontFamily: 'Helvetica, sans-serif'
                      }}
                      startDelay={4500}
                      cursorColor="white"
                      text="Hobby musician"
                      typeSpeed={400}
                    />
                    <TypeWriterEffect
                      textStyle={{
                        fontSize: 16, marginBottom: 20, fontWight: 'bold',
                        fontFamily: 'Helvetica, sans-serif'
                      }}
                      startDelay={10000}
                      cursorColor="white"
                      text="Bandmitglied bei KISS"
                      typeSpeed={400}
                    />
                    <TypeWriterEffect
                      textStyle={{
                        fontSize: 16, marginBottom: 20, fontWight: 'bold',
                        fontFamily: 'Helvetica, sans-serif'
                      }}
                      startDelay={19000}
                      cursorColor="white"
                      text="Musiker seit 2016"
                      typeSpeed={400}
                    />
                  </div>
                  <Grid container  style={{ marginTop: "1.875rem" }}>
                    <Grid className="grid" xl={4} lg={4} md={4} sm={4}>
                      {/* <h1 style={{ textAlign: "center" }}>
                        <CountUp
                          start={1}
                          duration={7}
                          className={`${animationLikes} ""`}
                          end={10}
                          onStart={handleLikes}
                        />
                      </h1> */}

                      <div className='Grid'>
                        <div className='wrapper--profile-desc-counter-title'>
                          <span className={animationLikes}>{likes}</span>
                        </div>
                        <p className="wrapper--profile-desc-counter-desc">
                          experiences
                        </p>
                      </div>
                    </Grid>
                    <Grid xl={4} lg={4} md={4} sm={4}>
                      <div className='Grid'>
                        <div className='wrapper--profile-desc-counter-title'>
                          <span className={animationLikes2}>{likes2}</span>
                        </div>
                        <p className="wrapper--profile-desc-counter-desc">
                          Follower
                        </p>
                      </div>
                    </Grid>
                    <Grid xl={4} lg={4} md={4} sm={4}>
                      <div className='Grid'>
                        <div className='wrapper--profile-desc-counter-title'>
                          <span className={animationLikes3}>{likes3}</span>
                        </div>
                        <p className="wrapper--profile-desc-counter-desc">
                          Following
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
export default LandingPageNew;
