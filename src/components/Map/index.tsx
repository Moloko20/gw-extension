import React from 'react'
import { MapContainer, Marker, Popup, CircleMarker } from 'react-leaflet'

import { toSec } from '@foxglove/rostime'

import { Layers } from 'components/Layers'

import { MapPanelMessage } from 'types/MapPanelMessage'

import './index.css'

type MapProps = {
    messages?: MapPanelMessage[]
    previewTime?: number
}

export function Map({ messages, previewTime }: MapProps): JSX.Element {
    console.log('none', Marker, Popup, messages)

    const [filteredMessages, setFilteredMessages] = React.useState<MapPanelMessage[]>()

    // const center = filteredMessages?[0].message.  ?  :[55.7522, 37.6156]

    React.useEffect(() => {
        if (previewTime == undefined) {
            return
        }

        // get the point occuring most recently before preview time but not after preview time
        const filteredMessagesArr = messages?.filter(
            message => toSec(message.receiveTime) < previewTime,
        )

        setFilteredMessages(filteredMessagesArr)

        // const event = minBy(prevNavMessages, message => previewTime - toSec(message.receiveTime))
        // if (!event) {
        //     return
        // }

        // const topicLayer = topicLayers.get(event.topic)

        // const marker = new CircleMarker([event.message.latitude, event.message.longitude], {
        //     radius: POINT_MARKER_RADIUS,
        //     color: topicLayer ? darkColor(topicLayer.baseColor) : undefined,
        //     stroke: false,
        //     fillOpacity: 1,
        //     interactive: false,
        // })

        // marker.addTo(currentMap)
        // return () => {
        //     marker.remove()
        // }
    }, [filteredMessages, previewTime])

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

            {filteredMessages?.map(item => {
                return (
                    <CircleMarker
                        center={[item.message.latitude, item.message.longitude]}
                        radius={2}
                    >
                        <Popup>{item.receiveTime}</Popup>
                    </CircleMarker>
                )
            })}

            <CircleMarker center={[55.7522, 37.6156]} radius={2}>
                <Popup>some data</Popup>
            </CircleMarker>
        </MapContainer>
    )
}
