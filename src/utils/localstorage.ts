export function setLocalStorageItem<T>(key: string, action: T) {
   localStorage.setItem(key, JSON.stringify(action));
}

export function getLocalStorageItem<T>(key: string, defaultValue: T) {
   const stored = localStorage.getItem(key);
   return stored ? JSON.parse(stored) : defaultValue;
}

export function removeLocalStorageItem(key: string) {
   localStorage.removeItem(key);
}
