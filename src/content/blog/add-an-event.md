---
title: Add an Event to the Site
description: Events on this site come from the community. Here is how to add one with a pull request.
pubDate: 2026-08-09
author: Rust India Team
tags:
  - meta
---

Events on the site — meetups, workshops, study groups — come from the community. If you are organizing something, add it with a pull request and it will show up on the home page for everyone to see.

Events live in the site repository as plain markdown files under `src/content/events/`. Each file needs a small frontmatter block:

```yaml
---
title: Rust Bengaluru Meetup
date: 2026-09-20
location: Bengaluru
url: https://lu.ma/example
---
```

Only `title`, `date`, and `location` are required. The `url` field is optional — use it for an external meetup page (like Luma or Meetup.com) or an internal page like the conference archive.

To contribute:

1. Fork the [rustindia.org repository](https://github.com/swarnimarun/rustindia.org).
2. Add a new markdown file under `src/content/events/` with the frontmatter above and a short description of the event in the body.
3. Open a pull request.

Once merged, the event appears under "Upcoming events" on the [home page](/), and organizers can announce it further on the [community channels](/community/). Keep the date in the future — past events belong in the blog as recaps.
