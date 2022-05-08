import React from 'react'

import { MapContainer, Marker, Popup, CircleMarker } from 'react-leaflet'

import { Layers } from 'components/Layers'

import './index.css'

export function Map(): JSX.Element {
    console.log('none', Marker, Popup)

    return (
        <MapContainer
            center={[55.7522, 37.6156]}
            zoom={5}
            scrollWheelZoom={true}
            zoomControl={true}
        >
            <Layers />
            {/* <Marker position={[55.7522, 37.6156]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            <CircleMarker center={[55.7522, 37.6156]} radius={2}>
                <Popup>some data</Popup>
            </CircleMarker>
        </MapContainer>
    )
}
