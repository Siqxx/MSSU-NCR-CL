// script.js — starter connector for Admin page
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4MtbB9zPnDa0sYjcT1e4EPFq901k26RzYGYfCIGT1J18911TU2wxZbe6qXyvdC865mg/exec';
const DRIVE_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbwiRAik98enRKbmbne-aCHMk7sw0p68al-RfB2KntpffWchCLbapFUgOWOsnjJ0xVUocg/exec';
const GOOGLE_CLIENT_ID = '507773507877-t1prpckunc9l2700dgfflhfk6jf2de5c.apps.googleusercontent.com';
async function saveAdminRecord(form, photoFile, soiFile) {
  try {
    // 1️⃣ Upload Photo (if provided)
    if(photoFile){
      const photoData = new FormData();
      photoData.append('file', photoFile);
      const photoResp = await fetch(DRIVE_UPLOAD_URL, {
        method: 'POST',
        body: photoData
      });
      const photoResult = await photoResp.json();
      form.photoURL = photoResult.url || '';
    } else {
      form.photoURL = '';
    }

    // 2️⃣ Upload SOI file (if provided)
    if(soiFile){
      const soiData = new FormData();
      soiData.append('file', soiFile);
      const soiResp = await fetch(DRIVE_UPLOAD_URL, {
        method: 'POST',
        body: soiData
      });
      const soiResult = await soiResp.json();
      form.soiFileLink = soiResult.url || '';
    } else {
      form.soiFileLink = '';
    }

    // 3️⃣ Post the full record to your Apps Script
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(form)
    });

    // 4️⃣ Refresh the list
    renderAdminList();

    alert(Record saved for: ${form.name});
  } catch(err){
    console.error(err);
    alert('Error saving record: ' + err.message);
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
