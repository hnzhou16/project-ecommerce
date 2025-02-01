/* global google */
import {useEffect, useRef, useState} from "react";
import {useJsApiLoader} from '@react-google-maps/api'
import {mapsAPIKey} from "../../redux/utils/helper";
import {Library} from "@googlemaps/js-api-loader";

const libs: Library[] = ["core", "maps", "places", "marker"]

export const AddressAutoCompleteWithMap = () => {
    const [map, setMap] = useState(null)
    const [autoComplete, setAutoComplete] = useState(null)
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: mapsAPIKey,
        libraries: libs
    })
    const mapRef = useRef()
    const placeAutoCompleteRef = useRef()

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            const mapOptions = {
                center: {
                    lat: 47.610365754306635,
                    lng: -122.20174575643883
                },
                zoom: 10,
                mapId: "MY-MAP"
            }


            // define the bounds with (SW corner, NE corner)
            const city = new google.maps.LatLngBounds(
                new google.maps.LatLng({lat: 48, lng: -89}),
                new google.maps.LatLng({lat: 54, lng: -82})
            )

            // 'google' is async, can not recognize in static
            // MUST add /* global google */ at the first line
            const autoComplete = new google.maps.places.Autocomplete(placeAutoCompleteRef.current)
            const map = new google.maps.Map(mapRef.current, mapOptions)
            setAutoComplete(autoComplete)
            setMap(map)

        }
    }, [isLoaded]);

    return <>
        <div>
            <input ref={placeAutoCompleteRef}/>
            {isLoaded
                ? <div style={{height: '600px'}} ref={mapRef}></div>
                : <p>Loading...</p>}
        </div>
    </>
}