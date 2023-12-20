import Ajv from 'ajv';

const ajv = new Ajv({ removeAdditional: true });

export class Validator {
  #validationStrategy;

  /**
   * Sets the validation strategy (JSON schema) for the validator
   * @param {Object} schema - A JSON schema object to use for validation
   */
  setStrategy(schema) {
    this.#validationStrategy = schema;
  }

  /**
   * Validates an object against the current validation strategy (schema)
   * @param {Object} ref - The reference object being validated against 
   * the schema
   * @returns {Object}
   */
  isValid(ref) {
    if (!this.#validationStrategy) {
      throw new Error('Validation strategy (schema) not set');
    }

    const valid = ajv.validate(this.#validationStrategy, ref);

    if (!valid) {
      return {
        valid: false,
        errors: ajv.errors,
      };
    }

    return {
      valid: true,
      errors: null,
    };
  }
}
