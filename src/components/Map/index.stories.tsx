import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Map } from './index'

export default {
    title: 'components/Map',
    component: Map,
} as ComponentMeta<typeof Map>

export const BasicRender: ComponentStory<typeof Map> = () => {
    return <Map />
}
