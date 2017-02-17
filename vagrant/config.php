<?php  // Moodle configuration file

unset($CFG);
global $CFG;
$CFG = new stdClass();

$CFG->dbtype    = 'pgsql';
$CFG->dblibrary = 'native';
$CFG->dbhost    = 'localhost';
$CFG->dbname    = 'moodle';
$CFG->dbuser    = 'postgres';
$CFG->dbpass    = '{{ general_password }}';
$CFG->prefix    = 'mdl_';

$CFG->dboptions = [
    'dbpersist' => 0,
    'dbport'    => 5432,
    'dbsocket'  => '',
];

$CFG->wwwroot  = 'http://10.0.0.10';
$CFG->dataroot = '{{ moodledata }}main';
$CFG->admin    = 'admin';

$CFG->phpunit_prefix   = 'phpu_';
$CFG->phpunit_dataroot = '{{ moodledata }}phpu';

$CFG->behat_prefix   = 'behat_';
$CFG->behat_dataroot = '{{ moodledata }}behat';
$CFG->behat_wwwroot  = 'http://localhost:8000';

$CFG->directorypermissions = 0777;

$CFG->session_file_save_path = '/tmp/';

require_once(__DIR__ . '/lib/setup.php');

// There is no php closing tag in this file,
// it is intentional because it prevents trailing whitespace problems!
