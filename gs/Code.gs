function _onEdit(e) {
  //Logger.log(JSON.stringify(e));

  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();


  const row = e.range.getRow();
  const numColumns = sheet.getLastColumn();

  // Retrieve the headers (assuming they are in the first row)
  const headers = sheet.getRange(1, 1, 1, numColumns).getValues()[0];

  // Retrieve the entire row that contains the edited cell
  const rowDataArray = sheet.getRange(row, 1, 1, numColumns).getValues()[0];

  // Convert the row array to an object using headers as keys
  let rowDataObject = {};
  headers.forEach((header, index) => {
    rowDataObject[header] = rowDataArray[index];
  });

  // Check if any cell in the row contains an error
  const rowHasError = Object.values(rowDataObject).some(value => 
    typeof value === 'string' && value.startsWith('#')
  );

  if (rowHasError) {
    Logger.log(`Sheet (${sheetName}) contains a validation error at row (${row})`);
    return;
  }

  const options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify({ 
      name: 'evt.catalog.rt_update', 
      meta: {
        context: "gsuite",
        _open: {
          sheet: sheetName,
          actor: e.user.email
        }
      },
      payload: rowDataObject 
    })
  };

    Logger.log(`Pushing update at row number (${row}) from sheet (${sheetName})...`)

  UrlFetchApp.fetch('https://opulent-space-capybara-76rg9rwvprfx6vq-3001.app.github.dev/events', options);
}
