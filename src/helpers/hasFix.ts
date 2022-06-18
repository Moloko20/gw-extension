import { MessageEvent } from '@foxglove/studio'

import { NavSatFixMsg, NavSatFixStatus } from 'types/MapPanelMessage'

export const hasFix = (ev: MessageEvent<NavSatFixMsg>): boolean => {
    switch (ev.message.status?.status) {
        case NavSatFixStatus.STATUS_GBAS_FIX:
        case NavSatFixStatus.STATUS_SBAS_FIX:
        case NavSatFixStatus.STATUS_FIX:
            return true
        case NavSatFixStatus.STATUS_NO_FIX:
        case undefined:
        default:
            return false
    }
}
