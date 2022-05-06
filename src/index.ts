import { ExtensionContext } from '@foxglove/studio'

import { initMyMapExtension } from './MyMapPanel'

export function activate(extensionContext: ExtensionContext): void {
    extensionContext.registerPanel({ name: 'GW-extension', initPanel: initMyMapExtension })
}
