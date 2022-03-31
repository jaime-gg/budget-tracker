// SET UP VARIABLES 
let db;
const request = indexedDB.open('budgeting_tracker', 1);


// UPDATE WHENEVER NEEDED 
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};


// WHEN SUCCESSFUL 
request.onsuccess = function(event) {
    db = event.target.result;
  
    // CHECK IF APP IS ONLINE
    if (navigator.onLine) {
        uploadTransaction();
    }
};


// LOG ERROR
request.onerror = function(event) {
    console.log(event.target.errorCode);
};


// ADD RECORD TO YOUR STORE WITH ADD METHOD.
function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
  
    const moneyObjectStore = transaction.objectStore('new_transaction');
  
    moneyObjectStore.add(record);
}


// TRIGGERED WHEN BACK ONLINE 
function uploadTransaction() {
    // OPEN A TRANSACTION ON YOUR PENDING DB
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const moneyObjectStore = transaction.objectStore('new_transaction');
  
    // GET ALL RECORDS FROM STORE AND SET TO A VARIABLE
    const getAll = moneyObjectStore.getAll();
  
    getAll.onsuccess = function() {
        // IF THERE WAS DATA IN INDEXEDDB'S STORE, LET'S SEND IT TO THE API SERVER
        if (getAll.result.length > 0) {
            fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
            })

            .then(response => response.json())

            .then(serverResponse => {
                if (serverResponse.message) {
                    throw new Error(serverResponse);
                }
    
                const transaction = db.transaction(['new_transaction'], 'readwrite');
                const moneyObjectStore = transaction.objectStore('new_transaction');

                // CLEAR ALL ITEMS IN YOUR STORE
                moneyObjectStore.clear();
            })

            .catch(err => {
                console.log(err);
            });
        }
    };
}

// LISTEN FOR APP COMING BACK ONLINE
window.addEventListener('online', uploadTransaction);
