# Accessible Hide/Show

A simple, yet fairly complex (and accessible) hide/show toggle behavior

View the Pen: http://codepen.io/timwright12/pen/yerzqG

## Syntax for using a button as the toggle

	<button
		type="button"
		data-action="hide-show"
		data-text="Hide"
		data-class="is-hidden"
		aria-controls="your-target-id"
		aria-live="polite"
		aria-expanded="false">
		Show
	</button>

	<div id="your-target-id" class="is-hidden"></div>

### type="button"

This is standard HTML to make a button be a button.


### data-action="hide-show"

This attribute calls the plugin on this element.

### data-text="hide"

This is the text you want to replace the current button text when the toggle happens, it is optional.

### data-class="is-hidden"

If you're using a class to hide content, add that here otherwise the plugin will just use JavaScript, this is optional

### aria-controls="your-target-id"

This tells the plugin which `div` to target for the hide-show. It is the ID attribute for the element.

### aria-live="polite"

If you're updating the button text iwht data-text, you'll need this to alert screen readers.

### aria-expanded="false"

The default state of the target area, false = closed, true = open

## Syntax for using a link as the toggle

This could have all the say attributes as the button toggle, but some are a bit redundant

	<a
		href="#your-target-id-2"
		data-action="hide-show"
		data-text="Hide"
		data-class="is-hidden"
		aria-live="polite">
		Show
	</a>

	<div id="your-target-id-2" class="is-hidden"></div>
