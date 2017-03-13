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
    $todolist_items = json_encode(get_items_for_user($USER));

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

/**
 * @param Request $request
 * @param Response $response
 * @return Response
 */
$post_item = function (Request $request, Response $response) {
    global $USER;
    $item = $request->getParsedBody();
    if (!isloggedin()) {
        return $response->withStatus(403);
    }
    $item = create_item_for_user($item, $USER);
    return $response->withJson($item);
};

/**
 * @param Request $request
 * @param Response $response
 * @return Response
 */
$put_item = function (Request $request, Response $response) {
    global $USER;
    $item = $request->getParsedBody();
    $current_item = get_item($item['id']);
    if (!isloggedin() || (integer)$USER->id !== (integer)$current_item['user_id']) {
        return $response->withStatus(403);
    }
    $item = update_item($item);
    return $response->withJson($item);
};

$app = new App();
$app->get(URL, $home);
$app->post(URL . 'item/', $post_item);
$app->put(URL . 'item/', $put_item);
$app->run();
