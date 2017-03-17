<?php

namespace local_todolist;

defined('MOODLE_INTERNAL') || die();

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__ . '/routes_lib.php';

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
    $output = get_plugin_renderer();

    // get header and footer
    $header = $output->header();
    $footer = $output->footer();

    // replace RequireJS (which breaks Webpack bundles) with a no-op
    $require_min = $CFG->debugdeveloper ? 'js' : 'min.js';
    $require_js = $CFG->wwwroot . '/lib/javascript.php/' . get_jsrev() . '/lib/requirejs/require.' . $require_min;
    $footer = str_replace(
        '<script type="text/javascript" src="' . $require_js . '"></script>',
        '<script type="text/javascript">var require = function () {};</script>',
        $footer
    );

    // ensure this app bundle is loaded after the vendor bundle (from the 'plus' theme)
    $bundle_min = debugging() ? 'js' : 'min.js';
    $bundle_js = $CFG->wwwroot . '/local/todolist/build/todolist.' . $bundle_min;
    $todolist_items_js = '<script type="application/json" class="todolist-items">' . $todolist_items . '</script>';
    $footer_js = '/footer">';
    $footer = str_replace(
        $footer_js,
        $footer_js . '</script>' . $todolist_items_js . '<script type="text/javascript" src="' . $bundle_js . '"></script>',
        $footer
    );

    // output
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
    return $response->withJson($item, 201);
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

/**
 * @param Request $request
 * @param Response $response
 * @return Response
 */
$delete_item = function (Request $request, Response $response) {
    global $USER;
    $item = $request->getParsedBody();
    $current_item = get_item($item['id']);
    if (!isloggedin() || (integer)$USER->id !== (integer)$current_item['user_id']) {
        return $response->withStatus(403);
    }
    $item = delete_item($item);
    return $response->withStatus(204);
};
