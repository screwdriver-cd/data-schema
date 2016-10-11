'use strict';

/**
 * Patterns for common pieces
 * @type {Object}
 */
module.exports = {
    // Steps can only be named with A-Z,a-z,0-9,-,_
    STEP_NAME: /^[\w-]+$/,
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    JOB_NAME: /^[\w-]+$/,
    // IEEE Std 1003.1-2001
    // Environment names contain uppercase letters, digits, and underscore
    // They cannot start with digits
    ENV_NAME: /^[A-Z_][A-Z0-9_]*$/,
    // Repo checkout url. For example: https://github.com/screwdriver-cd/data-schema.git or git@github.com:screwdriver-cd/data-schema.git
    CHECKOUT_URL: /^(https:\/\/([^\/]+)\/|git@([^:]+):)([^\/]+)\/(.+?)\.git(#.+)?$/,
    // scmUri. For example: github.com:abc-123:master
    SCM_URI: /^([^:]+):([\w-]+):(.+)$/
};
