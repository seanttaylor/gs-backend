/* istanbul ignore file */

import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client that can be used in public contexts with 
 * the anonymous credential
*/
class PubClient {
  instance;
  #SUPABASE_URL = process.env.SUPABASE_URL;
  #SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  constructor() {
    return createClient(this.#SUPABASE_URL, this.#SUPABASE_ANON_KEY);
  }
  
  /**
   * 
   * @returns {Object}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new PubClient();
    }
    return this.instance;
  }
}

/**
 * Supabase client for use **ONLY** in protected environments; uses the 
 * SUPABASE SERVICE ROLE for admin access to the database instance
*/
class AdminClient {
  instance;
  #SUPABASE_URL = process.env.SUPABASE_URL;
  #SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
  
  constructor() {
    return createClient(this.#SUPABASE_URL, this.#SUPABASE_SERVICE_ROLE);
  }
    
  /**
    * 
    * @returns {Object}
    */
  static getInstance() {
    if (!this.instance) {
      this.instance = new AdminClient();
    }
    return this.instance;
  }
}

export {
  AdminClient,
  PubClient
};