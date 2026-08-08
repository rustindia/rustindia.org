---
title: Write for the Blog
description: The Rust India blog is open to the community. Here is how to submit a post with a pull request.
pubDate: 2026-08-04
author: Rust India Team
tags:
  - meta
---

The Rust India blog is written by the community, for the community. If you attended an event, built something with Rust, or have an opinion worth sharing, we would like to publish it.

Posts live in the site repository as plain markdown files. To contribute:

1. Fork the [rustindia.org repository](https://github.com/swarnimarun/rustindia.org).
2. Add a new markdown file under `src/content/blog/` with a title, description, pubDate, author, and tags in the frontmatter.
3. Set `draft: true` in the frontmatter until the post is ready.
4. Open a pull request. Draft posts stay unpublished until they are ready.

The team will review the pull request and publish once the post is ready — we simply flip `draft` to `false` and merge. The post appears on the [blog index](/blog) and in the site's [RSS feed](/rss.xml) automatically.
