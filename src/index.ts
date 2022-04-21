import { ExtensionContext } from '@foxglove/studio'

import { initExamplePanel } from './App'

export function activate(extensionContext: ExtensionContext) {
    extensionContext.registerPanel({ name: 'example-panel', initPanel: initExamplePanel })
}
