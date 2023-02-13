#!/bin/bash

sed -i 's|src="/assets/\(.*\.js\)"|src={{ url_for("static", filename="\1" ) }}|g' ../backend/templates/index.html 
sed -i "s|\"/assets/\(index.*\.css\)\"|{{ url_for('static', filename='\1') }}|g" ../backend/templates/index.html
echo 'finished changing index.html to match flask conventions'
