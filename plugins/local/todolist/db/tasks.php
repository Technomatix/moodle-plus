<?php

defined('MOODLE_INTERNAL') || die();

$tasks = [
    [
        'classname' => 'local_todolist\task\remove_historic_items',
        'blocking'  => 0,
        'minute'    => 'R',
        'hour'      => '5',
        'day'       => '*',
        'dayofweek' => '*',
        'month'     => '*',
    ]
];
