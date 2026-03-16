// Google Apps Script - Deploy as Web App
// 1. Go to https://script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Deploy as Web App (Execute as: Me, Who has access: Anyone)
// 5. Copy the Web App URL and replace GOOGLE_SCRIPT_URL in your .env.local

const SHEET_NAME = "Contact Form";

const doPost = (e) => {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME) || doc.insertSheet(SHEET_NAME);
    
    const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    
    const { firstName, lastName, email, phone, projectType, message } = e.parameter;
    
    const row = [
      new Date(),
      firstName,
      lastName,
      email,
      phone || "",
      projectType,
      message
    ];
    
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  finally {
    lock.releaseLock();
  }
};

// Helper function to set up headers (run once)
const setupSheet = () => {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = doc.getSheetByName(SHEET_NAME) || doc.insertSheet(SHEET_NAME);
  
  const headers = ["Timestamp", "First Name", "Last Name", "Email", "Phone", "Project Type", "Message"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  
  // Format columns
  sheet.setColumnWidths(1, 7, [150, 120, 120, 200, 150, 150, 400]);
};
