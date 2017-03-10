<?php

namespace local_todolist;

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Slim\App;

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/lib.php';

const URL = '/todolist/';

/**
 * @param Request $request
 * @param Response $response
 * @return Response
 */
$home = function (Request $request, Response $response) {
    global $CFG, $USER;
    require_login();

    // get items belonging to the logged in user
    $todolist_items = json_encode(get_incomplete_items_for_user($USER));

    /** @var \local_todolist\output\renderer $output */
    $output = get_plugin_renderer(URL);

    // output
    $header = $output->header();
    $footer = $output->footer();
    $require_js = $CFG->wwwroot . '/lib/javascript.php/' . get_jsrev() . '/lib/requirejs/require.min.js';
    $bundle_js = $CFG->wwwroot . '/local/todolist/build/todolist.' . (debugging() ? 'js' : 'min.js');
    $footer = str_replace(
        '<script type="text/javascript" src="' . $require_js . '"></script>',
        '<script type="text/javascript">var require = function () {};</script>' .
        '<script type="application/json" class="todolist-items">' . $todolist_items . '</script>' .
        '<script type="text/javascript" src="' . $bundle_js . '"></script>',
        $footer
    );
    $response->getBody()->write($header . $footer);

    return $response;
};

$app = new App();
$app->get(URL, $home);
$app->run();
