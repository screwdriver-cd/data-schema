'use strict';

/**
 * Scm spcific common objects
 * @type {Object}
 */
module.exports = {
    // SCM handles only SUCCESS, PENDING & FAILURE status
    SCM_STATUSES: ['PENDING', 'SUCCESS', 'FAILURE'],
    // // Map Build Status to SCM
    SCM_STATE_MAP: {
        ABORTED: 'FAILURE',
        CREATED: 'PENDING',
        FAILURE: 'FAILURE',
        QUEUED: 'PENDING',
        RUNNING: 'PENDING',
        SUCCESS: 'SUCCESS',
        BLOCKED: 'PENDING',
        UNSTABLE: 'PENDING',
        COLLAPSED: '',
        FROZEN: ''
    }
};
