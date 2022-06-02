import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react'
import { MapContainer, Popup, CircleMarker } from 'react-leaflet'

import { toSec } from '@foxglove/rostime'
import { PanelExtensionContext, MessageEvent } from '@foxglove/studio'

import { Layers } from 'components/Layers'

import { Point, NavSatFixMsg } from 'types/MapPanelMessage'

// import {
//     Map as LeafMap,
//     TileLayer,
//     LatLngBounds,
//     FeatureGroup,
//     LayerGroup,
//     geoJSON,
//     Layer,
// } from 'leaflet'

import './index.css'

type CustomCircleMarkeProps = {
    context: PanelExtensionContext
    message: MessageEvent<NavSatFixMsg>
    popupContent?: ReactNode
}

const CustomCircleMarker: FC<CustomCircleMarkeProps> = ({ popupContent, context, message }) => {
    const onHover = useCallback(
        (message?: MessageEvent<NavSatFixMsg>) => {
            context.setPreviewTime(message == undefined ? undefined : toSec(message.receiveTime))
        },
        [context],
    )

    const onClick = useCallback(
        (messageEvent: MessageEvent<unknown>) => {
            context.seekPlayback?.(toSec(messageEvent.receiveTime))
        },
        [context],
    )

    const innerHandlers = useMemo(
        () => ({
            click() {
                onClick(message)
            },
            mouseover() {
                onHover(message)
            },
            mouseout() {
                onHover(undefined)
            },
        }),
        [message],
    )

    return (
        <CircleMarker
            eventHandlers={innerHandlers}
            center={[message.message.latitude, message.message.longitude]}
            radius={2}
        >
            <Popup>{popupContent}</Popup>
        </CircleMarker>
    )
}

type MapProps = {
    centerMap: Point
    messages: MessageEvent<NavSatFixMsg>[]
    context: PanelExtensionContext
    previewTime?: number | undefined
}

export const Map: FC<MapProps> = ({
    messages,
    centerMap = { lat: 55.7522, lon: 37.6156 },
    context,
}) => {
    // const [filteredMessages, setFilteredMessages] = useState<MapPanelMessage[]>()

    const [text, setText] = useState('')

    // const mapContainerRef = useRef<HTMLDivElement>()

    // const center = filteredMessages?[0].message.  ?  :[55.7522, 37.6156]

    // const map = useMapEvents({
    //     click(),
    // })

    const innerHandlers = useMemo(
        () => ({
            click() {
                setText('some click')
            },
        }),
        [],
    )

    // useEffect(() => {
    //     if (previewTime == undefined) {
    //         return
    //     }

    //     // get the point occuring most recently before preview time but not after preview time
    //     const filteredMessagesArr = messages?.filter(
    //         message => toSec(message.receiveTime) < previewTime,
    //     )

    //     setFilteredMessages(filteredMessagesArr)
    // }, [filteredMessages, previewTime])

    return (
        <>
            <MapContainer
                center={[centerMap.lat, centerMap.lon]}
                zoom={5}
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <Layers />

                {/* {filteredMessages?.map(item => (
                    <CustomCircleMarker
                        key={item.message.latitude}
                        center={[item.message.latitude, item.message.longitude]}
                        context={context}
                    />
                ))} */}

                {messages?.map(item => (
                    <CustomCircleMarker
                        key={item.message.latitude}
                        message={item}
                        context={context}
                    />
                ))}

                <CircleMarker eventHandlers={innerHandlers} center={[55.7522, 37.6156]} radius={2}>
                    <Popup>some data</Popup>
                </CircleMarker>
            </MapContainer>

            {text}
        </>
    )
}
