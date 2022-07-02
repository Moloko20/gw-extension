import React, { useState } from 'react'
import { MapContainer } from 'react-leaflet'

import { PanelExtensionContext, MessageEvent } from '@foxglove/studio'

import { Layers } from 'components/Layers'
import { Zoom } from 'components/Zoom'
import { CircleMarker } from 'components/CircleMarker'

import { Point, NavSatFixMsg, Config } from 'types'

type MapProps = {
    centerMap: Point
    messages: MessageEvent<NavSatFixMsg>[]
    context: PanelExtensionContext
    previewTime?: number | undefined
}

export const Map: React.FC<MapProps> = ({
    messages,
    centerMap = { lat: 55.7522, lon: 37.6156 },
    context,
}) => {
    const [config] = useState<Config>(() => {
        const initialConfig = context.initialState as Partial<Config>

        initialConfig.disabledTopics = initialConfig.disabledTopics ?? []
        initialConfig.layer = initialConfig.layer ?? 'Схема'
        initialConfig.zoomLevel = initialConfig.zoomLevel ?? 7

        return initialConfig as Config
    })

    return (
        <MapContainer
            center={[centerMap.lat, centerMap.lon]}
            zoom={config.zoomLevel}
            scrollWheelZoom={true}
            zoomControl={true}
        >
            <Layers context={context} config={config} />

            {messages?.map(item => (
                <CircleMarker key={item.message.latitude} message={item} context={context} />
            ))}

            <Zoom context={context} config={config} />
        </MapContainer>
    )
}
