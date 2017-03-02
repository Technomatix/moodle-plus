<?php

namespace local_todolist;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Slim\App;

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../../vendor/autoload.php';

const URL = '/todolist/';
const PLUGIN = 'local_todolist';

/**
 * get JavaScript revision
 * @return integer
 */
$get_jsrev = function () {
    global $CFG;
    if (empty($CFG->cachejs)) {
        return -1;
    } else if (empty($CFG->jsrev)) {
        return 1;
    } else {
        return (integer)$CFG->jsrev;
    }
};

/**
 * @param Request $request
 * @param Response $response
 * @return Response
 */
$main = function (Request $request, Response $response) use ($get_jsrev) {
    /** @var \moodle_page $PAGE */
    global $PAGE;
    global $CFG, $DB, $USER;
    require_login();

    // page
    $plugin_name = get_string('pluginname', PLUGIN);
    $PAGE->set_url(URL);
    $PAGE->set_context(\context_system::instance());
    $PAGE->set_pagelayout('standard');
    $PAGE->set_title($plugin_name);
    $PAGE->set_heading($plugin_name);

    // get items belonging to the logged in user
    $records = $DB->get_recordset('local_todolist', ['user_id' => $USER->id], 'due_timestamp');
    $todolist_items = json_encode(array_values(iterator_to_array($records)));
    $bundle_ext = debugging() ? '.js' : '.min.js';

    /** @var \local_todolist\output\renderer $output */
    $output = $PAGE->get_renderer(PLUGIN);

    // output
    $header = $output->header();
    $footer = $output->footer();
    $footer = str_replace(
        '<script type="text/javascript" src="' . $CFG->wwwroot . '/lib/javascript.php/' . $get_jsrev() . '/lib/requirejs/require.min.js"></script>',
        '<script type="text/javascript">var require = function () {};</script>' .
        '<script type="application/json" class="todolist-items">' . $todolist_items . '</script>' .
        '<script type="text/javascript" src="' . $CFG->wwwroot . '/local/todolist/build/todolist' . $bundle_ext . '"></script>',
        $footer
    );
    $response->getBody()->write($header . $footer);

    return $response;
};

$app = new App();
$app->get(URL, $main);
$app->run();
