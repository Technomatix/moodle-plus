<?php

defined('MOODLE_INTERNAL') || die();

require_once __DIR__ . '/../db/install.php';

class db_install_test extends advanced_testcase {

    /**
     * setUp
     * @return void
     */
    protected function setUp() {
        $this->resetAfterTest();
    }

    /**
     * tests xmldb_local_todolist_example_items
     * @return void
     */
    public function test_xmldb_local_todolist_example_items() {
        global $DB;
        $orig = (integer)$DB->count_records('local_todolist');
        xmldb_local_todolist_example_items();
        $this->assertSame($orig + 5, (integer)$DB->count_records('local_todolist'));
    }

}
