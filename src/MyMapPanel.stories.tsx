import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PanelExtensionContext } from '@foxglove/studio'

import { MyMapPanel } from './MyMapPanel'

// import { Marker, MarkerAction, MarkerType, TF } from './ros'

export default {
    title: 'MyMapPanel',
    component: MyMapPanel,
} as ComponentMeta<typeof MyMapPanel>

export const BasicRender: ComponentStory<typeof MyMapPanel> = () => {
    const context: PanelExtensionContext = {
        panelElement: document.createElement('div'),
        initialState: {},
        layout: {
            addPanel: () => {},
        },
        watch: () => {},
        saveState: () => {},
        setParameter: () => {},
        setPreviewTime: () => {},
        subscribe: () => {},
        unsubscribeAll: () => {},
        subscribeAppSettings: () => {},
    }

    return (
        <div style={{ width: '100%', height: '100%', top: 0, left: 0, position: 'absolute' }}>
            <MyMapPanel context={context} />
        </div>
    )
}

// function createMarker(): Marker {
//     return {
//         header: {
//             stamp: { sec: 0, nsec: 0 },
//             frame_id: 'base_link',
//         },
//         ns: '',
//         id: 0,
//         type: MarkerType.CUBE,
//         action: MarkerAction.ADD,
//         pose: {
//             position: { x: 0, y: 0, z: 0 },
//             orientation: { x: 0, y: 0, z: 0, w: 1 },
//         },
//         scale: { x: 1, y: 1, z: 1 },
//         color: { r: 1, g: 1, b: 1, a: 1 },
//         lifetime: { sec: 0, nsec: 0 },
//         frame_locked: false,
//         points: [],
//         colors: [],
//         text: '',
//         mesh_resource: '',
//         mesh_use_embedded_materials: false,
//     }
// }
