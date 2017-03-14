'use strict';

/**
 * Patterns for common pieces
 * @type {Object}
 */
module.exports = {
    // Templates can only be named with A-Z,a-z,0-9,-,_,/
    TEMPLATE_NAME: /^[\w/-]+$/,
    // Version can only have up to 2 decimals, like 1.2.3
    VERSION: /^(\d+)?(\.\d+)?(\.\d+)?$/,
    // Full name of template and version. Example: chef/publish@1.2.3 or chef/publish@1-stable
    FULL_TEMPLATE_NAME: /^([\w/-]+)(@)?((\d+)?(\.\d+)?(\.\d+)?)(-[\w]+)?$/,
    // Steps can only be named with A-Z,a-z,0-9,-,_
    STEP_NAME: /^[\w-]+$/,
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    JOB_NAME: /^[\w-]+$/,
    // IEEE Std 1003.1-2001
    // Environment names contain uppercase letters, digits, and underscore
    // They cannot start with digits
    ENV_NAME: /^[A-Z_][A-Z0-9_]*$/,
    // Repo checkout url. For example: https://github.com/screwdriver-cd/data-schema.git#branchName or git@github.com:screwdriver-cd/data-schema.git
    // eslint-disable-next-line max-len
    CHECKOUT_URL: /^(?:(?:https?|git):\/\/)?(?:[^@]+@)?([^/:]+)(?:\/|:)([^/]+)\/([^.#]+)(?:\.git)?(#.+)?$/,
    // scmUri. For example: github.com:abc-123:master or bitbucket.org:{123}:master
    SCM_URI: /^([^:]+):([^:]+):([^:]+)$/
};
