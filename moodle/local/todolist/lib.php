<?php

namespace local_todolist;

defined('MOODLE_INTERNAL') || die();

const PLUGIN = 'local_todolist';

/**
 * get JavaScript revision
 * @return integer
 */
function get_jsrev() {
    global $CFG;
    if (empty($CFG->cachejs)) {
        return -1;
    } else if (empty($CFG->jsrev)) {
        return 1;
    } else {
        return (integer)$CFG->jsrev;
    }
}

/**
 * get plugin renderer
 * @global \moodle_page $PAGE
 * @param string $url
 * @return \local_todolist\output\renderer
 */
function get_plugin_renderer($url) {
    global $PAGE;
    $plugin_name = get_string('pluginname', PLUGIN);
    $PAGE->set_url($url);
    $PAGE->set_context(\context_system::instance());
    $PAGE->set_pagelayout('standard');
    $PAGE->set_title($plugin_name);
    $PAGE->set_heading($plugin_name);
    return $PAGE->get_renderer(PLUGIN);
}

/**
 * get incomplete items for the given user
 * @global \moodle_database $DB
 * @param \stdClass $user
 * @param integer $now
 * @return array
 */
function get_incomplete_items_for_user(\stdClass $user, $now = null) {
    global $DB;
    $now = empty($now) ? time() : $now;
    $records = $DB->get_recordset_select(
        'local_todolist',
        'user_id = :user_id AND (is_done = 0 OR due_timestamp >= :now)',
        [
            'user_id' => $user->id,
            'now'     => $now,
        ],
        'due_timestamp'
    );
    return array_values(iterator_to_array($records));
}
