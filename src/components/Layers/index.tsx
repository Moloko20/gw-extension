import React, { FC, useEffect, memo } from 'react'
import { TileLayer, LayersControl, useMap } from 'react-leaflet'

import { PanelExtensionContext } from '@foxglove/studio'

import { LayersControlEvent } from 'leaflet'

import { Config } from 'types/Config'

import './index.css'

type CustomLayerType = {
    attribution: string
    url: string
    name: string
}

const layers: CustomLayerType[] = [
    {
        attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        name: 'Схема',
    },
    {
        attribution:
            'Map data: &amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &amp;copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        name: 'Топо карта',
    },
    {
        attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        name: 'Спутник',
    },
]

type CustomLayerProps = {
    layer: CustomLayerType
    currentLayerName: string
}

const CustomLayerComponent: FC<CustomLayerProps> = ({ layer, currentLayerName }) => {
    return (
        <LayersControl.BaseLayer
            checked={currentLayerName === layer.name ? true : false}
            name={layer.name}
        >
            <TileLayer
                attribution={layer.attribution}
                url={layer.url}
                maxNativeZoom={18}
                maxZoom={24}
            />
        </LayersControl.BaseLayer>
    )
}

const CustomLayer = memo(CustomLayerComponent)

type LayersProps = {
    context: PanelExtensionContext
    config: Config
}

export const LayersComponent: FC<LayersProps> = ({ context, config }) => {
    const map = useMap()

    useEffect(() => {
        const layerSelectHanlder = (layeTitle: LayersControlEvent) => {
            context.saveState({
                layer: layeTitle.name,
            })
        }

        map.on('baselayerchange', layerSelectHanlder)
        return () => {
            map.off('baselayerchange', layerSelectHanlder)
        }
    }, [context, map])

    useEffect(() => {
        context.saveState(config)
    }, [config])

    return (
        <LayersControl position="topright" collapsed={false}>
            {layers.map(layer => (
                <CustomLayer layer={layer} currentLayerName={config.layer} />
            ))}
        </LayersControl>
    )
}

export const Layers = memo(LayersComponent)
