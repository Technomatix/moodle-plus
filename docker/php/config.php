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
$CFG->dataroot  = '/var/www/html/moodledata/main';
$CFG->admin     = 'admin';

$CFG->phpunit_prefix   = 'phpu_';
$CFG->phpunit_dataroot = '/var/www/html/moodledata/phpu';

$CFG->behat_prefix        = 'behat_';
$CFG->behat_dataroot      = '/var/www/html/moodledata/behat';
$CFG->behat_wwwroot       = 'http://0.0.0.0:8000'; # IP address of the Docker container running the 'builtin' service
$CFG->behat_faildump_path = $CFG->behat_dataroot;

$CFG->directorypermissions = 0777;

$CFG->session_file_save_path = '/tmp/';

require_once(__DIR__ . '/lib/setup.php');

// There is no php closing tag in this file,
// it is intentional because it prevents trailing whitespace problems!
