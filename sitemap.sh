#!/usr/bin/env bash
set -e

# Mac/BSD compatibility
if hash gfind 2>/dev/null; then
  _find=gfind
else
  _find=find
fi
if hash gsed 2>/dev/null; then
  _sed=gsed
else
  _sed=sed
fi

ROOT="https://zacanger.com/"


# begin new sitemap
exec 1> sitemap.xml

# print head
echo '<?xml version="1.0" encoding="UTF-8"?>'
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'

# print urls
$_find . -type f -name '*.html' -printf "%TY-%Tm-%Td%p\n" | \
while read -r line; do
  date=${line:0:10}
  file_html=${line:12}
  file=${file_html%index.html}

  # options: always hourly daily weekly monthly yearly never
  freq="weekly"
  priority=0.5

  if [[ $file == "" ]]; then
    priority=1.0
    freq="monthly"
  elif [[ $file == "cv" ]]; then
    priority=0.8
    freq="monthly"
  elif [[ $file == "presentations" ]]; then
    priority=0.4
    freq="yearly"
  elif [[ $file == "blog" ]]; then
    priority=0.6
    freq="daily"
  elif [[ $file == "404.html" ]]; then
    priority=0.2
    freq="never"
  fi

  uri=${ROOT}${file}

  echo "<url>"
  echo "  <loc>$uri</loc>"
  echo "  <lastmod>$date</lastmod>"
  echo "  <changefreq>$freq</changefreq>"
  echo "  <priority>$priority</priority>"
  echo "</url>"
done

# print foot
echo "</urlset>"
