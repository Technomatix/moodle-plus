<?php

use function Functional\each;

defined('MOODLE_INTERNAL') || die();

require_once __DIR__ . '/../../../../vendor/autoload.php';

function xmldb_local_todolist_install() {
    $tasks = [
        (object)[
            'desc' => 'Install Moodle',
            'done' => true,
        ],
        (object)[
            'desc' => 'Log into Moodle',
            'done' => true,
        ],
        (object)[
            'desc' => 'Visit /todolist/ in a browser',
            'done' => true,
        ],
        (object)[
            'desc' => 'Write some awesome plugins!',
            'done' => false,
        ],
    ];
    $now = time();

    each($tasks, function ($task) use ($now) {
        global $DB;
        $admin = get_admin();
        $DB->insert_record('local_todolist', (object)[
            'task_description'  => $task->desc,
            'is_done'           => $task->done ? 1 : 0,
            'due_timestamp'     => $now + 3600 * 24 * 7,
            'created_timestamp' => $now,
            'user_id'           => $admin->id,
        ]);
    });
}
