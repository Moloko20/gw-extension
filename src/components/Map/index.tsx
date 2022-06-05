import React, { FC, ReactNode, useCallback, useMemo, useState, useEffect, memo } from 'react'
import { MapContainer, Popup, CircleMarker, useMap } from 'react-leaflet'

import { toSec } from '@foxglove/rostime'
import { PanelExtensionContext, MessageEvent } from '@foxglove/studio'

import { Layers } from 'components/Layers'

import { Point, NavSatFixMsg } from 'types/MapPanelMessage'
import { Config } from 'types/Config'

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

type ZoomProps = {
    context: PanelExtensionContext
    config: Config
}

const ZoomComponent: FC<ZoomProps> = ({ context, config }) => {
    const map = useMap()

    useEffect(() => {
        const zoomChange = () => {
            context.saveState({
                zoomLevel: map.getZoom(),
            })
        }

        map.on('zoom', zoomChange)
        return () => {
            map.off('zoom', zoomChange)
        }
    }, [context, map])

    useEffect(() => {
        context.saveState(config)
    }, [config])

    return null
}

const Zoom = memo(ZoomComponent)

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
    const [config] = useState<Config>(() => {
        const initialConfig = context.initialState as Partial<Config>

        initialConfig.disabledTopics = initialConfig.disabledTopics ?? []
        initialConfig.layer = initialConfig.layer ?? 'Схема'
        initialConfig.customTileUrl = initialConfig.customTileUrl ?? ''
        initialConfig.zoomLevel = initialConfig.zoomLevel ?? 7
        return initialConfig as Config
    })

    return (
        <>
            <MapContainer
                center={[centerMap.lat, centerMap.lon]}
                zoom={config.zoomLevel}
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <Layers context={context} config={config} />

                {messages?.map(item => (
                    <CustomCircleMarker
                        key={item.message.latitude}
                        message={item}
                        context={context}
                    />
                ))}

                <Zoom context={context} config={config} />
            </MapContainer>
        </>
    )
}
