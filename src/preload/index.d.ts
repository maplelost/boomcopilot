import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI

    // declare from ./index.ts
    api: {
      receiveFromMidBtn: (
        callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
      ) => void
    }
  }
}
