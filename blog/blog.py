#!/usr/bin/env python


"""
Simple blog renderer. Only requirements are Jinja and py-gfm.
"""


import os
import yaml
import re
from jinja2 import Environment, PackageLoader, select_autoescape
import markdown
from mdx_gfm import PartialGithubFlavoredMarkdownExtension

# import pycmarkgfm


src_dir = "./src"
all_posts = os.listdir(src_dir)
out_dir = "posts"
templates_dir = "./templates"
index = "index.html"
index_data = []
jinja_env = Environment(loader=PackageLoader("blog", "templates"))


def render_md(source):
    # TODO: this module is a binding to github's cmark fork,
    # so it includes all the stuff i want, but it's a brand new
    # project so i want to make sure it's stable before switching.
    # return pycmarkgfm.gfm_to_html(source)
    return markdown.markdown(
        source,
        extensions=[PartialGithubFlavoredMarkdownExtension(), "toc", "extra"],
    )


def generate_index():
    template = jinja_env.get_template(index)
    data = sorted(
        index_data, key=lambda x: (
            x.get("starred", False),
            x["created"],
            x["title"]
        ), reverse=True
    )
    rendered = template.render({"posts": data})
    with open(index, "w") as i:
        i.write(rendered)
        i.close()


def main():
    for post in all_posts:
        destination_dir = out_dir + "/" + post.replace(".md", "")
        destination_file = destination_dir + "/" + index
        os.makedirs(destination_dir, exist_ok=True)

        with open(src_dir + "/" + post) as p:
            contents = p.read()
            # Split out frontmatter. This will return an empty string, the
            # frontmatter yaml, and then the post body which may have more
            # occurrences of ---.
            parts = contents.split("---", 2)
            metadata = yaml.safe_load(parts[1])
            metadata["href"] = "/blog/" + destination_dir
            index_data.append(metadata)
            blog = render_md(parts[2])
            template = jinja_env.get_template("post.html")
            rendered = template.render(
                {
                    "post": {
                        "title": metadata["title"],
                        "created": metadata["created"],
                        "tags": metadata["tags"],
                        "starred": metadata.get("starred", False),
                        "contents": blog,
                    }
                }
            )
            with open(destination_file, "w") as d:
                d.write(rendered)
                d.close()

            # Depends on having appended all metadata above
            generate_index()


if __name__ == "__main__":
    main()
