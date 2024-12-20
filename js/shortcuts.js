jQuery(document).ready(function($) {
    console.log('Keyboard shortcut script loaded');

    // Function to handle the publish action
    function handlePublish(e) {
        // Check for Cmd+Enter (Mac) or Ctrl+Enter (Windows)
        if ((e.metaKey || e.ctrlKey) && e.keyCode === 13) {
            console.log('Cmd/Ctrl + Enter detected');
            e.preventDefault();
            e.stopPropagation();
            
            // Transfer any pending edits to the editor
            if (typeof tinyMCE !== 'undefined' && tinyMCE.activeEditor) {
                tinyMCE.activeEditor.save();
            }
            
            // Click the publish/update button
            const publishButton = $('#publish');
            if (publishButton.length) {
                console.log('Clicking publish button');
                publishButton.click();
                
                // Wait for a moment to ensure the post is published
                setTimeout(function() {
                    console.log('Redirecting to homepage');
                    window.location.href = keyboardShortcutData.home_url;
                }, 1000);
            }
            
            return false;
        }
    }

    // Attach the handler to both document and specific editor areas
    $(document).on('keydown', handlePublish);
    
    // For the classic editor
    $('#content, #content_ifr').on('keydown', handlePublish);
    
    // For the TinyMCE editor iframe
    if (typeof tinyMCE !== 'undefined') {
        tinyMCE.on('AddEditor', function(e) {
            e.editor.on('keydown', handlePublish);
        });
    }
    
    // For Gutenberg blocks
    $('.block-editor').on('keydown', handlePublish);
    $('.wp-block').on('keydown', handlePublish);
    $('.editor-writing-flow').on('keydown', handlePublish);
    
    // Capture events in any iframe content
    $('iframe').each(function() {
        try {
            $(this.contentDocument).on('keydown', handlePublish);
        } catch(e) {
            console.log('Could not bind to iframe:', e);
        }
    });
});
