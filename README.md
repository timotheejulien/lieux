# My places

## Introduction

A Jekyll site that uses OpenStreetMap and that I created using AI to map and document the places I visit.

## Installation

### Install Jekyll
You can find the tutorial here : [https://jekyllrb.com/docs/installation/](https://jekyllrb.com/docs/installation/)

### Install the project

1. Clone the repository
```bash
git clone https://github.com/timotheejulien/lieux.git
cd ./lieux
```

2. **Install dependencies**
```bash
   bundle install
   ```

3. **Start the development server**
```bash
   bundle exec jekyll serve
   ```
4. **Visit the site**
   Open your browser to `http://localhost:4000`

## Add a new place

Create a file in `_places/` with this format:

```yaml
---
title: "Name of the place"
description: "Short description"
lat: ""
lon: ""
address: ""
website: "" # optional
tags: "tag1 tag2"
image: "/images/photo.jpg"  # optional
---
```

## Features

- 🗺️ Interactive OpenStreetMap map
- 🔍 Search by name
- 🏷️ Filter by tags

## Released under MIT License

Open sourced under the [MIT license](LICENSE.md).
