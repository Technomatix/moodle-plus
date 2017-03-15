<?php

namespace local_todolist;

defined('MOODLE_INTERNAL') || die();

const PLUGIN = 'local_todolist';
const TABLE = 'local_todolist';

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
 * @return \local_todolist\output\renderer
 */
function get_plugin_renderer() {
    global $PAGE;
    $plugin_name = get_string('pluginname', PLUGIN);
    $PAGE->set_url('/local/todolist/');
    $PAGE->set_context(\context_system::instance());
    $PAGE->set_pagelayout('standard');
    $PAGE->set_title($plugin_name);
    $PAGE->set_heading($plugin_name);
    return $PAGE->get_renderer(PLUGIN);
}

/**
 * get items for the given user
 * @global \moodle_database $DB
 * @param \stdClass $user
 * @param integer $now
 * @return array
 */
function get_items_for_user(\stdClass $user, $now = null) {
    global $DB;
    $now = empty($now) ? strtotime(date('Y-m-d', time())) : $now;
    $records = $DB->get_recordset_select(
        TABLE,
        'user_id = :user_id AND (is_done = 0 OR due_timestamp >= :now)',
        [
            'user_id' => $user->id,
            'now'     => $now,
        ],
        'due_timestamp'
    );
    return array_values(iterator_to_array($records));
}

/**
 * gets the item with the given id from the database
 * @global \moodle_database $DB
 * @param integer $id
 * @return array
 */
function get_item($id) {
    global $DB;
    return (array)$DB->get_record(TABLE, ['id' => $id], '*', MUST_EXIST);
}

/**
 * create an item in the database
 * @global \moodle_database $DB
 * @param array $item
 * @param \stdClass $user
 * @param integer $now
 * @return array
 */
function create_item_for_user(array $item, \stdClass $user, $now = null) {
    global $DB;
    $item['user_id'] = $user->id;
    $item['created_timestamp'] = empty($now) ? strtotime(date('Y-m-d', time())) : $now;
    $item['is_done'] = '0';
    $id = $DB->insert_record(TABLE, (object)$item);
    return get_item($id);
}

/**
 * updates the database with the given item
 * @global \moodle_database $DB
 * @param array $item
 * @return array
 */
function update_item(array $item) {
    global $DB;
    $DB->update_record(TABLE, (object)$item);
    return get_item($item['id']);
}

/**
 * deletes the given item from the database
 * @global \moodle_database $DB
 * @param array $item
 * @return array
 */
function delete_item(array $item) {
    global $DB;
    $DB->delete_records(TABLE, [
        'id' => $item['id'],
    ]);
    return;
}