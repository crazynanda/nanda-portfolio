// Google Apps Script for Contact Form
// IMPORTANT: First create a Google Sheet, then open Apps Script from it
// 1. Go to sheets.google.com and create a new blank spreadsheet
// 2. In the spreadsheet, go to Extensions > Apps Script
// 3. Paste this code
// 4. Deploy as Web App

const SHEET_NAME = "Contact Form";

const doPost = (e) => {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);
    
    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      const headers = ["Timestamp", "First Name", "Last Name", "Email", "Phone", "Project Type", "Message"];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }
    
    const nextRow = sheet.getLastRow() + 1;
    
    const { firstName, lastName, email, phone, projectType, message } = e.parameter;
    
    const row = [
      new Date(),
      firstName || "",
      lastName || "",
      email || "",
      phone || "",
      projectType || "",
      message || ""
    ];
    
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  finally {
    lock.releaseLock();
  }
};
