<?php

defined('MOODLE_INTERNAL') || die();

/**
 * @return void
 */
function xmldb_local_todolist_install() {
    chdir(__DIR__ . '/..');
    system('php composer.phar self-update 2>&1');
    system('php composer.phar install 2>&1');
    xmldb_local_todolist_example_items();
}

/**
 * @return void
 */
function xmldb_local_todolist_example_items() {
    $tasks = [
        (object)[
            'desc' => 'Start using React',
            'done' => false,
            'past' => true,
        ],
        (object)[
            'desc' => 'Install Moodle',
            'done' => true,
            'past' => false,
        ],
        (object)[
            'desc' => 'Log into Moodle',
            'done' => true,
            'past' => false,
        ],
        (object)[
            'desc' => 'Visit /local/todolist/ in a browser',
            'done' => true,
            'past' => false,
        ],
        (object)[
            'desc' => 'Write some awesome plugins!',
            'done' => false,
            'past' => false,
        ],
    ];
    $now = strtotime(date('Y-m-d') . ' UTC');

    array_map(function ($task) use ($now) {
        global $DB;
        $admin = get_admin();
        $due_timestamp = $task->past ? $now - 3600 * 24 * 7 : $now + 3600 * 24 * 7;
        return $DB->insert_record('local_todolist', (object)[
            'task_description'  => $task->desc,
            'is_done'           => $task->done ? 1 : 0,
            'due_timestamp'     => $due_timestamp,
            'created_timestamp' => $now,
            'user_id'           => $admin->id,
        ]);
    }, $tasks);
}
