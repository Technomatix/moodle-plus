'use strict';

import _ from 'lodash';

/**
 * get current date
 * @return {Date}
 */
export const currentDate = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};

/**
 * convert given date string in 'YYYY-MM-DD' format to a Date instance
 * @param {string} date
 * @return {Date}
 */
export const dateFromString = date => {
    const bits = _.map(date.split('-'), i => parseInt(i));
    const d = new Date();
    d.setUTCFullYear(bits[0]);
    d.setUTCMonth(bits[1] - 1);
    d.setUTCDate(bits[2]);
    d.setUTCHours(0, 0, 0, 0);
    return d;
};

/**
 * determine whether given date string in 'YYYY-MM-DD' format is valid
 * @param {string} date
 * @returns {boolean}
 */
export const isValidDate = date => {
    if (_.isNull(date) || _.size(date) !== 'YYYY-MM-DD'.length) {
        return false;
    }
    return dateFromString(date).toISOString().substr(0, 'YYYY-MM-DD'.length) === date;
};
