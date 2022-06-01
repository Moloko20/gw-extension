import React, { FC, StrictMode, useState, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { PanelExtensionContext, RenderState, Topic, MessageEvent } from '@foxglove/studio'
// import { toSec } from '@foxglove/rostime'

import { partition } from 'lodash'

import { Map } from 'components/Map'

import { MapPanelMessage, Point } from 'types/MapPanelMessage'
import { FoxgloveMessages } from 'types/FoxgloveMessages'

// import L from 'leaflet'
// import LeafletRetinaIconUrl from 'leaflet/dist/images/marker-icon-2x.png'
// import LeafletIconUrl from 'leaflet/dist/images/marker-icon.png'
// import LeafletShadowIconUrl from 'leaflet/dist/images/marker-shadow.png'

// import 'leaflet/dist/leaflet.css'

// L.Marker.prototype.options.icon = L.icon({
//     iconUrl: LeafletIconUrl,
//     iconRetinaUrl: LeafletRetinaIconUrl,
//     shadowUrl: LeafletShadowIconUrl,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     tooltipAnchor: [16, -28],
//     shadowSize: [41, 41],
// })

//const destDir = path_1.join("/mnt/c/Users/Alex/.foxglove-studio/extensions", dirName);

const isGeoJSONMessage = (
    message: MessageEvent<unknown>,
): message is MessageEvent<FoxgloveMessages['foxglove.GeoJSON']> => {
    return (
        typeof message.message === 'object' &&
        message.message != undefined &&
        'geojson' in message.message
    )
}

import './index.sass'

type MyMapPanelProps = {
    context: PanelExtensionContext
}

export const MyMapPanel: FC<MyMapPanelProps> = ({ context }) => {
    const [topics, setTopics] = React.useState<readonly Topic[] | undefined>()

    const [allMapMessages, setAllMapMessages] = useState<MapPanelMessage[]>([])
    const [currentMapMessages, setCurrentMapMessages] = useState<MapPanelMessage[]>([])

    const [_allGeoMessages, allNavMessages] = useMemo(
        () => partition(allMapMessages, isGeoJSONMessage),
        [allMapMessages],
    )

    const [_currentGeoMessages, _currentNavMessages] = useMemo(
        () => partition(currentMapMessages, isGeoJSONMessage),
        [currentMapMessages],
    )

    const [messages, setMessages] = React.useState<readonly MessageEvent<unknown>[] | undefined>()

    const [center, setCenter] = useState<Point>()

    const [previewTime, setPreviewTime] = React.useState<number | undefined>()

    const [renderDone, setRenderDone] = React.useState<(() => void) | undefined>()

    // We use a layout effect to setup render handling for our panel. We also setup some topic subscriptions.

    useEffect(() => {
        if (!allNavMessages[0]) return

        if (!allNavMessages[0]?.message?.latitude || allNavMessages[0]?.message?.longitude) {
            setCenter({ lat: 55.7522, lon: 37.6156 })
        }

        setCenter({
            lat: allNavMessages[0].message.latitude,
            lon: allNavMessages[0].message.longitude,
        })
    }, [allNavMessages])

    React.useLayoutEffect(() => {
        console.log('this')

        // The render handler is run by the broader studio system during playback when your panel
        // needs to render because the fields it is watching have changed. How you handle rendering depends on your framework.
        // You can only setup one render handler - usually early on in setting up your panel.

        // Without a render handler your panel will never receive updates.

        // The render handler could be invoked as often as 60hz during playback if fields are changing often.

        context.watch('currentFrame')
        context.watch('topics')
        context.watch('allFrames')
        context.watch('previewTime')

        context.onRender = (renderState: RenderState, done) => {
            // render functions receive a _done_ callback. You MUST call this callback to indicate your panel has finished rendering.
            // Your panel will not receive another render callback until _done_ is called from a prior render. If your panel is not done
            // rendering before the next render call, studio shows a notification to the user that your panel is delayed.
            //
            // Set the done callback into a state variable to trigger a re-render.

            setRenderDone(() => done)

            setPreviewTime(renderState.previewTime)

            // We may have new topics - since we are also watching for messages in the current frame, topics may not have changed
            // It is up to you to determine the correct action when state has not changed.

            // currentFrame has messages on subscribed topics since the last render call
            setMessages(renderState.currentFrame)

            if (renderState.topics) {
                setTopics(renderState.topics)
            }

            if (renderState.allFrames) {
                setAllMapMessages(renderState.allFrames as MapPanelMessage[])
            }

            if (renderState.currentFrame && renderState.currentFrame.length > 0) {
                setCurrentMapMessages(renderState.currentFrame as MapPanelMessage[])
            }
        }

        // After adding a render handler, you must indicate which fields from RenderState will trigger updates.
        // If you do not watch any fields then your panel will never render since the panel context will assume you do not want any updates.

        // tell the panel context that we care about any update to the _topic_ field of RenderState

        // tell the panel context we want messages for the current frame for topics we've subscribed to
        // This corresponds to the _currentFrame_ field of render state.

        // subscribe to some topics, you could do this within other effects, based on input fields, etc
        // Once you subscribe to topics, currentFrame will contain message events from those topics (assuming there are messages).
        context.subscribe(['/gps'])
    }, [context, messages, topics])

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
    //         radius: 2,
    //         color: '#000',
    //         stroke: false,
    //         fillOpacity: 1,
    //         interactive: false,
    //     })

    //     marker.addTo(currentMap)
    //     return () => {
    //         marker.remove()
    //     }
    // }, [allNavMessages, currentMap, previewTime, topicLayers])

    // require('./index.sass')

    // invoke the done callback once the render is complete
    React.useEffect(() => {
        renderDone?.()
    }, [renderDone])

    return (
        <>
            <h1>Hi, my name is Alex!</h1>
            {center ? (
                <Map
                    context={context}
                    centerMap={center}
                    messages={allNavMessages}
                    previewTime={previewTime}
                />
            ) : (
                <h2>Waiting for first GPS point...</h2>
            )}

            <div>
                NAV_MESSAGES count: {allNavMessages.length}
                ALL_MESSAGES time: {previewTime ?? '0'}
            </div>
        </>
    )
}

export function initMyMapExtension(context: PanelExtensionContext): void {
    ReactDOM.render(
        <StrictMode>
            <MyMapPanel context={context} />
        </StrictMode>,
        context.panelElement,
    )
}
