import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line
import mapboxgl from "!mapbox-gl";
import FontawesomeMarker from 'mapbox-gl-fontawesome-markers'

import { markerAttributes } from './Marker.js'
import { routeLineLayer } from "./assets/data/layers.js";
// eslint-disable-next-line
import FakeNavigator from "./util/fake-navigator.js";

const Map = ({ setShowModal, isMobile, routeGeoJson, pointsGeoJson, bounds }) => {
    const [mapState, setMapState] = useState('FREE')
    const [userLocation, setUserLocation] = useState()
    const [isFullscreen, setIsFullscreen] = useState(false)

    const mapContainer = useRef(null);
    const fullscreenContainer = useRef(null);
    const mapRef = useRef(null);
    // closure issues prevent us from accessing state in some callbacks, so use refs to make sure we can get them
    const mapStateRef = useRef();
    const userLocationRef = useRef();

    mapStateRef.current = mapState;
    userLocationRef.current = userLocation

    const handleLocationButtonClick = () => {
        if (mapState === 'FREE') {
            setMapState('CENTER')
            flyToCenter()
        }
    }

    const flyToCenter = () => {
        mapRef.current.flyTo({
            center: userLocationRef.current,
            zoom: 16,
            duration: 1000,
            pitch: 0
        }, { // add eventData so we can distinguish programmatic camera controls from user interactions
            source: 'computer'
        })
    }

    const handlePositionSuccess = (position) => {
        const { longitude, latitude } = position.coords
        setUserLocation([longitude, latitude])

        // if we are in CENTER mode, follow the user on each position update
        if (mapStateRef.current === 'CENTER') {
            flyToCenter()
        }
    }

    const handleUserInteraction = (e) => {
        // do nothing if the camera change came from the code
        if (e.source) return
        // go back to FREE mode if the user interacts with the map
        if (mapStateRef.current === 'CENTER') {
            setMapState('FREE')
        }
    }

    const handleFullscreenButtonClick = () => {
        const container = fullscreenContainer.current;
        if (!container) return;

        const doc = document;
        const inFullscreen = doc.fullscreenElement || doc.webkitFullscreenElement;

        if (inFullscreen) {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
            return;
        }

        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        }
    }

    useEffect(() => {
        const syncFullscreenState = () => {
            const doc = document;
            setIsFullscreen(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
        };

        document.addEventListener('fullscreenchange', syncFullscreenState);
        document.addEventListener('webkitfullscreenchange', syncFullscreenState);

        return () => {
            document.removeEventListener('fullscreenchange', syncFullscreenState);
            document.removeEventListener('webkitfullscreenchange', syncFullscreenState);
        };
    }, []);

    // initialize the map
    useEffect(() => {
        if (mapRef.current) return; // initialize map only once
        if (!routeGeoJson || !pointsGeoJson || !bounds) return;

        mapboxgl.accessToken = 'pk.eyJ1Ijoic2hvcmV3YWxrZXIiLCJhIjoiY2xjdjd3NDNvMGZ4dDNyb2V6M3lod25sMSJ9.xfUWxjoeyD7beoCBIvN1xQ';

        const map = mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            bounds,
            hash: true,
            pitch: 56,
            zoom: 10,
            minZoom: 7
        });

        map.addControl(new mapboxgl.NavigationControl({
            showZoom: false,
            visualizePitch: true
        }));

        class ExtendedGeolocateControl extends mapboxgl.GeolocateControl {
            _updateCamera(position) {
                // don't let the geolocate control follow the user when there is a new position received, we will do that on our own
            }
        }

        // Add geolocate control to the map.
        const geolocateControl = new ExtendedGeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true,
            // geolocation: new FakeNavigator()
        })

        map.addControl(
            geolocateControl
        );

        geolocateControl
            .on('geolocate', (position) => {
                handlePositionSuccess(position)
            });


        map.on('load', () => {
            geolocateControl.trigger()

            // Set the default atmosphere style
            map.setFog({});

            map.addSource('segments', {
                type: 'geojson',
                data: routeGeoJson
            })
  

            map.addLayer(routeLineLayer)

            const sortedPoints = pointsGeoJson.features.sort((a, b) => {
                if (a.geometry.coordinates[1] > b.geometry.coordinates[1]) {
                    return -1
                }

                if (a.geometry.coordinates[1] < b.geometry.coordinates[1]) {
                    return 1
                }

                return 0
            })

            sortedPoints.forEach(({ geometry, properties }) => {


                let popupHtml = `
      <div>      `
                if (properties.description) {
                    popupHtml += `<div>${properties.description}</div>`
                }

                popupHtml += '</div>'


                let iconClass = ''
                let color = 'black'

                const match = markerAttributes.find(d => d.type === properties.type)

                if (match) {
                    iconClass = match.iconClass
                    color = match.color
                }

                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml);
                new FontawesomeMarker({
                    icon: iconClass,
                    color
                })
                    .setLngLat(geometry.coordinates)
                    .setPopup(popup)
                    .addTo(map);
            })
        });

        map.on('click', handleUserInteraction)
        map.on('dragstart', handleUserInteraction)
        map.on('rotatestart', handleUserInteraction)
        map.on('rotatestart', handleUserInteraction)
        map.on('zoomstart', handleUserInteraction)
    });

    const locationArrowColorClass = mapState === 'CENTER' ? 'text-blue-400' : ''

    return (
        <div ref={fullscreenContainer} style={{ height: '100%', width: '100%', position: 'relative' }}>
            <div className='absolute bottom-12 right-2.5 z-10'>
            <div className=''>
                <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                    <button className="mapboxgl-ctrl-compass" type="button" aria-label="Reset bearing to north" onClick={() => {
                        setShowModal(true)
                    }}>
                        <span><i className="fa-solid fa-circle-question"></i></span>
                    </button>
                </div>
            </div>
            <div className='mt-3'>
                <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                    <button
                        className="mapboxgl-ctrl-compass"
                        type="button"
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        onClick={handleFullscreenButtonClick}
                    >
                        <span><i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i></span>
                    </button>
                </div>
            </div>
            {isMobile && (
                <div className='mt-3'>
                    <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                        <button className="mapboxgl-ctrl-compass" type="button" aria-label="Reset bearing to north" onClick={handleLocationButtonClick}>
                            <span className={`${locationArrowColorClass} -ml-0.5`}><i className="fa-solid fa-location-arrow"></i></span>
                        </button>
                    </div>
                </div>
            )}
            </div>

            <div id="map" ref={mapContainer} className="map-container" />
        </div>
    )
}

export default Map
