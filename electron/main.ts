import { app,BrowserWindow,ipcMain,dialog} from 'electron';
import path from 'node:path';
import { autoUpdater } from 'electron-updater';


app.whenReady().then(() => {
  // Crée une fenêtre principale
  createWindow();

  app.on("activate", function () {
    // Vérifie s'il n'y a pas de fenêtre ouverte et en crée une nouvelle si nécessaire
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });
  // Vérifie les mises à jour de l'application
  autoUpdater.checkForUpdates()

  //si une nouvelle mise a jour est disponible, on demande à l'utilisateur de redémarrer l'application
  autoUpdater.on('update-downloaded', () => {
    const dialogOpts: Electron.MessageBoxOptions = {
      type: 'info',
      buttons: ['Redémarrer', 'Plus Tard'],
      title: 'Mise à jour disponible',
      message: "Une nouvelle version de l'application est disponible." ,
      detail: "Voulez-vous redémarrer l'application pour mettre à jour ?"
    };

    // Affiche la boîte de dialogue et gère la réponse de l'utilisateur
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      // Si l'utilisateur choisit de redémarrer, quitte l'application pour installer la mise à jour
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });

  // Gère les erreurs lors de la mise à jour automatique de l'application
  autoUpdater.on('error', (message) => {
    console.error("Il y a eu une erreur lors de la mise à jour de l'application ")
    console.error(message)
  })

});

ipcMain.handle('app_version', () => {
  return { version: app.getVersion() };
});

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)



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

  win.webContents.openDevTools();

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

