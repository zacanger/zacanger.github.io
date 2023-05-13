#!/usr/bin/env python3

"""
Tiny blog generator. See constants below for settings.
"""

import os
import sys
import shutil
from datetime import datetime

import yaml
import markdown
from jinja2 import Environment, FileSystemLoader
from mdx_gfm import PartialGithubFlavoredMarkdownExtension
from feedgen.feed import FeedGenerator

# TODO: This module is a binding to github's cmark fork,
# so it includes all the stuff i want, but it's a brand new
# project so I want to make sure it's stable before switching.
# import pycmarkgfm

# settings
MY_NAME = "Zac Anger"
BLOG_TITLE = MY_NAME + "'s Blog"
SITE_ROOT = "https://zacanger.com"
BLOG_ROOT = SITE_ROOT + "/blog/"
SRC_DIR = "./src"
ALL_POSTS = os.listdir(SRC_DIR)
OUT_DIR = "posts"
INDEX = "index.html"
JINJA_ENV = Environment(loader=FileSystemLoader("templates"))


def render_md(source):
    "Renders markdown to HTML"
    # TODO: See above.
    # return pycmarkgfm.gfm_to_html(source)
    return markdown.markdown(
        source,
        extensions=[PartialGithubFlavoredMarkdownExtension(), "toc", "extra"],
    )


def generate_index(data):
    "Generates index.html"
    template = JINJA_ENV.get_template(INDEX)
    rendered = template.render({"posts": data})
    with open(INDEX, "w") as i:
        i.write(rendered)
        i.close()


def generate_feed(data):
    "Generates the RSS feed"
    feed_generator = FeedGenerator()
    feed_generator.id(BLOG_ROOT)
    feed_generator.title(BLOG_TITLE)
    feed_generator.author({"name": MY_NAME})
    feed_generator.link(href=BLOG_ROOT)
    feed_generator.description("Programming, socialism, and Buddhism.")
    feed_generator.language("en")

    for entry in data:
        url = SITE_ROOT + entry["href"]
        # This causes every post to have a pubDate of midnight MST,
        # but since I don't keep track of the actual time, it's
        # close enough.
        published = datetime.strptime(
            str(entry["created"]) + "--07:00", "%Y-%m-%d-%z"
        )
        feed_entry = feed_generator.add_entry()
        feed_entry.id(url)
        feed_entry.title(entry["title"])
        feed_entry.link(href=url)
        feed_entry.author({"name": MY_NAME})
        feed_entry.description(entry["body"])
        feed_entry.pubDate(published)

    feed_generator.rss_file("rss.xml")


def process_post(post):
    "Reads a post source and processes it into an HTML file"
    destination_dir = OUT_DIR + "/" + post.replace(".md", "")
    destination_file = destination_dir + "/" + INDEX
    os.makedirs(destination_dir)

    with open(SRC_DIR + "/" + post) as source_post:
        contents = source_post.read()
        # Split out frontmatter. This will return an empty string, the
        # frontmatter yaml, and then the post body which may have more
        # occurrences of ---.
        parts = contents.split("---", 2)
        try:
            metadata = yaml.safe_load(parts[1])
        except IndexError:
            print("File missing frontmatter:", post)
            sys.exit(1)
        metadata["href"] = "/blog/" + destination_dir
        try:
            body = render_md(parts[2])
        except IndexError:
            print("File missing body after frontmatter:", post)
            sys.exit(1)
        template = JINJA_ENV.get_template("post.html")

        required_keys = ["title", "created", "tags"]
        for k in required_keys:
            if k not in metadata:
                print("Key", k, "not in file", post)
                sys.exit(1)

        rendered = template.render(
            {
                "post": {
                    "title": metadata["title"],
                    "created": metadata["created"],
                    "tags": metadata["tags"],
                    "starred": metadata.get("starred", False),
                    "body": body,
                    "slug": destination_dir,
                }
            }
        )

        with open(destination_file, "w") as dest_file:
            dest_file.write(rendered)
            dest_file.close()

    # returned for use in generating index and rss
    return {**metadata, "body": body}


def main():
    "Runs the whole thing"
    index_data = []
    # First remove old posts, since sometimes posts get renamed, removed, etc.
    shutil.rmtree("./posts")
    for post in ALL_POSTS:
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
