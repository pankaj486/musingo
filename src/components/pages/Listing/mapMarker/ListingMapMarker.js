import React from 'react'
import desktopHome from '../../../../assets/images/desktopHome.png';
import mobileHome from '../../../../assets/images/mobileHome.png';

const ListingMapMarkerComponent = (props) => {

    const activeClass = props.isActive ? 'text-primary' : 'marker-color';
    let style = props.markerColor ? { color: props.markerColor } : null
    return (
        <div key={props.key} style={{ position: 'relative' }}>
            {
                !props.isHome && !props.bookingClassLocation ?
                    (
                        <i className={`fa fa-4x fa-map-marker + ${activeClass}`} style={style}></i>
                    ) : (!props.isHome && props.bookingClassLocation) && (
                        <div className="" style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            //   border: "1px solid #bcbcbc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            transform: props.hover ? 'scale(1.2)' : ''
                        }}
                        >
                            <img className="" style={{
                                width: "32px",
                                height: "auto"
                            }} src={props.marker} alt="location" />
                        </div>
                    )
            }
            {
                (props.width > 600 && props.isHome) &&
                <img src={desktopHome} alt="home" width="45px" className={`${activeClass}`} style={{
                    transform: (props.hover && props.bookingClassLocation) ? 'scale(1.2)' : ''
                }}/>
            }
            {
                (props.width <= 600 && props.isHome) &&
                <img src={mobileHome} alt="home" width="45px" className={`${activeClass}`} style={{
                    transform: (props.hover && props.bookingClassLocation) ? 'scale(1.2)' : ''
                }} />
            }
            
        </div>

    )
}

export default ListingMapMarkerComponent;