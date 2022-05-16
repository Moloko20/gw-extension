import React from 'react'
import { MapContainer, Marker, Popup, CircleMarker } from 'react-leaflet'

// import { toSec } from '@foxglove/rostime'

import { Layers } from 'components/Layers'

import { MapPanelMessage } from 'types/MapPanelMessage'

import './index.css'

type MapProps = {
    messages: MapPanelMessage[]
}

export function Map({ messages }: MapProps): JSX.Element {
    console.log('none', Marker, Popup, messages)

    // React.useEffect(() => {
    //     // if (!currentMap || previewTime == undefined) {
    //     //     return
    //     // }

    //     // get the point occuring most recently before preview time but not after preview time
    //     const prevNavMessages = messages.filter(message => toSec(message.receiveTime) < previewTime)
    //     const event = minBy(prevNavMessages, message => previewTime - toSec(message.receiveTime))
    //     if (!event) {
    //         return
    //     }

    //     const topicLayer = topicLayers.get(event.topic)

    //     const marker = new CircleMarker([event.message.latitude, event.message.longitude], {
    //         radius: POINT_MARKER_RADIUS,
    //         color: topicLayer ? darkColor(topicLayer.baseColor) : undefined,
    //         stroke: false,
    //         fillOpacity: 1,
    //         interactive: false,
    //     })

    //     marker.addTo(currentMap)
    //     return () => {
    //         marker.remove()
    //     }
    // }, [allNavMessages, currentMap, previewTime, topicLayers])

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
