import { openDB } from 'idb';

// Initialize the 'jate' database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Database created');
    },
  });

// Add content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const obStore = transaction.objectStore('jate');
  
  // Initialize counter or increment if it exists
  const count = (await obStore.get('counter')) || 0;
  const result = await obStore.put({ id: count + 1, value: content });
  
  await transaction.done;
  
  return result;
};

// Get all content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const obStore = transaction.objectStore('jate');
  
  const result = await obStore.getAll();
  await transaction.done;

  return result.value;
}

initdb();
