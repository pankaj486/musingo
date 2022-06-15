import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

import desktopHome from "../../../../../assets/images/desktopHome.png";
import mobileHome from "../../../../../assets/images/mobileHome.png";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

// import ListingMapMarkerComponent from "../../../Listing/mapMarker/ListingMapMarker";
import WeiterCta from "../../../../weiterCta/weiterCta";

import {
  PrivateLessonCreate,
  PrivateLocation,
} from "../../../../../generated/apiFetchers";

import "./LessonLocationForm.scss";
import { Alert } from "@material-ui/lab";
import { useActions } from "src/hooks/use-actions"


export type LessonLocationFormProps = {
  locations?: PrivateLocation[];
  createLocation: (location: Pick<PrivateLocation, "name" | "address">) => void;
  deleteLocation: (id:string) => void;
  onChange: (newData: Partial<PrivateLessonCreate>) => void;
  onSubmit: () => void;
};

export const LessonLocationForm: React.FC<LessonLocationFormProps> = ({
  locations,
  createLocation,
  deleteLocation,
  onChange,
  onSubmit,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const [selectedLocations, setSelectedLocations] = useState<PrivateLocation[]>(
    []
  );


  const [error, setError] = useState("");

  const { lessonLocation } = useActions();


  const handleSubmit = () => {
    if (selectedLocations.length > 0) {
      onSubmit();
    } else {
      setError("at least one location is required");
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  const [map, setMap] = React.useState<any>(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const center = locations &&
    locations.length > 0 && {
    lat: locations[0].coordinates.coordinates?.[1] || 0,
    lng: locations[0].coordinates.coordinates?.[0] || 0,
  };

  // console.log("center", center);
  // console.log("MajorLocations", locations)

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const handleDropdownValue = (item: string) => {
    setDropdownValue(item);
  };

  const addLocation = () => {

    if (addressInput === "" || dropdownValue === "") {
      return;
    }

    createLocation({
      name: dropdownValue,
      address: addressInput,
    });
  };




  const toggleSelection = async (location: PrivateLocation) => {
    let newLocations: PrivateLocation[];
    if (selectedLocations.some((l) => l.uid === location.uid)) {
      newLocations = selectedLocations.filter((l) => l !== location);
    } else {
      newLocations = selectedLocations.concat(location);
    }
    setSelectedLocations(newLocations);
    onChange({
      locations: newLocations.map((value) => value.uid),

    });
    // console.log("newLocations", newLocations);
  };



  const handleDelete = async (location: PrivateLocation) => {

    let newLocations: PrivateLocation[];
    if (selectedLocations.some((l) => l.uid === location.uid)) {
      newLocations = selectedLocations.filter((l) => l !== location);
    } else {
      newLocations = selectedLocations.concat(location);
    }
    onChange({
      locations: newLocations.map((value) => value.uid),
    });

    deleteLocation(newLocations[0].uid);

  }


  useEffect(() => {
    lessonLocation({
      addressInput: addressInput,
      dropdownValue: dropdownValue
    });
  }, [addressInput, dropdownValue])


  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();

      for (const location of locations ? locations : []) {
        bounds.extend({
          lat: location.coordinates.coordinates?.[1] || 0,
          lng: location.coordinates.coordinates?.[0] || 0,
        });
      }

      map.fitBounds(bounds);
    }
  }, [map, locations]);

  // console.log("locationsCoordinates", locations);

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setAddressInput(address);
      })
      .catch((error) => console.error("Error", error));
  };

  const handleChange = (address: string) => {
    setAddressInput(address);
  };

  return (
    <div className="classes__lesson-location">
      <h1 className="lesson-location--header">
        Wo findet der Unterricht statt
      </h1>
      <p className="lesson-location--details">
        Du kannst deinen Unterricht bei dir zu Hause geben oder in einem
        Proberaum oder auch <br />
        beim Schüler. Gebe die Orte an, an denen der Unterricht stattfinden
        wird.
      </p>

      

      <div
        className="lesson-location--google-map"
        style={{
          width: "800px",
          height: "450px",
        }}
      >
        {center && isLoaded ? (
          <GoogleMap
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              fullscreenControl: false,
              zoomControl: true,
            }}
            mapContainerStyle={{ height: "100%" }}
          >
            {locations?.map((location, index) => {
              const isSelected = selectedLocations.some(
                (l) => l.uid === location.uid
              );
              return (
                <Marker
                  icon={{
                    url: isSelected ? desktopHome : mobileHome,
                    scaledSize: new window.google.maps.Size(25, 25),
                  }}
                  key={index}
                  position={{
                    lat: location.coordinates.coordinates?.[1] || 0,
                    lng: location.coordinates.coordinates?.[0] || 0,
                  }}
                  onClick={() => toggleSelection(location)}
                />
              );
              /*<ListingMapMarkerComponent
                  width={width}
                  key={index}
                  lat={place.coordinates.coordinates?.[1] || 0}
                  lng={place.coordinates.coordinates?.[0] || 0}
                  isActive={true}
                  isHome={false}
                  markerColor={"#4ad9ca"}
                />*/
            })}
          </GoogleMap>
        ): (<GoogleMap zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            fullscreenControl: false,
            zoomControl: true,
          }}
          mapContainerStyle={{ height: "100%" }}>
          THis is content
        </GoogleMap>)}
      </div>
      {error && (
        <Alert severity="error" style={{ width: 600, margin: "auto" }}>
          {error}
        </Alert>
      )}
      <div className="lesson-location--address-selector">
        <PlacesAutocomplete
          value={addressInput}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "musingoo-input",
                })}
              />
              {/* className="autocomplete-dropdown-container" */}
              <div
                className="px-4 py-2 bg-white"
                style={{
                  position: "absolute",
                  textAlign: "left",
                  padding: "10px",
                }}
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={index}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggleDropdown}
          className="ml-2"
        >
          <DropdownToggle
            caret
            className="bg-white px-5 text-dark btn-outline-dark"
          >
            {dropdownValue ? dropdownValue : "Art der Location"}
          </DropdownToggle>
          <DropdownMenu>
            {["Zu Hause", "Proberaum"].map((item, index) => {
              return (
                <DropdownItem
                  className="mt-2"
                  value={dropdownValue}
                  key={index}
                  onClick={() => handleDropdownValue(item)}
                >
                  {item}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <div
          className="lesson-location-add-cta ml-2 d-flex justify-content-center align-items-center"
          onClick={addLocation}
        >
          <FaPlus />
        </div>
      </div>
      <div className="lesson-location--locations">
        {locations?.length ? <p>Locations</p> : null}
        {locations?.map((location, index) => {
          const isSelected = selectedLocations.some(
            (l) => l.uid === location.uid
          );
          return (
            <div className="location" key={index}>
              <div className="location__title">
                <i className={`fa fa-4x fa-map-marker`} />
                {location.name}
              </div>
              <div className="location__address">
                <span>{location.address}</span>
              </div>
              <div
                className="location__cancel"
                style={{
                  backgroundColor: !isSelected ? "green" : "red",
                }}
                onClick={() => toggleSelection(location)}
              >
                {!isSelected ? <FaPlus /> : <FaMinus />}
              </div>
              <div
                className="location__cancel"
                style={{
                  backgroundColor: "red",
                }}
                onClick={() => handleDelete(location)}
              >
                <FaTrash />
              </div>
            </div>
          );
        })}
      </div>
      <WeiterCta nextStep={handleSubmit} />
    </div>
  );
};
