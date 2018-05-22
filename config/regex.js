'use strict';

/**
 * Patterns for common pieces
 * @type {Object}
 */
module.exports = {
    // Command namespaces can only be named with A-Z,a-z,0-9,-,_
    COMMAND_NAMESPACE: /^[\w-]+$/,
    // Command names can only be named with A-Z,a-z,0-9,-,_
    COMMAND_NAME: /^[\w-]+$/,
    // Command tags must start with an alpha character (A-Z,a-z) and can only contain A-Z,a-z,0-9,-,_
    COMMAND_TAG_NAME: /^[a-zA-Z][\w-]+$/,
    // Full name of command and version. Can be <COMMAND_NAMESPACE>/<COMMAND_NAME>@<VERSION> or <COMMAND_NAMESPACE>/<COMMAND_NAME>@<COMMAND_TAG_NAME>
    // Example: chefdk/knife@1.2.3 or chefdk/knife@stable
    // Only <COMMAND_NAMESPACE>/<COMMAND_NAME> or <COMMAND_NAMESPACE>/<COMMAND_NAME> is also acceptable
    FULL_COMMAND_NAME:
        /^([\w-]+)\/([\w-]+)(?:@((?:(?:\d+)(?:\.\d+)?(?:\.\d+)?)|(?:[a-zA-Z][\w-]+)))?$/,
    // Templates can only be named with A-Z,a-z,0-9,-,_,/
    TEMPLATE_NAME: /^[\w/-]+$/,
    // Template tags must start with an alpha character (A-Z,a-z) and can only contain A-Z,a-z,0-9,-,_
    TEMPLATE_TAG_NAME: /^[a-zA-Z][\w-]+$/,
    // Version can only have up to 2 decimals, like 1.2.3
    // It can also be just major or major and minor versions, like 1 or 1.2
    VERSION: /^(\d+)(\.\d+)?(\.\d+)?$/,
    // Exact version should contain the major, minor, and patch versions, e.g. 1.2.3
    EXACT_VERSION: /^(\d+)\.(\d+)\.(\d+)$/,
    // Full name of template and version. Can be <TEMPLATE_NAME>@<VERSION> or <TEMPLATE_NAME>@<TEMPLATE_TAG_NAME>
    // Example: chef/publish@1.2.3 or chef/publish@stable
    // Only <TEMPLATE_NAME> or <TEMPLATE_NAME>@ is also acceptable
    FULL_TEMPLATE_NAME: /^([\w/-]+)(?:@((?:(?:\d+)(?:\.\d+)?(?:\.\d+)?)|(?:[a-zA-Z][\w-]+)))?$/,
    // Steps can only be named with A-Z,a-z,0-9,-,_
    STEP_NAME: /^[\w-]+$/,
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    JOB_NAME: /^[\w-]+$/,
    // PR JOB Name can only be PR-1 or PR-1:main, group1: PR-prNum, group2: jobName
    PR_JOB_NAME: /^(PR-\d+)(?::([\w-]+))?$/,
    // External trigger like ~sd@123:component
    EXTERNAL_TRIGGER: /^~sd@(\d+):([\w-]+)$/,
    // Can be ~pr, ~commit, or ~commit:branchName, or ~sd@123:component
    TRIGGER: /^~(sd@\d+:[\w-]+|pr|commit(:.+)?)$/,
    // IEEE Std 1003.1-2001
    // Environment names contain uppercase letters, digits, and underscore
    // They cannot start with digits
    ENV_NAME: /^[A-Z_][A-Z0-9_]*$/,
    // Repo checkout url. For example: https://github.com/screwdriver-cd/data-schema.git#branchName or git@github.com:screwdriver-cd/data-schema.git
    // eslint-disable-next-line max-len
    CHECKOUT_URL: /^(?:(?:https?|git):\/\/)?(?:[^@]+@)?([^/:]+)(?:\/|:)([^/]+)\/(.+?)(?:\.git)?(#.+)?$/,
    // scmUri. For example: github.com:abc-123:master or bitbucket.org:{123}:master
    SCM_URI: /^([^:]+):([^:]+):([^:]+)$/,
    // Image aliases can only contain A-Z,a-z,0-9,-,_
    IMAGE_ALIAS: /^[\w-]+$/
};
