<?php

/** @see https://docs.moodle.org/dev/Plugin_types */

define('CLI_SCRIPT', true);
require __DIR__ . '/../plugins/config.php';

$pluginman = core_plugin_manager::instance();

foreach ($pluginman->get_plugin_types() as $type => $dir) {
    $dir = substr($dir, strlen($CFG->dirroot));
    printf("%-20s %-50s %s" . PHP_EOL, $type, $pluginman->plugintype_name_plural($type), $dir);
}
