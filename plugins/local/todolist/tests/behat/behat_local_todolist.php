<?php

use Behat\Gherkin\Node\TableNode as TableNode;
use Functional as F;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../../../../vendor/moodle/moodle/lib/behat/behat_base.php';

class behat_local_todolist extends behat_base {

    /**
     * @Given /^the user "(?P<username_string>(?:[^"]|\\")*)" has the following TODO items:$/
     */
    public function user_has_todolist_items($username, TableNode $node) {
        global $DB;
        $user = $DB->get_record('user', ['username' => $username], 'id', MUST_EXIST);
        $now = strtotime(date('Y-m-d') . ' UTC');
        F\each($node->getHash(), function ($task) use ($DB, $user, $now) {
            $DB->insert_record('local_todolist', (object)[
                'task_description'  => $task['description'],
                'is_done'           => $task['is done'] === 'yes' ? 1 : 0,
                'due_timestamp'     => strtotime($task['due'] . ' UTC'),
                'created_timestamp' => $now,
                'user_id'           => $user->id,
            ]);
        });
    }

    /**
     * @Given /^I add a new item with due date "(?P<due_string>(?:[^"]|\\")*)" and description "(?P<desc_string>(?:[^"]|\\")*)"$/
     */
    public function i_add_a_new_item($due, $desc) {
        $page = $this->getSession()->getPage();
        $page->fillField('Due', $due);
        $page->fillField('Description', $desc);
    }

}
