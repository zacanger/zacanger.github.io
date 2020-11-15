#!/usr/bin/env bash

template='<!DOCTYPE html><html lang=en><head><meta name="description" content="blog"/><title>blog</title><meta name=viewport content="width=device-width"><style>body{overflow-y:scroll;font-family:sans-serif}img,main,pre>code{display:block;margin:25px auto}main{padding:20px;max-width:600px;line-height:1.6;word-wrap:break-word}img{max-width:100%}pre>code{padding:20px;white-space:pre-wrap}code{background:#eee;padding:2px}blockquote{border-left:7px solid #ddd;padding:0 14px;color:#666;margin:0}h1,h2,h3,h4{line-height:1.2}hr{border:2px solid #ddd}</style></head><body><main>{{content}}</main><footer><a href="https://github.com/zacanger/zacanger.github.io/">Source</a></footer></body></html>'

mkdir -p posts

for md in src/*.md; do
  file_name=${md##*/}
  home=

  directory=$(echo $file_name | sed 's/.md//')

  if [[ $file_name == index.md ]]; then
    out_file="posts/index.html"
  else
    out_file="posts/$directory/index.html"
    home='<a href="/blog">blog</a>'
    mkdir -p posts/$directory
  fi

  cat \
    <<< "${template/'{{content}}'/${home}$(marked "$md")}" \
    > "$out_file"

  home=
done
