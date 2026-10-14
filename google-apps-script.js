/**
 * =========================================================================
 * MEDCY IVF - GOOGLE APPS SCRIPT FOR CONSULTATION LEADS
 * =========================================================================
 * 
 * This script receives lead submissions from the landing page consultation forms
 * (both Hero Form and Free Camp Modal) and saves them automatically into Google Sheets.
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open Google Sheets (create a new sheet or open your existing Doctor Leads Sheet).
 * 2. In Google Sheets menu, click: Extensions -> Apps Script.
 * 3. Delete any default code in Code.gs and paste this entire code.
 * 4. Click "Deploy" (top right) -> "New deployment".
 * 5. Click the gear icon next to "Select type" and select "Web app".
 * 6. Set the fields:
 *    - Description: "Medcy IVF Doctor Consultation Leads"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"  <-- (VERY IMPORTANT: MUST BE "Anyone")
 * 7. Click "Deploy".
 * 8. Authorize permissions when prompted by Google (click Advanced -> Go to Untitled project).
 * 9. Copy the "Web app URL" (it starts with https://script.google.com/macros/s/.../exec).
 * 10. Paste the Web app URL in your project (.env file or src/utils/googleSheets.ts).
 * =========================================================================
 */

// Name of the tab in your spreadsheet where leads will be stored
var SHEET_NAME = "Consultation Leads";

/**
 * Handles POST requests sent from the website consultation forms
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent requests to avoid row collisions
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If tab doesn't exist, create it or use the first active sheet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Auto-setup headers and formatting if sheet is fresh/empty
    setupSheetHeadersIfNeeded(sheet);

    // Parse incoming request data (handles both JSON text/plain and Form URL encoded)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Format IST Date & Time
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm a");
    var name = data.name || "N/A";
    var phone = data.phone ? "'" + data.phone.toString() : "N/A"; // Prefix with ' to preserve full phone number
    var age = data.age || "N/A";
    var date = data.date || "N/A";
    var slot = data.slot || "N/A";
    var formSource = data.formSource || "Website Consultation Form";
    var status = "🆕 New Lead"; // Default status for doctor / clinic reception
    var notes = ""; // Notes space for doctor/counselor

    // Append new row into the sheet
    sheet.appendRow([
      timestamp,
      name,
      phone,
      age,
      date,
      slot,
      formSource,
      status,
      notes
    ]);

    // Apply clean formatting to newly added row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 9).setVerticalAlignment("middle");
    sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 3).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 4).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 5).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 6).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 8).setHorizontalAlignment("center").setFontWeight("bold");

    // Return success JSON
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles GET requests (useful for testing if your Web App is deployed and reachable)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      message: "Medcy IVF Consultation Leads Webhook is active and running!",
      timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm a")
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Automatically creates headers and styles the sheet if it's empty
 */
function setupSheetHeadersIfNeeded(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Submitted Time (IST)",
      "Patient Name",
      "Phone Number",
      "Age",
      "Preferred Date",
      "Time Slot",
      "Lead Source",
      "Lead Status",
      "Doctor / Counselor Notes"
    ];

    sheet.appendRow(headers);

    // Style the header row with Medcy signature purple
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#4D1F53"); // Medcy deep purple
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 40);

    // Freeze the top header row so it stays visible while scrolling
    sheet.setFrozenRows(1);

    // Auto-fit column widths
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 200); // Patient Name
    sheet.setColumnWidth(3, 150); // Phone Number
    sheet.setColumnWidth(4, 80);  // Age
    sheet.setColumnWidth(5, 150); // Date
    sheet.setColumnWidth(6, 170); // Time Slot
    sheet.setColumnWidth(7, 260); // Lead Source
    sheet.setColumnWidth(8, 140); // Lead Status
    sheet.setColumnWidth(9, 250); // Notes
  }
}
