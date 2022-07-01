import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PanelExtensionContext } from '@foxglove/studio'

import { Panel } from 'panel'

export default {
    title: 'MainPanel',
    component: Panel,
} as ComponentMeta<typeof Panel>

export const MainPanel: ComponentStory<typeof Panel> = () => {
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
            <Panel context={context} defaultCenter={{ lat: 55.7522, lon: 37.6156 }} />
        </div>
    )
}
