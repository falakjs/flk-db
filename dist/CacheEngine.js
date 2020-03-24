class IndexedDBEngine {
    /**
    * Constructor
    */
    constructor() {}

    /**
    * Initialize the class
    *
    */
    init() {
        this.storage = window.localforage;
    }

    /**
    * Set the value for the given key
    *
    * @param string key
    * @param mixed value
    * @param int expiresAt Timestamp in milliseconds
    * @return this
    */
    set(key, value, expiresAt = Cache.FOREVER) {
        let settings = {
            data: value,
            expiresAt: expiresAt,
        };

        value = this.encryptValues ? this.crypto.encrypt(settings) : JSON.stringify(settings);

        this.storage.setItem(this.key(key), value);

        return this;
    }

    /**
    * Get value for the given key
    *
    * @param string key
    * @param mixed defaultValue
    * @return mixed
    */
    get(key, defaultValue = null) {
        let settings = this.storage.getItem(this.key(key));

        if (!settings) return defaultValue;
        
        let decryptedSettings;
        
        try {
            decryptedSettings = this.encryptValues ? this.crypto.decrypt(settings) : JSON.parse(settings);

            if (!decryptedSettings) {
                this.remove(key);
                return defaultValue;
            }
        } catch (e) {
            this.remove(key);
            return defaultValue;
        }

        if (decryptedSettings.expiresAt && decryptedSettings.expiresAt < Date.now()) {
            this.remove(key);

            return defaultValue;
        }

        return decryptedSettings.data;
    }

    /**
    * Determine if the given key exists in cache
    *
    * @param string key
    * @return bool
    */
    has(key) {
        return this.get(key, null) !== null;
    }

    /**
    * Remove the given key from cache
    *
    * @param string key
    * @return void
    */
    remove(key) {
        this.storage.removeItem(this.key(key));
    }

    /**
    * Clear the cache repository
    *
    * @return void
    */
    clear() {
        this.storage.clear();
    }

    /**
    * Get the full key name as it will be compiled with the current app name
    *
    */
    key(key) {
        let cacheKey = key;

        return cacheKey;
    }
}

IndexedDBEngine.FOREVER = 0;
IndexedDBEngine.FOR_ONE_HOUR = Date.now() + 3600 * 1000;
IndexedDBEngine.FOR_TWO_HOURS = IndexedDBEngine.FOR_ONE_HOUR * 2;
IndexedDBEngine.FOR_ONE_DAY = IndexedDBEngine.FOR_ONE_HOUR * 24;
IndexedDBEngine.FOR_ONE_MONTH = IndexedDBEngine.FOR_ONE_DAY * 30;
IndexedDBEngine.FOR_ONE_YEAR = IndexedDBEngine.FOR_ONE_MONTH * 12;

DI.register({
    class: IndexedDBEngine,
    alias: 'db',
});