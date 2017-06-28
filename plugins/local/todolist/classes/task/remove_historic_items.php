<?php

namespace local_todolist\task;

defined('MOODLE_INTERNAL') || die();

class remove_historic_items extends \core\task\scheduled_task {

    /**
     * @return string
     */
    public function get_name() {
        return 'Remove historic items';
    }

    /**
     * @param integer $now the current timestamp
     * @return void
     */
    public function execute($now = null) {
        global $DB;
        $now = empty($now) ? strtotime(date('Y-m-d') . ' UTC') : $now;
        $DB->delete_records_select(
            'local_todolist',
            'is_done = 1 AND due_timestamp < :now',
            ['now' => $now]
        );
    }

}
