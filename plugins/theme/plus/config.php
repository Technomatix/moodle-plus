<?php

defined('MOODLE_INTERNAL') || die();

$THEME->name = 'plus';
$THEME->sheets = ['plus'];
$THEME->editor_sheets = [];
$THEME->parents = ['boost'];
$THEME->enable_dock = false;
$THEME->yuicssmodules = [];
$THEME->rendererfactory = 'theme_overridden_renderer_factory';
$THEME->requiredblocks = '';
$THEME->addblockposition = BLOCK_ADDBLOCK_POSITION_FLATNAV;
$THEME->javascripts_footer = [debugging() ? 'vendor' : 'vendor.min'];
$THEME->scss = function($theme) {
    return theme_plus_get_main_scss_content($theme);
};
