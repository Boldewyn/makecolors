all: js css

js: static/makecolor.min.js
static/makecolor.min.js: static/jquery-2.1.1.min.js static/jquery-ui.min.js static/makecolor.js
	( cat static/jquery-2.1.1.min.js; cat static/jquery-ui.min.js; echo '\n/* makecolor */'; uglifyjs -c -m < static/makecolor.js ) > $@

css: static/makecolor.min.css
static/makecolor.min.css: static/jquery-ui.css static/makecolor.css
	cat $^ | cssmin > $@
