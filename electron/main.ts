import { app,BrowserWindow,ipcMain,dialog} from 'electron';
import path from 'node:path';
import { autoUpdater } from 'electron-updater';



app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });


  autoUpdater.checkForUpdates()

  autoUpdater.on('update-downloaded', () => {
    const dialogOpts: Electron.MessageBoxOptions = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: "Une nouvelle version de l'application est disponible.",
      detail: "Une nouvelle version a été téléchargée. Redémarrez l'application pour appliquer les mises à jour."
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });
  autoUpdater.on('error', (message) => {
    console.error('There was a problem updating the application')
    console.error(message)
  })

});

ipcMain.handle('app_version', () => {
  return { version: app.getVersion() };
});



// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#131826',
      symbolColor: '#D2D5DB',
      height: 32
    },
    icon: './src/ico.ico',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },

  });


  win.loadFile('./index.html')

  //win.webContents.openDevTools();

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());
  });



  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }


}



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
