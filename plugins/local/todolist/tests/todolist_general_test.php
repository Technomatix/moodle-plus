<?php

use Functional as F;

defined('MOODLE_INTERNAL') || die();

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../routes_lib.php';
require_once __DIR__ . '/../classes/task/remove_historic_items.php';

class todolist_general_test extends advanced_testcase {

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
     * @return void
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
     * tests get_items_for_user sorts items by due date
     * @return void
     */
    public function test_get_items_for_user_sorts_items_by_due_date() {
        $expected = [
            $this->_now - 3600 * 24 * 1,
            $this->_now + 3600 * 24 * 1,
            $this->_now + 3600 * 24 * 2,
            $this->_now + 3600 * 24 * 3,
            $this->_now + 3600 * 24 * 4,
        ];
        $todolist_items = \local_todolist\get_items_for_user($this->_user, $this->_now);
        $timestamps = F\map($todolist_items, function ($item) {
            return (integer)$item->due_timestamp;
        });
        $this->assertEquals($expected, $timestamps);
    }

    /**
     * tests get_items_for_user excludes historic items
     * @return void
     */
    public function test_get_items_for_user_excludes_historic_items() {
        $todolist_items = \local_todolist\get_items_for_user($this->_user, $this->_now);
        $descriptions = F\map($todolist_items, function ($item) {
            return $item->task_description;
        });
        $this->assertContains('overdue', $descriptions);
        $this->assertNotContains('historic', $descriptions);
    }

    /**
     * tests get_items_for_user excludes other user's items
     * @return void
     */
    public function test_get_items_for_user_excludes_other_users() {
        $todolist_items = \local_todolist\get_items_for_user($this->_user, $this->_now);
        $descriptions = F\map($todolist_items, function ($item) {
            return $item->task_description;
        });
        $this->assertNotContains('others', $descriptions);
    }

    /**
     * tests getting an item
     * @return void
     */
    public function test_get_item() {
        $todolist_items = \local_todolist\get_items_for_user($this->_user, $this->_now);
        $item = $todolist_items[0];
        $item = \local_todolist\get_item($item->id);
        $this->assertEquals([
            'id' => $todolist_items[0]->id,
            'task_description' => $todolist_items[0]->task_description,
            'is_done' => $todolist_items[0]->is_done,
            'due_timestamp' => $todolist_items[0]->due_timestamp,
            'created_timestamp' => $todolist_items[0]->created_timestamp,
            'user_id' => $todolist_items[0]->user_id,
        ], $item);
    }

    /**
     * tests creating an item
     * @return void
     */
    public function test_create_item_for_user() {
        $one_day = $this->_now - 3600 * 24 * 1;
        $new_task_description = 'New task description';
        $item = [
            'due_timestamp'    => $one_day,
            'task_description' => $new_task_description,
        ];
        $item = \local_todolist\create_item_for_user((array)$item, $this->_user, $this->_now);
        $this->assertEquals([
            'id' => $item['id'],
            'task_description' => $new_task_description,
            'is_done' => '0',
            'due_timestamp' => $one_day,
            'created_timestamp' => (string)$this->_now,
            'user_id' => $this->_user->id,
        ], $item);
    }

    /**
     * tests updating an item
     * @return void
     */
    public function test_update_item() {
        $todolist_items = \local_todolist\get_items_for_user($this->_user, $this->_now);
        $item = $todolist_items[0];
        $modified_task_description = 'Modified task description';
        $item->task_description = $modified_task_description;
        $item = \local_todolist\update_item((array)$item);
        $this->assertEquals([
            'id' => $todolist_items[0]->id,
            'task_description' => $modified_task_description,
            'is_done' => $todolist_items[0]->is_done,
            'due_timestamp' => $todolist_items[0]->due_timestamp,
            'created_timestamp' => $todolist_items[0]->created_timestamp,
            'user_id' => $todolist_items[0]->user_id,
        ], $item);
    }

    /**
     * tests updating an item
     * @global moodle_database $DB
     * @return void
     */
    public function test_delete_item() {
        global $DB;
        $original_count = (integer)$DB->count_records('local_todolist');
        $todolist_items = \local_todolist\get_items_for_user($this->_user, $this->_now);
        $item = $todolist_items[0];
        \local_todolist\delete_item((array)$item);
        $this->assertEquals($original_count - 1, (integer)$DB->count_records('local_todolist'));
    }

    /**
     * tests removing historic items
     * @global moodle_database $DB
     * @return void
     */
    public function test_remove_historic_items() {
        global $DB;
        $task = new \local_todolist\task\remove_historic_items();
        $task->execute($this->_now);
        $records = $DB->get_recordset(
            'local_todolist',
            ['created_timestamp' => $this->_now],
            'task_description'
        );
        $todolist_items = array_values(iterator_to_array($records));
        $descriptions = F\map($todolist_items, function ($item) {
            return $item->task_description;
        });
        $this->assertNotContains('historic', $descriptions);
        $this->assertEquals([
            'abc',
            'bar',
            'foo',
            'others',
            'overdue',
            'xyz',
        ], $descriptions);
    }

}
