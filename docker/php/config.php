<?php  // Moodle configuration file

unset($CFG);
global $CFG;
$CFG = new stdClass();

$CFG->dbtype    = 'pgsql';
$CFG->dblibrary = 'native';
$CFG->dbhost    = 'pgsql';
$CFG->dbname    = 'moodle';
$CFG->dbuser    = 'postgres';
$CFG->dbpass    = 'Wibble123!';
$CFG->prefix    = 'mdl_';
$CFG->dboptions = array (
  'dbpersist' => 0,
  'dbport' => 5432,
  'dbsocket' => '',
);

$CFG->wwwroot   = 'http://localhost';
$CFG->dataroot  = '/var/www/html/moodledata';
$CFG->admin     = 'admin';

$CFG->directorypermissions = 0777;

$CFG->session_file_save_path = '/tmp/';

require_once(__DIR__ . '/lib/setup.php');

// There is no php closing tag in this file,
// it is intentional because it prevents trailing whitespace problems!
