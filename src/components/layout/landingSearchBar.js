import React, { useState, useEffect } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import './navbar.scss';
import SearchIcon from '../../assets/images/search.png';
import useWindowResize from '../../custom-hooks/useWindowResize';
import UntFilter from '../../assets/images/coachOnboard.png'
import InstrumentFilter from '../../assets/images/Instruments.jpg'
import JobsFilter from '../../assets/images/Jobs.jpg'
import KonFilter from '../../assets/images/Concerts.jpg'
import CancelIcon from '../../assets/images/cancel-icon.png'
import './experieceSearchBar.scss';
import { Fragment } from 'react';
import Location from '../../assets/images/location.png';
import ReactSelect from 'react-select'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { instrumentService } from 'src/services/api';
import { useHistory } from 'react-router-dom';


const dropdownItems = [
    { icon: UntFilter, name: 'guiter' }
]

const Months = [
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' },
    { name: 'December' }
]

const LnadingSearchBar = ({ onAddressChange, width, filterPackages, filterPackagesBySecondFilter, instruments }) => {
    const { dimensions } = useWindowResize();

    // console.log("myINstrument", instruments);

    const handleCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }

    const geoSuccess = (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const latlng = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude),
        };
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    console.log(results[0]);
                    setAddressInput(results[0].formatted_address);
                    setLat(latlng.lat);
                    setLng(latlng.lng);
                    onAddressChange({ address: results[0].formatted_address, lat: latlng.lat, lng: latlng.lng });
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        });

    }


    const geoError = (error) => {
        alert(error);
    }

    const [addressInput, setAddressInput] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [active, setActive] = useState(1);

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setAddressInput(address);
                setLat(latLng.lat);
                setLng(latLng.lng);
                onAddressChange({ address: address, lat: latLng.lat, lng: latLng.lng });

            })
            .catch(error => console.error('Error', error));
    }


    const handleChange = address => {
        setAddressInput(address);
    };
    const [filterType, setFilterType] = useState('');
    const [filterShow, setFilterShow] = useState(false);


    const handleFilterSelect = (type) => {
        // if (!showModal && modalType !== type) {
        //     setShowModal(true)
        //     setModalType(type)
        //     setTimeout(function () {
        //         setShowModal(false)
        //     }, 2300)
        // }
        filterPackages(type);
        setFilterShow(false);
        setFilterType(type)
    }
    const history = useHistory();


    const handleClick = () => {
        history.push({
            pathname: '/livestream',
        });
    }

    const setBackgroundStyle = (background) => {
        return {
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            height: '70px',
            width: '100px',
            backgroundRepeat: 'no-repeat',
            borderRadius: '15px',
            color: 'white'
        }
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [expand, setExpand] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const normalStyle = {
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto'
    }

    const filterdStyle = {
        width: '100%'
    }

    return (
        <div className="expericenceSearchBar" style={filterShow ? filterdStyle : normalStyle}>
            <div style={{ position: 'relative' }}>
                {/* && width > 1024 */}
                {(!filterShow) && <div onClick={() => setFilterShow(true)} className="searchBarOverlay">
                </div>}
                {filterShow && <div className="searchOverlay"></div>}
                <div className={filterShow ? "searchModal" : ''}>
                    {filterShow && <button className="btn btn-white" onClick={() => setFilterShow(false)}>
                        <img src={CancelIcon} alt="cancel" width="30px" />
                    </button>}
                    <div className="d-flex align-items-center justify-content-center flex-column">
                        {/* {filterShow && width > 1024 && <h4 className="text-center mb-4" style={{ marginTop: '-25px' }}>Entdecken</h4>}
                        {filterShow && width <= 1025 && <h5 className="text-center mb-4" style={{ marginTop: '-25px' }}>Wo?</h5>} */}
                        {filterShow &&
                            <>
                                <div className='row topBar'>
                                    <p onClick={() => setActive(1)} className={active == 1 ? 'barActive' : ''}>Lesson</p>
                                    <p onClick={() => setActive(2)} className={active == 2 ? 'barActive' : ''}>Concert</p>
                                    <p onClick={() => setActive(3)} className={active == 3 ? 'barActive' : ''}>Instrument</p>
                                    <p onClick={() => setActive(4)} className={active == 4 ? 'barActive' : ''}>Job</p>
                                    <p onClick={() => setActive(5)} className={active == 5 ? 'barActive' : ''}>Livestream</p>
                                </div>
                            </>
                        }
                        <div>
                            {!filterShow &&
                                <PlacesAutocomplete
                                    value={addressInput}
                                    onChange={handleChange}
                                    onSelect={handleSelect}
                                    className="mb-2">
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                    style={{ maxWidth: dimensions.width <= 1024 ? '50vw' : '', }}
                                                    {...getInputProps({
                                                        placeholder: 'Hamburg, Germany',
                                                        className: "musingoo-input searchBar",
                                                    })}
                                                />
                                                <img src={SearchIcon} className="searchIcon" alt="search" width="38px" />
                                            </div>
                                            {/* className="autocomplete-dropdown-container" */}
                                            <div className={"px-4 py-2 mb-3" + (suggestions.length > 0 ? 'bg-white' : '')} style={{ position: 'absolute', textAlign: 'left', padding: '10px', zIndex: 200000 }}>
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion, index) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div key={index}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            }
                        </div>
                        {filterShow && active == 1 &&
                            <div className="wrapper-input">
                                  <PlacesAutocomplete
                                    value={addressInput}
                                    onChange={handleChange}
                                    onSelect={handleSelect}
                                    className="mb-2">
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                onFocus={() => setExpand(true)}
                                                    style={{ maxWidth: dimensions.width <= 1024 ? '70vw' : '', }}
                                                    {...getInputProps({
                                                        placeholder:'Stadtteil oder PLZ',
                                                        className: "inputs",
                                                    })}
                                                />
                                            </div>
                                            {/* className="autocomplete-dropdown-container" */}
                                            <div className={"px-4 py-2 mb-3" + (suggestions.length > 0 ? 'bg-white' : '')} style={{ position: 'absolute', textAlign: 'left', padding: '10px', zIndex: 200000 }}>
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion, index) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div key={index}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <ReactSelect
                                    className="drop"
                                    placeholder="Was"
                                    options={instruments}
                                    formatOptionLabel={items => (
                                        <div className="item-option">
                                            <img src={items.icon} />
                                            <span>{items.name}</span>
                                        </div>
                                    )}
                                />
                                <div className={expand ? 'expo' : ''} onClick={() => handleFilterSelect('Unterricht')}>
                                    <img src={SearchIcon} className="searchicon" alt="search" width="38px" />
                                    {expand && <p>Suchen</p>}
                                </div>
                            </div>
                        }
                        {filterShow && active == 2 &&
                            <div className="wrapper-input">
                                <PlacesAutocomplete
                                    value={addressInput}
                                    onChange={handleChange}
                                    onSelect={handleSelect}
                                    className="mb-2">
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                onFocus={() => setExpand(true)}
                                                    style={{ maxWidth: dimensions.width <= 1024 ? '70vw' : '', }}
                                                    {...getInputProps({
                                                        placeholder:'Stadtteil oder PLZ',
                                                        className: "inputs",
                                                    })}
                                                />
                                            </div>
                                            {/* className="autocomplete-dropdown-container" */}
                                            <div className={"px-4 py-2 mb-3" + (suggestions.length > 0 ? 'bg-white' : '')} style={{ position: 'absolute', textAlign: 'left', padding: '10px', zIndex: 200000 }}>
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion, index) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div key={index}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <ReactSelect
                                    className="drop"
                                    placeholder="Monat"
                                    options={Months}
                                    formatOptionLabel={items => (
                                        <div className="item-option">
                                            <span>{items.name}</span>
                                        </div>
                                    )}
                                />
                                <div className={expand ? 'expo' : ''} onClick={() => handleFilterSelect('Konzerte')}>
                                    <img src={SearchIcon} className="searchicon" alt="search" width="38px" />
                                    {expand && <p>Suchen</p>}
                                </div>
                            </div>
                        }
                        {filterShow && active == 3 &&
                            <div className="wrapper-input">
                                <PlacesAutocomplete
                                    value={addressInput}
                                    onChange={handleChange}
                                    onSelect={handleSelect}
                                    className="mb-2">
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                onFocus={() => setExpand(true)}
                                                    style={{ maxWidth: dimensions.width <= 1024 ? '70vw' : '', }}
                                                    {...getInputProps({
                                                        placeholder:'Stadtteil oder PLZ',
                                                        className: "inputs",
                                                    })}
                                                />
                                            </div>
                                            {/* className="autocomplete-dropdown-container" */}
                                            <div className={"px-4 py-2 mb-3" + (suggestions.length > 0 ? 'bg-white' : '')} style={{ position: 'absolute', textAlign: 'left', padding: '10px', zIndex: 200000 }}>
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion, index) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div key={index}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <ReactSelect
                                    className="drop"
                                    placeholder="Instrument"
                                    options={instruments}
                                    formatOptionLabel={items => (
                                        <div className="item-option">
                                            <img src={items.icon} />
                                            <span>{items.name}</span>
                                        </div>
                                    )}
                                />
                                <div className={expand ? 'expo' : ''} onClick={() => handleFilterSelect('Instrumente')}>
                                    <img src={SearchIcon} className="searchicon" alt="search" width="38px" />
                                    {expand && <p>Suchen</p>}
                                </div>
                            </div>
                        }
                        {filterShow && active == 4 &&
                            <div className={active == 4 ? "wrapper-inputs" : "wrapper-input"}>
                               <PlacesAutocomplete
                                    value={addressInput}
                                    onChange={handleChange}
                                    onSelect={handleSelect}
                                    className="mb-2">
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                onFocus={() => setExpand(true)}
                                                    style={{ maxWidth: dimensions.width <= 1024 ? '70vw' : '', }}
                                                    {...getInputProps({
                                                        placeholder:'Stadtteil oder PLZ',
                                                        className: "inputs",
                                                    })}
                                                />
                                            </div>
                                            {/* className="autocomplete-dropdown-container" */}
                                            <div className={"px-4 py-2 mb-3" + (suggestions.length > 0 ? 'bg-white' : '')} style={{ position: 'absolute', textAlign: 'left', padding: '10px', zIndex: 200000 }}>
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion, index) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div key={index}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <div className={expand ? 'expo' : ''} onClick={() => handleFilterSelect('Jobs')}>
                                    <img src={SearchIcon} className="searchicon" alt="search" width="38px" />
                                    {expand && <p>Suchen</p>}
                                </div>
                            </div>
                        }
                        {filterShow && active == 5 &&
                            <div className={'expos'} onClick={() => handleFilterSelect('live')}>
                                {/* <img src={SearchIcon} className="searchicon" alt="search" width="38px" /> */}
                                <p>Coming Soon</p>
                            </div>
                        }
                        {/* {filterShow && width < 1025 &&
                            <div onClick={handleCurrentLocation} className="d-flex align-items-center mt-4 defBorder px-4 py-2"
                                style={{ width: "70vw" }}>
                                <i className="fa fa-map-marker fa-2x text-primary mr-2" aria-hidden="true"></i>
                                <span>Standort verwenden</span>
                            </div>
                        } */}
                        {/* {filterShow &&
                            <Fragment>
                                {width < 1025 && <h5 className="mt-5">Was?</h5>}
                                <div className="d-flex my-4 flex-wrap">
                                    <div className="d-flex flex-column flex-sm-row">
                                        <div style={setBackgroundStyle(UntFilter)} className="d-flex justify-content-center mx-1 mb-2 cursor-pointer align-items-center mainFilter" onClick={() => handleFilterSelect('Unterricht')}>
                                            <p className="mb-0 font-weight-bold">Unterricht</p>
                                        </div>
                                        <div style={setBackgroundStyle(InstrumentFilter)} className="d-flex justify-content-center mx-1 mb-2 cursor-pointer align-items-center mainFilter" onClick={() => handleFilterSelect('Instrumente')}>
                                            <p className="mb-0 font-weight-bold">Instrumente</p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column flex-sm-row">
                                        <div style={setBackgroundStyle(JobsFilter)} className="d-flex justify-content-center mx-1 mb-2 cursor-pointer align-items-center mainFilter" onClick={() => handleFilterSelect('Jobs')}>
                                            <p className="mb-0 font-weight-bold">Jobs</p>
                                        </div>
                                        <div style={setBackgroundStyle(KonFilter)} className="d-flex justify-content-center mx-1 mb-2 cursor-pointer  align-items-center mainFilter" onClick={() => handleFilterSelect('Konzerte')}>
                                            <p className="mb-0 font-weight-bold">Konzerte</p>
                                        </div>
                                    </div>
                                </div>
                                {width < 1025 && <button className="btn btn-primary text-white px-5 mt-5 py-2">Suchen</button>}
                            </Fragment>
                        } */}

                    </div>
                </div>
            </div >
        </div>
    )
}

export default LnadingSearchBar
