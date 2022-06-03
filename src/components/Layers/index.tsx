import React from 'react'
import { TileLayer, LayersControl } from 'react-leaflet'

import './index.css'

export const Layers: React.FC = () => {
    return (
        <LayersControl position="topright" collapsed={false}>
            {/* {Give the layer a name that will be displayed inside of the layers control. We also want to pass the checked prop to whichever map tile we want displayed as the default:} */}
            <LayersControl.BaseLayer checked name="Схема">
                <TileLayer
                    attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxNativeZoom={18}
                    maxZoom={24}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Топо карта">
                <TileLayer
                    attribution='Map data: &amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &amp;copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    maxNativeZoom={18}
                    maxZoom={24}
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Спутник">
                <TileLayer
                    attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maxNativeZoom={18}
                    maxZoom={24}
                />
            </LayersControl.BaseLayer>
        </LayersControl>
    )
}
