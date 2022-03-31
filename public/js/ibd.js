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
    // when db is successfully created with its object store (from onupgradedneeded event above), save reference to db in global variable
    db = event.target.result;
  
    // CHECK IF APP IS ONLINE
    if (navigator.onLine) {
        uploadEntry();
    }
};


// LISTEN FOR APP COMING BACK ONLINE
window.addEventListener('online', uploadEntry);
