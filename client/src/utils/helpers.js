export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  console.log(`store name: ${storeName}`);
  console.log(`method : ${method}`);
  console.log(`object : ${JSON.stringify(object)}`);
  
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('Yumu', 1);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      // db.createObjectStore('products', { keyPath: '_id' });
      // db.createObjectStore('categories', { keyPath: '_id' });
      // db.createObjectStore('cart', { keyPath: '_id' });
      db.createObjectStore('videos', { keyPath: 'videoID' });
      db.createObjectStore('playlist', { keyPath: 'videoID' });

    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'add':
          store.add(object);
          resolve(object);
          break;
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          console.log(object.videoID);
          store.delete(object.videoID);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
