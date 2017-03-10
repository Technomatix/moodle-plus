<?php

use Functional as F;

defined('MOODLE_INTERNAL') || die();

require_once __DIR__ . '/../lib.php';

class todolist_lib_test extends advanced_testcase {

    /**
     * @var \stdClass
     */
    protected $_user;

    /**
     * @var integer
     */
    protected $_now;

    /**
     * setUp
     */
    protected function setUp() {
        $this->_user = $user = $this->getDataGenerator()->create_user();
        $this->_now = $now = mktime(0, 0, 0, 3, 1, 2017);
        $other_user = $this->getDataGenerator()->create_user();

        $one_day_ago = $now - 3600 * 24 * 1;
        $one_day     = $now + 3600 * 24 * 1;
        $two_day     = $now + 3600 * 24 * 2;
        $three_day   = $now + 3600 * 24 * 3;
        $four_day    = $now + 3600 * 24 * 4;

        $this->loadDataSet($this->createArrayDataSet([
            'local_todolist' => [
                ['task_description', 'is_done', 'due_timestamp', 'created_timestamp', 'user_id'],
                ['foo',      0, $three_day,   $now, $user->id],
                ['overdue',  0, $one_day_ago, $now, $user->id],
                ['bar',      0, $two_day,     $now, $user->id],
                ['abc',      1, $one_day,     $now, $user->id],
                ['xyz',      1, $four_day,    $now, $user->id],
                ['historic', 1, $one_day_ago, $now, $user->id],
                ['others',   0, $two_day,     $now, $other_user->id],
            ],
        ]));
        $this->resetAfterTest();
    }

    /**
     * tests get_incomplete_items_for_user sorts items by due date
     */
    public function test_get_incomplete_items_for_user_sorts_items_by_due_date() {
        $expected = [
            $this->_now - 3600 * 24 * 1,
            $this->_now + 3600 * 24 * 1,
            $this->_now + 3600 * 24 * 2,
            $this->_now + 3600 * 24 * 3,
            $this->_now + 3600 * 24 * 4,
        ];
        $todolist_items = \local_todolist\get_incomplete_items_for_user($this->_user, $this->_now);
        $timestamps = F\map($todolist_items, function ($item) {
            return (integer)$item->due_timestamp;
        });
        $this->assertEquals($expected, $timestamps);
    }

    /**
     * tests get_incomplete_items_for_user excludes historic items
     */
    public function test_get_incomplete_items_for_user_excludes_historic_items() {
        $todolist_items = \local_todolist\get_incomplete_items_for_user($this->_user, $this->_now);
        $descriptions = F\map($todolist_items, function ($item) {
            return $item->task_description;
        });
        $this->assertContains('overdue', $descriptions);
        $this->assertNotContains('historic', $descriptions);
    }

    /**
     * tests get_incomplete_items_for_user excludes other user's items
     */
    public function test_get_incomplete_items_for_user_excludes_other_users() {
        $todolist_items = \local_todolist\get_incomplete_items_for_user($this->_user, $this->_now);
        $descriptions = F\map($todolist_items, function ($item) {
            return $item->task_description;
        });
        $this->assertNotContains('others', $descriptions);
    }

}
