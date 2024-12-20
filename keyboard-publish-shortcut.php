<?php
/*
Plugin Name: Keyboard Publish Shortcut
Description: Adds Cmd+Enter (Mac) or Ctrl+Enter (Windows) shortcut to publish posts and redirect to homepage
Version: 1.0
Author: Richard Emerson
*/

// Prevent direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

function keyboard_publish_shortcut_enqueue_scripts() {
    // Only load on post editor screens
    $screen = get_current_screen();
    if ($screen && ($screen->base === 'post' || $screen->base === 'post-new')) {
        wp_enqueue_script(
            'keyboard-publish-shortcut',
            plugins_url('js/shortcuts.js', __FILE__),
            array('jquery'),
            '1.0',
            true
        );

        // Pass WordPress data to our script
        wp_localize_script(
            'keyboard-publish-shortcut',
            'keyboardShortcutData',
            array(
                'home_url' => home_url(),
                'ajax_url' => admin_url('admin-ajax.php')
            )
        );
    }
}
add_action('admin_enqueue_scripts', 'keyboard_publish_shortcut_enqueue_scripts');

// Add AJAX handler for redirect
function handle_post_publish_redirect() {
    wp_send_json_success(array('redirect_url' => home_url()));
}
add_action('wp_ajax_post_publish_redirect', 'handle_post_publish_redirect');
