import React, { ReactNode, useCallback, useMemo } from 'react'
import { Popup, CircleMarker as LeafletCircleMarker } from 'react-leaflet'

import { toSec } from '@foxglove/rostime'
import { PanelExtensionContext, MessageEvent } from '@foxglove/studio'

import { NavSatFixMsg } from 'types'

type CircleMarkeProps = {
    context: PanelExtensionContext
    message: MessageEvent<NavSatFixMsg>
    popupContent?: ReactNode
}

export const CircleMarker: React.FC<CircleMarkeProps> = ({ popupContent, context, message }) => {
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
        <LeafletCircleMarker
            eventHandlers={innerHandlers}
            center={[message.message.latitude, message.message.longitude]}
            radius={2}
        >
            <Popup>{popupContent}</Popup>
        </LeafletCircleMarker>
    )
}
