// script.js — starter connector for Admin page
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbww9SeQ_giQeK36_DwMJTJM4le9BoRT3yA6G6uvR7yW9NGTGdz7EyQh5fx_qATQcfDpbw/exec';
const DRIVE_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbzfmqy-yenLK5Po36Z1Cs9U4Gd5RXez0p1ZboSZt5VyOikVgqBcsVFELRHqpyqRbE4Udg/exec';
const GOOGLE_CLIENT_ID = '507773507877-t1prpckunc9l2700dgfflhfk6jf2de5c.apps.googleusercontent.com';
async function saveAdminRecord(form, photo, soi) {
  try {
    // Upload photo first (if exists)
    if(photo) {
      const photoData = new FormData();
      photoData.append('file', photo);
      const photoRes = await fetch(DRIVE_UPLOAD_URL, {method:'POST', body:photoData});
      const photoLink = await photoRes.text();
      form.photoURL = photoLink;
    }

    // Upload SOI file
    if(soi) {
      const soiData = new FormData();
      soiData.append('file', soi);
      const soiRes = await fetch(DRIVE_UPLOAD_URL, {method:'POST', body:soiData});
      const soiLink = await soiRes.text();
      form.soiFileLink = soiLink;
    }

    // Send JSON to admin sheet
    await fetch(SCRIPT_URL, {method:'POST', body: JSON.stringify(form)});

    // Refresh table
    renderAdminList();
    alert(Record saved for: ${form.name});
  } catch(err) {
    console.error(err);
    alert("Error saving record. Check console.");
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
