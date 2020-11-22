#!/usr/bin/env python


"""
Simple blog renderer. Only requirements are Jinja and py-gfm.
"""


import os
import yaml
import re
from jinja2 import Environment, PackageLoader, select_autoescape
import markdown
from mdx_gfm import GithubFlavoredMarkdownExtension


src_dir = "./src"
all_posts = os.listdir(src_dir)
out_dir = "./posts"
templates_dir = "./templates"
index = "index.html"
index_data = []


jinja_env = Environment(loader=PackageLoader("blog", "templates"))


# TODO: this module has a bug in it, I think.
# Single newlines in markdown should not be treated as line breaks.
def render_md(source):
    return markdown.markdown(
        source, extensions=[GithubFlavoredMarkdownExtension()]
    )


def generate_index():
    template = jinja_env.get_template(index)
    data = sorted(index_data, key=lambda x: x["created"], reverse=True)
    rendered = template.render({"posts": data})
    with open(index, "w") as i:
        i.write(rendered)
        i.close()


def main():
    for post in all_posts:
        destination_dir = out_dir + "/" + post.replace(".md", "")
        destination_file = destination_dir + "/" + index

        if not os.path.exists(destination_dir):
            os.makedirs(destination_dir)

        with open(src_dir + "/" + post) as p:
            contents = p.read()
            # Split out frontmatter. This will return
            # an empty string, the frontmatter yaml, and then
            # the post body which may have more occurrences of ---.
            parts = contents.split("---", 2)
            _metadata = parts[1]
            _blog = parts[2]
            metadata = yaml.safe_load(_metadata)
            metadata["href"] = "/blog/" + destination_dir
            index_data.append(metadata)
            blog = render_md(_blog)
            template = jinja_env.get_template("post.html")
            rendered = template.render(
                {
                    "post": {
                        "title": metadata["title"],
                        "created": metadata["created"],
                        "tags": metadata["tags"],
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
