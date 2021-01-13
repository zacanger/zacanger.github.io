#!/usr/bin/env python3

import os
import shutil
import yaml
import re
from datetime import datetime
from jinja2 import Environment, select_autoescape, FileSystemLoader
import markdown
from mdx_gfm import PartialGithubFlavoredMarkdownExtension
from feedgen.feed import FeedGenerator

# TODO: This module is a binding to github's cmark fork,
# so it includes all the stuff i want, but it's a brand new
# project so I want to make sure it's stable before switching.
# import pycmarkgfm

# settings
my_name = "Zac Anger"
blog_title = my_name + "'s Blog"
site_root = "https://zacanger.com"
blog_root = site_root + "/blog/"
src_dir = "./src"
all_posts = os.listdir(src_dir)
out_dir = "posts"
templates_dir = "./templates"
index = "index.html"
jinja_env = Environment(loader=FileSystemLoader("templates"))


def render_md(source):
    # TODO: See above.
    # return pycmarkgfm.gfm_to_html(source)
    return markdown.markdown(
        source,
        extensions=[PartialGithubFlavoredMarkdownExtension(), "toc", "extra"],
    )


def generate_index(data):
    template = jinja_env.get_template(index)
    rendered = template.render({"posts": data})
    with open(index, "w") as i:
        i.write(rendered)
        i.close()


def generate_feed(data):
    fg = FeedGenerator()
    fg.id(blog_root)
    fg.title(blog_title)
    fg.author({"name": my_name})
    fg.link(href=blog_root)
    fg.description("Programming, socialism, and Buddhism.")
    fg.language("en")

    for entry in data:
        url = site_root + entry["href"]
        # This causes every post to have a pubDate of midnight MST,
        # but since I don't keep track of the actual time, it's
        # close enough.
        published = datetime.strptime(
            str(entry["created"]) + "--07:00", "%Y-%m-%d-%z"
        )
        fe = fg.add_entry()
        fe.id(url)
        fe.title(entry["title"])
        fe.link(href=url)
        fe.author({"name": my_name})
        fe.description(entry["body"])
        fe.pubDate(published)

    fg.rss_file("rss.xml")


def process_post(post):
    destination_dir = out_dir + "/" + post.replace(".md", "")
    destination_file = destination_dir + "/" + index
    os.makedirs(destination_dir)

    with open(src_dir + "/" + post) as p:
        contents = p.read()
        # Split out frontmatter. This will return an empty string, the
        # frontmatter yaml, and then the post body which may have more
        # occurrences of ---.
        parts = contents.split("---", 2)
        try:
            metadata = yaml.safe_load(parts[1])
        except IndexError:
            print("File missing frontmatter:", post)
            return
        metadata["href"] = "/blog/" + destination_dir
        try:
            body = render_md(parts[2])
        except IndexError:
            print("File missing body after frontmatter:", post)
            return
        template = jinja_env.get_template("post.html")

        required_keys = ["title", "created", "tags"]
        for k in required_keys:
            if k not in metadata:
                print("Key", k, "not in file", post)
                return

        rendered = template.render(
            {
                "post": {
                    "title": metadata["title"],
                    "created": metadata["created"],
                    "tags": metadata["tags"],
                    "starred": metadata.get("starred", False),
                    "body": body,
                }
            }
        )

        with open(destination_file, "w") as d:
            d.write(rendered)
            d.close()

    # returned for use in generating index and rss
    return {**metadata, "body": body}


def main():
    index_data = []
    # First remove old posts, since sometimes posts get renamed, removed, etc.
    shutil.rmtree("./posts")
    for post in all_posts:
        metadata = process_post(post)
        index_data.append(metadata)

    index_data.sort(
        key=lambda x: (x["created"], x["title"]),
        reverse=True,
    )

    generate_index(index_data)
    generate_feed(list(reversed(index_data)))


if __name__ == "__main__":
    main()
