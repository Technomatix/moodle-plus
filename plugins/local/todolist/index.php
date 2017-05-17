<?php

namespace local_todolist;

require_once __DIR__ . '/../../config.php';
require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/routes.php';

$app = new \Slim\App();
$app->get('/', $home);
$app->post('/item/', $post_item);
$app->put('/item/', $put_item);
$app->delete('/item/', $delete_item);
$app->run();
