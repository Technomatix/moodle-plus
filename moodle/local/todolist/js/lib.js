'use strict';

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
    const bits = date.split('-').map(i => parseInt(i));
    return new Date(Date.UTC(bits[0], bits[1] - 1, bits[2]));
};

/**
 * determine whether given date string in 'YYYY-MM-DD' format is valid
 * @param {string} date
 * @returns {boolean}
 */
export const isValidDate = date => {
    if (date === null || date.length !== 'YYYY-MM-DD'.length) {
        return false;
    }
    return dateFromString(date).toISOString().substr(0, 'YYYY-MM-DD'.length) === date;
};

/**
 * get a Moodle language string that's been exported for JavaScript
 * @param {string} id
 * @returns {string}
 */
export const getLangString = id => M.util.get_string(`js:${id}`, 'local_todolist');
