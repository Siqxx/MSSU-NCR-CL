// script.js — starter connector for Admin page
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
