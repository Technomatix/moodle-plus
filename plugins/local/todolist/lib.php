<?php

defined('MOODLE_INTERNAL') || die();

/**
 * @param global_navigation $nav
 */
function local_todolist_extend_navigation(global_navigation $nav) {
    $node = \navigation_node::create(
        'TODO list',
        new \moodle_url('/local/todolist/')
    );
    $node->showinflatnavigation = true;
    $nav->add_node($node);
}
