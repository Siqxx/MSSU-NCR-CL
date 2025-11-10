// script.js — starter connector for Admin page
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9FmJzjWDQb4Klu3ba5rke_3Icv0qqHdi81mBDeAxbYLeX46GFD_9JQkuPJnu4vHLlyQ/exec';
const DRIVE_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbx9efC0AU0DjFvHst8PPmRTffUVxc22UIMXbVVHMS2vS31KqnrUzIefasOijrARolxh4g/exec';
const GOOGLE_CLIENT_ID = '507773507877-t1prpckunc9l2700dgfflhfk6jf2de5c.apps.googleusercontent.com';
async function saveAdminRecord(form, photoFile, soiFile) {
  try {
    // Upload photo if provided
    if(photoFile) {
      const photoData = new FormData();
      photoData.append('file', photoFile);
      const photoResp = await fetch(DRIVE_UPLOAD_URL, { method: 'POST', body: photoData });
      const photoResult = await photoResp.json();
      form.photoURL = photoResult.url; // returned URL from Drive
    }

    // Upload SOI file if provided
    if(soiFile) {
      const soiData = new FormData();
      soiData.append('file', soiFile);
      const soiResp = await fetch(DRIVE_UPLOAD_URL, { method: 'POST', body: soiData });
      const soiResult = await soiResp.json();
      form.soiFileLink = soiResult.url; // returned URL from Drive
    }

    // Send the record to Google Apps Script
    const resp = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(form)
    });

    if(resp.ok) {
      alert(Record saved successfully for: ${form.name});
      renderAdminList(); // refresh list
    } else {
      alert('Error saving record.');
      console.error(await resp.text());
    }
  } catch(err) {
    console.error(err);
    alert('Failed to save record. Check console.');
  }
}

async function renderAdminList() {
  const adminList = document.getElementById('adminList');
  adminList.innerHTML = '<p>Loading...</p>';

  try {
    const resp = await fetch(SCRIPT_URL);
    const rows = await resp.json();
    if(!rows || rows.length === 0) {
      adminList.innerHTML = "<p>No records yet.</p>";
      return;
    }

    // Skip header row if you have one
    const data = rows.slice(1);

    let html = '<table><thead><tr><th>Item #</th><th>Name</th><th>Designation</th><th>Status</th><th>Action</th></tr></thead><tbody>';
    data.forEach(row=>{
      html += `<tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[5]}</td>
        <td>${row[6]}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    adminList.innerHTML = html;
  } catch(err) {
    console.error(err);
    adminList.innerHTML = '<p>Error loading records.</p>';
  }
}
async function syncNow() {
  alert("Syncing now...");
  await renderAdminList();
}
