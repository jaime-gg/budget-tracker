// SET UP VARIABLES 
let db;
const request = indexedDB.open('budgeting_tracker', 1);


// UPDATE WHENEVER NEEDED 
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_entry', { autoIncrement: true });
};


// WHEN SUCCESSFUL 
request.onsuccess = function(event) {
    db = event.target.result;
  
    // CHECK IF APP IS ONLINE
    if (navigator.onLine) {
        uploadEntry();
    }
};


// LOG ERROR
request.onerror = function(event) {
    console.log(event.target.errorCode);
};


// ADD RECORD TO YOUR STORE WITH ADD METHOD.
function saveRecord(record) {
    const transaction = db.transaction(['new_entry'], 'readwrite');
  
    const entryObjectStore = transaction.objectStore('new_entry');
  
    entryObjectStore.add(record);
}



// LISTEN FOR APP COMING BACK ONLINE
window.addEventListener('online', uploadEntry);
