<?php

/**
 * Step 0: Require db utility
 */
require 'dbutility.php';

/**
 * Step 1: Require the Slim Framework
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();


/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

////////////////
// GET routes //
////////////////

// Get api status
$app->get('/', function(){
	echo 'Chi dorme non piglia pesci.</br>';
	echo 'Piero :)';
});

// Get
$app->get('/groups/', function(){
	jsonDB('SELECT * FROM groups');
});

// Get
$app->get('/players/', function(){
	jsonDB('SELECT * FROM players');
});

// Get
$app->get('/matches/', function(){
	jsonDB('SELECT * FROM matches');
});

/////////////////
// POST routes //
/////////////////



////////////////
// PUT routes //
////////////////

// Update player
$app->put('/players/', function() use($app) {
	print_r( $app->request()->getBody() );
});


///////////////////
// DELETE routes //
///////////////////



/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
