const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const os = require('os')
const fs = require('fs')

let mainWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    'title': app.getName(),
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden',
    // transparent: true,
    // frame: false,
    webPreferences: {
      nodeIntegration: false,
      'web-security': false,
      'plugins': true
    },
    icon: path.join(__dirname, 'assets/icon.icns')
  })

  // mainWindow.webContents.reloadIgnoringCache()
  mainWindow.loadURL('https://www.messenger.com/login/')

  mainWindow.webContents.on('dom-ready', function () {
    fs.readFile(__dirname + '/style/conversation-list.css', 'utf8', function (error, data) {
      mainWindow.webContents.insertCSS(data)
    })
    fs.readFile(__dirname + '/style/conversation.css', 'utf8', function (error, data) {
      mainWindow.webContents.insertCSS(data)
    })
    fs.readFile(__dirname + '/style/login.css', 'utf8', function (error, data) {
      mainWindow.webContents.insertCSS(data)
    })
  })
  // mainWindow.webContents.openDevTools()
  // BrowserWindow.addDevToolsExtension(
  // path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
  // )

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.