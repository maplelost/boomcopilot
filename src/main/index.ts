import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { uIOhook, UiohookKey, UiohookMouseEvent } from 'uiohook-napi'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 100,
    maxHeight: 100,
    minHeight: 100,
    resizable: false,

    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/**
 * ------------- 额外代码 -------------
 */

// * 监听鼠标中键按下
const { clipboard } = require('electron')
const clipboardEx = require('electron-clipboard-ex')

uIOhook.on('mousedown', (e: UiohookMouseEvent) => {
  if (e.button === 3) {
    const last_file_paths = clipboardEx.readFilePaths()
    const last_text = clipboard.readText()
    const last_img = clipboard.readImage()
    uIOhook.keyTap(UiohookKey.C, [UiohookKey.Ctrl])

    setTimeout(() => {
      const new_file_paths = clipboardEx.readFilePaths()
      const new_text = clipboard.readText()
      const new_img = clipboard.readImage()

      if (JSON.stringify(new_file_paths) !== JSON.stringify(last_file_paths)) {
        console.log('文件路径改变', new_file_paths)
      } else if (JSON.stringify(new_img) !== JSON.stringify(last_img)) {
        console.log('图片改变')
      } else if (JSON.stringify(new_text) !== JSON.stringify(last_text)) {
        // 判断一下是否是特殊的字符，例如 &#10;\n\r\t, 无法看见的 空格 换行 制表符
        if (new_text.includes('&#10;') || new_text.includes('\n') || new_text.includes('\r') || new_text.includes('\t')) {
          console.log('文本改变', new_text)
        }
      }
    }, 100)
  }
})

uIOhook.start()
