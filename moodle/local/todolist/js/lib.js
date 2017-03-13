'use strict';

/**
 * @return {Date}
 */
export const currentDate = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};
