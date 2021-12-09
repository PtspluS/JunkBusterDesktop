const { app, BrowserWindow , ipcMain} = require('electron')
const { autoUpdater } = require('electron-updater');

let win;

function createWindow () {
  // create the window object
 win = new BrowserWindow({
    width: 1600,
    height: 900,
    //useContentSize : true,
    minWidth : 800,
    minHeight : 450,
    autoHideMenuBar : true,
    icon: "favicon.ico",
    //met la fenetre sans bordure 
    //frame : false,
    //fullscreen : true,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  //load the index.html.
  win.loadFile('src/junkbuster.html');
  win.setMenuBarVisibility(false);
  win.setMenu(null);
  win.on('closed', function () {
    win = null;
  });
  // check for update 
  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on('ready', function(){
  createWindow();


  win.on('will-resize', function(){
    let size = win.getSize();

    console.log(size[0]+':'+size[1]);
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (win === null) {
    createWindow();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// read version from the file 'package.json'
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});