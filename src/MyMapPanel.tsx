import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import { PanelExtensionContext, RenderState, Topic, MessageEvent } from '@foxglove/studio'

import { Map } from './components/Map'

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

// console.log(L.Marker.prototype)

//const destDir = path_1.join("/mnt/c/Users/Alex/.foxglove-studio/extensions", dirName);

import './index.sass'

export function MyMapPanel({ context }: { context: PanelExtensionContext }): JSX.Element {
    const [topics, setTopics] = React.useState<readonly Topic[] | undefined>()
    const [messages, setMessages] = React.useState<readonly MessageEvent<unknown>[] | undefined>()

    const [renderDone, setRenderDone] = React.useState<(() => void) | undefined>()

    // We use a layout effect to setup render handling for our panel. We also setup some topic subscriptions.

    React.useLayoutEffect(() => {
        console.log('this')

        // The render handler is run by the broader studio system during playback when your panel
        // needs to render because the fields it is watching have changed. How you handle rendering depends on your framework.
        // You can only setup one render handler - usually early on in setting up your panel.

        // Without a render handler your panel will never receive updates.

        // The render handler could be invoked as often as 60hz during playback if fields are changing often.

        context.onRender = (renderState: RenderState, done) => {
            // render functions receive a _done_ callback. You MUST call this callback to indicate your panel has finished rendering.
            // Your panel will not receive another render callback until _done_ is called from a prior render. If your panel is not done
            // rendering before the next render call, studio shows a notification to the user that your panel is delayed.
            //
            // Set the done callback into a state variable to trigger a re-render.
            setRenderDone(done)

            // We may have new topics - since we are also watching for messages in the current frame, topics may not have changed
            // It is up to you to determine the correct action when state has not changed.
            setTopics(renderState.topics)

            // currentFrame has messages on subscribed topics since the last render call
            setMessages(renderState.currentFrame)
        }

        // After adding a render handler, you must indicate which fields from RenderState will trigger updates.
        // If you do not watch any fields then your panel will never render since the panel context will assume you do not want any updates.

        // tell the panel context that we care about any update to the _topic_ field of RenderState
        context.watch('topics')

        // tell the panel context we want messages for the current frame for topics we've subscribed to
        // This corresponds to the _currentFrame_ field of render state.
        context.watch('currentFrame')

        // subscribe to some topics, you could do this within other effects, based on input fields, etc
        // Once you subscribe to topics, currentFrame will contain message events from those topics (assuming there are messages).
        context.subscribe(['/some/topic'])

        console.table(topics)
        console.table(messages)
    }, [])

    // require('./index.sass')

    // invoke the done callback once the render is complete
    React.useEffect(() => {
        renderDone?.()
    }, [renderDone])

    return (
        <>
            <h1>Hi, my name is Alex!</h1>
            before map
            <Map />
            after map{}
            TOPICS
            <ol>
                {topics?.map(item => {
                    return <li key={item.name}>ITEM{JSON.stringify(item)}</li>
                })}
            </ol>
            MESSAGES
            <ol>
                {messages?.map(message => {
                    return <li key={message.topic}>{JSON.stringify(message)}</li>
                })}
            </ol>
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
