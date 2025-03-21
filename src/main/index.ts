import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { uIOhook, UiohookKey, UiohookMouseEvent } from 'uiohook-napi'
const { screen } = require('electron')

let mainWindow: BrowserWindow
function createWindow(): void {
  // 获取主屏幕尺寸和缩放比例
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize

  // 计算窗口位置，考虑缩放比例
  const windowWidth = 600
  const windowHeight = 100
  const windowX = (screenWidth - windowWidth) / 2
  const windowY = (screenHeight * 1) / 5
  console.log(windowX, windowY)

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    show: false,

    // 无边框弹窗位置
    x: Math.round(windowX),
    y: Math.round(windowY),
    transparent: true,
    frame: false,
    skipTaskbar: true,
    autoHideMenuBar: true,

    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
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

app.whenReady().then(() => {
  app.on('browser-window-blur', () => {
    hideWindow()
  })

  globalShortcut.register('Alt+Space', () => {
    toggleWindow()
  })
})

function toggleWindow() {
  if (mainWindow.isVisible()) {
    hideWindow()
  } else {
    showWindow()
  }
}

function hideWindow() {
  mainWindow.hide()
  mainWindow.setAlwaysOnTop(false)
}

function showWindow() {
  mainWindow.show()
  mainWindow.setAlwaysOnTop(true)
  mainWindow.focus() // 确保窗口显示在最前面
}

function sendClipboard(type: string, content: string) {
  mainWindow.webContents.send('sendClipboard', {
    type,
    content
  })
  showWindow()
}

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

      if (
        JSON.stringify(new_file_paths) !== JSON.stringify(last_file_paths) &&
        new_file_paths.length > 0
      ) {
        sendClipboard('file', new_file_paths)
      } else if (JSON.stringify(new_img) !== JSON.stringify(last_img) && new_img.toDataURL()) {
        sendClipboard('image', new_img.toDataURL())
      } else if (
        JSON.stringify(new_text) !== JSON.stringify(last_text) &&
        new_text.length > 0 &&
        new_text !== '\r\n'
      ) {
        sendClipboard('text', new_text)
      }
    }, 100)
  }
})

uIOhook.start()
