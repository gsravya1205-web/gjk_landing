// Google Sheets Integration Utility
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwrJfxhgy42gN14RLVk5LeB-P22uXqjBvVRei6DfNcVpYYa6iHEYzKkapyX45c7lvkn/exec';

export interface FormSubmissionData {
  name: string;
  phone: string;
  slot: string;
  date: string;
  age?: string;
  formSource?: string;
}

/**
 * Sends form submission data to Google Sheets via Google Apps Script Web App URL
 */
export async function sendToGoogleSheet(data: FormSubmissionData): Promise<boolean> {
  const scriptUrl = GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn('[Lead Submission] Google Script URL is not configured yet. Form submission data:', data);
    return false;
  }

  try {
    console.log('[Lead Submission] Submitting lead to Google Sheets:', data);

    const formData = new FormData();
    formData.append('timestamp', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('age', data.age || 'N/A');
    formData.append('date', data.date);
    formData.append('slot', data.slot);
    formData.append('formSource', data.formSource || 'General Consultation Registration');

    // Send payload using FormData in no-cors mode for 100% reliable browser delivery
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });

    console.log('[Lead Submission] Successfully dispatched to Google Apps Script!');
    return true;
  } catch (error) {
    console.error('[Lead Submission] Error submitting form data to Google Sheets:', error);
    return false;
  }
}
