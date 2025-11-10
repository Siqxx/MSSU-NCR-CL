// script.js — starter connector for Admin page
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9FmJzjWDQb4Klu3ba5rke_3Icv0qqHdi81mBDeAxbYLeX46GFD_9JQkuPJnu4vHLlyQ/exec';
const DRIVE_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbx9efC0AU0DjFvHst8PPmRTffUVxc22UIMXbVVHMS2vS31KqnrUzIefasOijrARolxh4g/exec';
const GOOGLE_CLIENT_ID = '507773507877-t1prpckunc9l2700dgfflhfk6jf2de5c.apps.googleusercontent.com';
async function saveAdminRecord(form, photo, soi) {
  console.log('Saving admin record...', form);

  // Simulate saving to Google Apps Script endpoint
  alert(`Record saved for: ${form.name}`);
}

function renderAdminList() {
  const adminList = document.getElementById('adminList');
  adminList.innerHTML = "<p>No records yet (demo mode).</p>";
}

function syncNow() {
  alert("Sync triggered (demo mode).");
}
