<?php

use Functional as F;

defined('MOODLE_INTERNAL') || die();

require_once __DIR__ . '/../db/install.php';

class db_install_test extends advanced_testcase {

    /**
     * setUp
     */
    protected function setUp() {
        $this->resetAfterTest();
    }

    /**
     * tests xmldb_local_todolist_install
     */
    public function test_xmldb_local_todolist_install() {
        global $DB;
        $orig = (integer)$DB->count_records('local_todolist');
        xmldb_local_todolist_install();
        $this->assertSame($orig + 4, (integer)$DB->count_records('local_todolist'));
    }

}
