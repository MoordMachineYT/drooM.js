"use strict";

/**
 * @interface CommandExecutor
 */
class CommandExecutor {
  /**
   * Executes before any permission checks are done (useful for analytics or custom permission checks)
   * @abstract
   * @returns {Boolean}
   */
  preExecute() {
    return true;
  }
  /**
   * Executes when permission checks were successfully completed
   * @abstract
   * @returns {Boolean}
   */
  execute() {
    return true;
  }
  /**
   * Executes after the core instructions were successfully executed (useful for analytics or updating configs)
   * @abstract
   */
  postExecute() {}
}

module.exports = CommandExecutor;