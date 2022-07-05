import { MessageEvent, Time } from '@foxglove/studio'
import { toSec } from '@foxglove/rostime'

import { NavSatFixMsg } from 'utils/types'

const getDistanceOnGeoid = (firstPoint: NavSatFixMsg, nextPoint: NavSatFixMsg) => {
    const firstLat = (firstPoint.latitude * Math.PI) / 180
    const firstLon = (firstPoint.longitude * Math.PI) / 180

    const nextLat = (nextPoint.latitude * Math.PI) / 180
    const nextLon = (nextPoint.longitude * Math.PI) / 180

    const earthRadius = 6378100

    const rho1 = earthRadius * Math.cos(firstLat)
    const z1 = earthRadius * Math.sin(firstLat)
    const x1 = rho1 * Math.cos(firstLon)
    const y1 = rho1 * Math.sin(firstLon)

    const rho2 = earthRadius * Math.cos(nextLat)
    const z2 = earthRadius * Math.sin(nextLat)
    const x2 = rho2 * Math.cos(nextLon)
    const y2 = rho2 * Math.sin(nextLon)

    const dot = x1 * x2 + y1 * y2 + z1 * z2
    const cos_theta = dot / earthRadius ** 2
    const theta = Math.acos(cos_theta)

    return earthRadius * theta
}

const getSpeed = (
    firstTimestamp: Time,
    nextTimestamp: Time,
    firstPoint: NavSatFixMsg,
    nextPoint: NavSatFixMsg,
) => {
    const dist = getDistanceOnGeoid(firstPoint, nextPoint)

    const time_s = toSec(nextTimestamp) - toSec(firstTimestamp)
    const speed_mps = dist / time_s
    const speed_kph = (speed_mps * 3600.0) / 1000.0

    return +speed_kph.toFixed(1)
}

export const getSpeedData = (messages: MessageEvent<NavSatFixMsg>[]) => {
    const speedsArr: number[] = [NaN]

    for (let i = 1; i <= messages.length; i++) {
        const currentMessage = messages[i]
        const prevMessage = messages[i - 1]

        if (currentMessage && prevMessage) {
            speedsArr.push(
                getSpeed(
                    prevMessage?.receiveTime,
                    currentMessage?.receiveTime,
                    prevMessage?.message,
                    currentMessage?.message,
                ),
            )
        }
    }

    return speedsArr
}
