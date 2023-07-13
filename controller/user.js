const { path } = require('express/lib/application');
const UserList = require('../models/user');
const excelJS = require('exceljs');

const exportUser = async(req, res) => {
  const currentDate = new Date();
  const workBook = new excelJS.Workbook();
  /**
   * @type {excelJS.Worksheet}
   */
  const workSheet = workBook.addWorksheet('Exported Users');
  const exportPath = './exports';
  const exportFileName = `users-exported-at-${currentDate.getDay()}-${currentDate.getMonth()}-${currentDate.getFullYear()}.xlsx`;

  workSheet.columns = [
    { header: "Nombre", key: "name", width: 20 },
    { header: "Email", key: "email", width: 30 },
    { header: "Género", key: "gender", width: 5 },
  ];

  UserList.forEach((currentUser) => {
    workSheet.addRow(currentUser);
  });

  workSheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    const exportedRawExcel = await workBook
      .xlsx
      .writeFile(`${exportPath}/${exportFileName}`)
      .then(() => {
        res.send({
          status: 'success',
          message: 'file successfully generated and downloaded',
          path: `${exportPath}/${exportFileName}`,
        });
      });
  } catch(err) {
    res.send({
      status: 'error',
      message: 'cannot generate and download the file',
    });
  }
 };

module.exports = exportUser;
