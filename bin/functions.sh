#!/bin/bash

parsePlus500js2api() {
	grep '^function ' js/plus500.js  | \
	perl -pe 's/.*function(.*) {/\1/g' > doc/plus500.api.txt
}
