import React from 'react'

import { ComponentStory } from '@storybook/react'

import { PanelExtensionContext } from '@foxglove/studio'

import { MyMapPanel } from './MyMapPanel'

export const mainPanel: ComponentStory<typeof MyMapPanel> = () => {
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
