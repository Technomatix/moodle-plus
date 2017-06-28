<?php

namespace local_todolist;

use Functional as F;

defined('MOODLE_INTERNAL') || die();

const PLUGIN = 'local_todolist';
const TABLE = 'local_todolist';

/**
 * gets language strings in the plugin that are prefixed with 'js:' and therefore intended for JavaScript
 * @return array
 */
function get_javascript_lang_strings() {
    $string = [];
    include __DIR__ . '/lang/en/local_todolist.php';
    return F\filter(array_keys($string), function ($key) {
        return substr($key, 0, 3) === 'js:';
    });
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
    $PAGE->requires->strings_for_js(get_javascript_lang_strings(), PLUGIN);
    return $PAGE->get_renderer(PLUGIN);
}

/**
 * get items for the given user
 * @global \moodle_database $DB
 * @param  \stdClass $user a user
 * @param  integer   $now  the current time
 * @return array
 */
function get_items_for_user(\stdClass $user, $now = null) {
    global $DB;
    $now = empty($now) ? strtotime(date('Y-m-d') . ' UTC') : $now;
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
 * @param integer $id primary key
 * @return array
 */
function get_item($id) {
    global $DB;
    return (array)$DB->get_record(TABLE, ['id' => $id], '*', MUST_EXIST);
}

/**
 * create an item in the database
 * @global \moodle_database $DB
 * @param array     $item the item to create
 * @param \stdClass $user a user
 * @param integer   $now  the current time
 * @return array
 */
function create_item_for_user(array $item, \stdClass $user, $now = null) {
    global $DB;
    $item['user_id'] = $user->id;
    $item['created_timestamp'] = empty($now) ? strtotime(date('Y-m-d') . ' UTC') : $now;
    $item['is_done'] = '0';
    $id = $DB->insert_record(TABLE, (object)$item);
    return get_item($id);
}

/**
 * updates the database with the given item
 * @global \moodle_database $DB
 * @param array $item the item to update
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
 * @param array $item the item to delete
 * @return array
 */
function delete_item(array $item) {
    global $DB;
    $DB->delete_records(TABLE, [
        'id' => $item['id'],
    ]);
    return;
}
