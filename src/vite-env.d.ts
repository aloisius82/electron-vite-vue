/// <reference types="vite/client" />
// import {DB_MODEL, DB_COMMAND} from '../electron/database/index'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer,
  DB:any
}
