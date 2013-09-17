#!/bin/bash

parsePlus500js2api() {
	grep '^function ' plus500.js | perl -pe 's/.*function(.*) {/\1/g' > plus500.api.txt
}
