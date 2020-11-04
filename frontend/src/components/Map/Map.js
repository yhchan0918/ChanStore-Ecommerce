import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useEffect } from 'react';
import { getCurrentAddress } from '../../utils/getCurrentAddress.js';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100',
  height: '400px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map({ setForm }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });
  const [map, setMap] = useState({
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setMap({
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          const {
            address,
            city,
            postalCode,
            country,
          } = await getCurrentAddress(
            position.coords.latitude,
            position.coords.longitude
          );
          setForm({ address, city, postalCode, country });
        },
        function error() {
          alert('Please enable your GPS position feature.');
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      alert('Geolocation API is not supported in your browser.');
    }
  }, []);

  // usecallback allow you to always retain the value unless the dependency in array change
  const handleMarkerDragEnd = useCallback(
    async (event) => {
      setMap({
        ...map,
        markerPosition: { lat: event.latLng.lat(), lng: event.latLng.lng() },
      });
      const { address, city, postalCode, country } = await getCurrentAddress(
        map.markerPosition.lat,
        map.markerPosition.lng
      );
      setForm({ address, city, postalCode, country });
    },
    [setForm, map]
  );

  // useRef is for retain state without rerender
  const mapRef = useRef();
  const onMapload = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps...';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={map.mapPosition}
        options={options}
        onLoad={onMapload}
      >
        <Marker
          draggable={true}
          position={{
            lat: map.markerPosition.lat,
            lng: map.markerPosition.lng,
          }}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
}
