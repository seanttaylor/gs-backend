 function gsOnEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var BACKEND_URL = "https://seanttaylor-psychic-space-system-9rqp9qw6jqhpvx9-3000.preview.app.github.dev/items";
  var TIMESTAMP_FORMAT_ISO = "yyyy-MM-dd'T'HH:mm:ss'Z'";


  // Retrieve the edited cell and its value
  var editedCell = range.getA1Notation();
  var editedValue = range.getValue();

  // Perform actions based on the edited cell and its value
  if (sheet.getName() === "Sheet1") {
    // Change the sheet name to the desired sheet name where you want to listen for changes
    var editedRow = range.getRow();

    // Ensure header row changes do not execute the logic
    if (editedRow === 1.0) {
      return;
    }

    var lastColumn = sheet.getLastColumn();
    var rowData = sheet.getRange(editedRow, 1, 1, lastColumn).getValues()[0];

    // Retrieve column names from the header row (assuming it's the first row)
    var headerRowValues = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];

    // Map column names to row values
    var rowObject = {};
    var ignoredFields = ["backend_status_timestamp", "backend_status"];
    for (var i = 0; i < headerRowValues.length; i++) {
      var columnName = headerRowValues[i];
      var rowValue = rowData[i];
      
      if (ignoredFields.includes(columnName)) {
        continue;
      }
      rowObject[columnName] = rowValue;
    }

    // Update "backend_status" column with "processing"
    var backendStatusColumnIndex = getColumnIndexByName("backend_status", headerRowValues);
    var backendStatusCell = sheet.getRange(editedRow, backendStatusColumnIndex);
    setStatusCell("processing", backendStatusCell);

    // Send row data to an HTTP endpoint via PUT method
    var url = BACKEND_URL;  // Replace with your actual HTTP endpoint URL
    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(rowObject)
    };

    var backendStatusTimestampColumnIndex = getColumnIndexByName("backend_status_timestamp", headerRowValues);
    var backendStatusTimestampCell = sheet.getRange(editedRow, backendStatusTimestampColumnIndex);
    var currentTimestamp = Utilities.formatDate(new Date(), "UTC", TIMESTAMP_FORMAT_ISO);

    try {
      var response = UrlFetchApp.fetch(url, options);
      Logger.log("HTTP POST response: " + response.getContentText());

      // Update "backend_status" column with "completed"
      setStatusCell("completed", backendStatusCell);

      // Update "backend_status_timestamp" column with current timestamp
      backendStatusTimestampCell.setValue(currentTimestamp);

      // Update "last_modified_timestamp" column with current timestamp
      var lastModifiedTimestampColumnIndex = getColumnIndexByName("last_modified", headerRowValues);
      var lastModifiedTimestampCell = sheet.getRange(editedRow, lastModifiedTimestampColumnIndex);
      lastModifiedTimestampCell.setValue(currentTimestamp);

    } catch (error) {
      Logger.log("HTTP request failed. Error: " + error);
      // Perform error handling or respond accordingly

      // Update "backend_status" column with "error"
      setStatusCell("error", backendStatusCell);

      // Update "backend_status_timestamp" column with current timestamp
      backendStatusTimestampCell.setValue(currentTimestamp);
    }
  }
}

function getColumnIndexByName(columnName, headerRowValues) {
  for (var i = 0; i < headerRowValues.length; i++) {
    if (headerRowValues[i] === columnName) {
      return i + 1; // Adding 1 to match 1-based index
    }
  }
  return -1; // Column not found
}

function setStatusCell(status, cell) {
  var statusMap = {
    "processing": {
      "verticalAlignment": "middle",
      "horizontalAlignment": "center",
      "fontColor": "white",
      "fontWeight": "bold",
      "backgroundColor": "lightgray"
    },
    "completed": {
      "verticalAlignment": "middle",
      "horizontalAlignment": "center",
      "fontColor": "white",
      "fontWeight": "bold",
      "backgroundColor": "#4285f4"
    },
    "error": {
      "verticalAlignment": "middle",
      "horizontalAlignment": "center",
      "fontColor": "white",
      "fontWeight": "bold",
      "backgroundColor": "#f79dad"
    }
  };

  if (statusMap.hasOwnProperty(status)) {
    var style = statusMap[status];

    cell.setValue(status);
    cell.setVerticalAlignment(style.verticalAlignment);
    cell.setHorizontalAlignment(style.horizontalAlignment);
    cell.setFontColor(style.fontColor);
    cell.setFontWeight(style.fontWeight);
    cell.setBackground(style.backgroundColor);
  }
}


