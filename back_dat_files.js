// ID constants for DAT and Backups folders
const const_dat_folder = "0AExkvgXkQSXIUk9PVA"
const const_bak_folder = "1Q_Lxb0WOfRTPSfyhRbgjr-fmj8jmRGjd"



function back_dat_files_create() {

  // Reading back up folder and creating the file list object
  let dat_folder = DriveApp.getFolderById(const_dat_folder);
  let bak_folder = DriveApp.getFolderById(const_bak_folder);


  // Creating locale date
  let date = new Date().toLocaleDateString()  +":"+ new Date().toLocaleTimeString();


  // Creating file list object
  file_folder = dat_folder.getFiles();


  // Creates the back up file for each DAT
  while (file_folder.hasNext()) {

    file_objt = file_folder.next();
    id = file_objt.getId();
    file = DriveApp.getFileById(id);
    name = DriveApp.getFileById(id).getName() + " [automated-backup-" + date + "]";
    file.makeCopy(name, bak_folder);

  }
}



function back_dat_files_clean() {

  // Reading back up folder and creating the file list object
  let back_folder = DriveApp.getFolderById('1Q_Lxb0WOfRTPSfyhRbgjr-fmj8jmRGjd');
  let back_rfiles = back_folder.getFiles();

  // Iterates all the files in the back up folder, if the week day is not 7 (Sunday) then the backup file gets deleted
  while (back_rfiles.hasNext()) {

    let file_object = back_rfiles.next();
    let file_creation_date = new Date(file_object.getLastUpdated()).getDay();

    if (file_creation_date != 7) {

      file_object.setTrashed(true);

    }
  }
}