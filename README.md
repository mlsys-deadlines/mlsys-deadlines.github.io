# MLSys Deadlines

A lightweight, community-driven deadline tracker for Machine Learning and Systems conferences.

## Live Website
Check out the live tracker here: [https://mustious.github.io/mlsys-deadlines/](https://mustious.github.io/mlsys-deadlines/)

## Features
- **Live Countdowns**: Real-time timers for upcoming deadlines.
- **Curated List**: Focuses on top-tier ML Systems venues like **MLSys, EuroSys, SOSP, OSDI, NSDI, FAST, ASPLOS, and USENIX ATC**.
- **Workshops Support**: dedicated section for workshops like "ML for Systems".
- **Filtering**: Easily filter by **Type** (Conference/Workshop) or **Category** (AI, Systems, Storage, etc.).
- **Timezone Awareness**: Deadlines are displayed in their local timezone with countdowns normalized to your current time.
- **Calendar Integration**: One-click "Add to Google Calendar" button.

## Contributing
This project is open source and we welcome contributions!

To suggest a new conference or update a deadline:
1.  Fork the repository: [https://github.com/mustious/mlsys-deadlines](https://github.com/mustious/mlsys-deadlines)
2.  Create a new YAML file in `src/conferences/` or `src/workshops/`.
3.  Follow the existing schema:
    ```yaml
    - name: Conference Name 202X
      year: 202X
      id: conf202X
      link: https://website.com
      deadline: "YYYY-MM-DDTHH:MM:SS"
      timezone: "UTC"
      place: "City, Country"
      type: Conference
      tags: [Tag1, Tag2]
    ```
4.  Submit a Pull Request!

## Built With
- **Vite** + **React**
- **Vanilla CSS** (for lightweight styling)
- **date-fns** (for time management)

## Credits
Built by [Mustapha Abdullahi](https://mustaphaabdullahi.com) with **Antigravity**.
