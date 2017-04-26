<?php

define('CLI_SCRIPT', true);
require_once __DIR__ . '/../moodle/config.php';
require_once $CFG->dirroot . '/lib/csslib.php';

$themename = $CFG->theme;
$theme = theme_config::load($themename);
$rev = $CFG->themerev;
$candidatedir = "$CFG->localcachedir/theme/$rev/$themename/css";
$candidatesheet = "$candidatedir/all.css";

if (!file_exists($candidatesheet)) {
    printf('Rebuilding theme ...' . PHP_EOL);
    $csscontent = $theme->get_css_content();
    $relroot = preg_replace('|^http.?://[^/]+|', '', $CFG->wwwroot);
    $chunkurl = "{$relroot}/theme/styles.php/{$themename}/{$rev}/all";
    css_store_css(
        $theme,
        $candidatesheet,
        $csscontent,
        true,
        $chunkurl
    );
}
