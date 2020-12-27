#!/usr/bin/env bash
set -e

# Mac/BSD compatibility
if hash gfind 2>/dev/null; then
  _find='gfind'
else
  _find='find'
fi
if hash gsed 2>/dev/null; then
  _sed='gsed'
else
  _sed='sed'
fi

ROOT="https://zacanger.com/"

# begin new sitemap
exec 1> sitemap.xml

# print head
echo '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'

# print urls
$_find . -type f -name '*.html' -printf "%TY-%Tm-%Td%p\n" | \
  $_sed "/blog\/templates/d" | $_sed "/presentations\/__template/d" | \
  while read -r line; do
    date=${line:0:10}
    file_html=${line:12}
    file=${file_html%index.html}

    # If it's a blog post, assume the date is the created date
    blog_post_date=$(grep '<h3>' "$file_html" | \
      grep -E '[0-9]{4}-[0-9]{2}-[0-9]{2}' | \
      $_sed 's/<[^>]*>//g' | \
      xargs)

    if [[ -n $blog_post_date ]]; then
      date="$blog_post_date"
    fi

    # options: always hourly daily weekly monthly yearly never
    freq="weekly"
    priority=0.5

    if [[ $file == "" ]]; then
      priority=1.0
      freq="monthly"
    elif [[ $file == "cv/" ]]; then
      priority=0.9
      freq="monthly"
    elif [[ $file == "presentations/" ]]; then
      priority=0.4
      freq="yearly"
    elif [[ $file == "blog/" ]]; then
      priority=0.6
      freq="weekly"
    elif [[ $file == "404.html" ]]; then
      priority=0.0
      freq="never"
    fi

    uri=${ROOT}${file}

    echo "<url>
  <loc>$uri</loc>
  <lastmod>$date</lastmod>
  <changefreq>$freq</changefreq>
  <priority>$priority</priority>
</url>"
  done

# A couple of extras that show up because they're on GitHub Pages
echo "<url>
  <loc>https://zacanger.com/hey-you/</loc>
  <lastmod>2020-01-19</lastmod>
  <priority>0.3</priority>
</url>
<url>
  <loc>https://zacanger.com/zeess/</loc>
  <lastmod>2020-01-19</lastmod>
  <priority>0.0</priority>
</url>
<url>
  <loc>https://zacanger.com/teamethod/</loc>
  <lastmod>2020-01-19</lastmod>
  <priority>0.1</priority>
</url>
<url>
  <loc>https://zacanger.com/zeelib/</loc>
  <lastmod>2020-01-19</lastmod>
  <priority>0.2</priority>
</url>"

# Close it out
echo "</urlset>"
