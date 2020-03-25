class IndexedDBEngine {
  /**
   * Constructor
   */
  constructor() {
    this.set = this.set.bind(this);
    this.storage = window.localforage;
  }

  /**
   * Initialize the class
   *
   */
  init() {}

  /**
   * Set the value for the given key
   *
   * @param string key
   * @param mixed value
   * @param int expiresAt Timestamp in milliseconds
   * @return this
   */
  async set(key, value, expiresAt = IndexedDBEngine.FOREVER) {
    let settings = {
      data: value,
      expiresAt: expiresAt
    };

    return await this.storage.setItem(key, settings);
  }

  /**
   * Get value for the given key
   *
   * @param string keydecryptedSettings
   * @param mixed defaultValue
   * @return mixed
   */
  async get(key, defaultValue = null) {
    let settings = await this.storage.getItem(key);

    if (!settings) return defaultValue;

    try {
      if (!settings) {
        this.remove(key);
        return defaultValue;
      }
    } catch (e) {
      this.remove(key);
      return defaultValue;
    }

    if (settings.expiresAt && settings.expiresAt < Date.now()) {
      this.remove(key);

      return defaultValue;
    }

    return settings.data;
  }

  /**
   * Determine if the given key exists in cache
   *
   * @param string key
   * @return bool
   */
  async has(key) {
    let value = await this.get(key);
    return !!value;
  }

  /**
   * Remove the given key from cache
   *
   * @param string key
   * @return void
   */
  remove(key) {
    return this.storage.removeItem(key);
  }

  /**
   * Clear the cache repository
   *
   * @return void
   */
  clear() {
    return this.storage.clear();
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
  alias: "db"
});
