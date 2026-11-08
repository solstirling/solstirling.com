(function () {
  const defaultProjects = [
    {
      id: 'potluck',
      title: 'Potluck',
      status: 'testing',
      statusColor: 'yellow',
      date: '2026-06-13',
      updatedDate: '2026-11-08',
      cardMarkdown: 'A dashboard-mounted IMU and an iPhone for detecting and mapping potholes on everyday drives.',
      introMarkdown: 'If you live in San Diego, you know how bad the potholes have gotten. LiDAR is expensive, and I already know how to work with IMUs, so I’m building Potluck around a simpler idea: put motion sensors in a fleet of cars and collect road data while people drive.',
      mediaType: 'image',
      mediaSrc: 'images/potluck-reva-3d-screenshot-2026-11-08.png',
      mediaAlt: 'KiCad 3D view of the in-progress Potluck RevA PCB with the ESP32-C3, IMU, and USB-C connector',
      bodyMarkdown: `
## Current state

- The BNO085 and XIAO ESP32-S3 prototype is collecting road data. The first RevA schematic cleanup is done, and routing is nearly finished. Traces, the logo, board text, and final checks are still in progress. The DigiKey cart is ready; RevA hasn’t been fabricated yet.
- **October 2, 2026 · Mira Mesa:** 90 recordings, four continuous model runs, and a saved calibration. V2 trained on 41 usable labeled clips from the earlier export: 17 pothole and 24 non-pothole.

![Potluck RevA PCB layout in KiCad](images/potluck-reva-layout-screenshot-2026-11-08.png)

![Potluck RevA schematic, November 8, 2026](images/potluck-reva-schematic-2026-11-08.png)

[Open the full-size schematic](images/potluck-reva-schematic-2026-11-08.png)

## Technical details

- The sensor logs motion; the iPhone records GPS and video. The review tool lines up the trace, map, and footage so I can check what caused each bump.
- RevA replaces the breakout wiring with a BNO086, ESP32-C3-MINI-1, USB-C, and a 3.3 V regulator on one board.
- The Jev-like comparison model runs on the iPhone. It uses logistic regression on four vertical acceleration features per 15-second window. In development validation, v2 flagged 12 of 17 pothole windows and 6 of 24 non-pothole windows. It still needs an independent road test.

![First sensor prototype on a breadboard](images/potluck-02-breadboard-closeup.jpg)

![Early dashboard road test](images/potluck-03-dashboard-road-test.jpg)

![Enclosed road-test sensor](images/potluck-05-enclosed-sensor.jpg)

![My very first test: I labeled every detected bump as a pothole. The “deep” markers are bump labels, not measured pothole depths.](images/potluck-06-route-map.jpg)

## Goals

- Build a fleet of Potluck testers who log data on their everyday drives.
- Set up a Potluck account that automatically posts confirmed pothole reports, with the impact data and precise GPS location of each pothole.
- Build a community around those reports and get residents and local government involved in fixing the roads.
      `,
      sortOrder: 0
    },
    {
      id: 'pocketbooth',
      title: 'PocketBooth',
      status: 'v1 prototype',
      statusColor: 'yellow',
      date: '2026-09-20',
      updatedDate: '2026-11-08',
      hideMediaCaptions: true,
      cardMarkdown: 'A portable photo booth that captures four frames and sends a photo strip to an iPhone.',
      introMarkdown: 'I built the first PocketBooth in a couple of days to make a handheld camera with the two-button simplicity of a photo booth. It takes four photos, turns them into a strip, and saves it to my phone.',
      mediaType: 'image',
      mediaSrc: 'images/pocketbooth-holding.jpg',
      mediaAlt: 'Holding the first PocketBooth camera in its white 3D-printed enclosure',
      bodyMarkdown: `
## Technical details

- A Raspberry Pi 3B runs an OpenCV capture service for the USB camera. The white GPIO button captures a frame; the red button submits the strip. The hardware sits in a 3D-printed enclosure.
- The Pi hosts its own Wi-Fi network. A SwiftUI app connects directly, previews filters with Core Image, and saves a 600 × 1800 JPEG to Photos. The Pi keeps submitted strips so the phone can retry after a disconnect.

## Photos

![PocketBooth enclosure assembly in CAD](images/pocketbooth-assembly.png)

![PocketBooth enclosure interior and wiring](images/pocketbooth-inside.jpg)

![Four-frame PocketBooth strip from a desk test](images/pocketbooth-strip-desk.jpg)

![Four-frame PocketBooth strip from a kitchen test](images/pocketbooth-strip-kitchen.jpg)

## Goals

- Make the enclosure pocket-sized.
- Add a flash.
- Test printing through the Imation printer.
      `,
      sortOrder: 1
    },
    {
      id: 'overdrive2026',
      title: '2026 FRC Robot: OVERDRIVE',
      status: 'complete',
      statusColor: 'green',
      date: '2026-03-10',
      cardMarkdown:
        "Design lead work on NOMAD's 2026 robot, focused on the Dye Rotor and superstructure for a moving, high-throughput ball-scoring machine.",
      mediaType: 'image',
      mediaSrc: 'images/overdrive-o1.png',
      mediaAlt: 'NOMAD 2026 robot OVERDRIVE',
      transparentMedia: true,
      hideHeroMedia: true,
      bodyMarkdown: `
Similar to 2025, I served as the Design Lead for NOMAD's 2026 robot OVERDRIVE. This robot was able to accurately score ~9 balls per second anywhere in its zone, all while constantly moving. While I jumped around with different mechanisms, my main focus this year was the Dye Rotor and superstructure.

![OVERDRIVE](images/overdrive-o1.png)

## The Dye Rotor

The Dye Rotor uses a bunch of different packaging tricks, including twisted belts, offset gears, and carefully placed tensioners. It is powered coaxially using a chain and belt underneath the brainpan of the robot. Since the wheels draw most of the current in this mechanism, we used an x60 instead of an x44 to get more torque for less power.

![Dye Rotor packaging](images/overdrive-o2.png)

## The superstructure

The Dye Rotor ties into both the drivebase and the shooter, adding a lot of strength to the whole structure. We used two 4" bearings for the bottom stackup, and two larger x-contact bearings for the top stackup so balls could pass through. It caused a lot of burnout, but I am proud of the design team for pulling off the packaging, which helped lead to a district event win.

![Superstructure integration](images/overdrive-o3.png)

![OVERDRIVE detail](images/overdrive-o4.jpg)
      `,
      sortOrder: 2
    },
    {
      id: 'kyle',
      title: 'Kyle',
      status: 'live',
      statusColor: 'blue',
      date: '2026-01-08',
      cardMarkdown:
        "A conflict-scenario web app I built to practice API work and AI integration. It turns a prompt into strategic, outcome, and market-impact notes.",
      externalLink: 'https://kyle-rho.vercel.app/',
      mediaType: 'image',
      mediaSrc: 'images/kyle-card.png',
      mediaAlt: 'Kyle conflict analysis app',
      bodyMarkdown: `
Kyle is a web app for conflict scenario analysis. Paste a conflict description and it returns strategic analysis, predicted outcomes, and market impacts.
      `,
      sortOrder: 3
    },
    {
      id: 'robot2025',
      title: '2025 FRC Robot',
      status: 'complete',
      statusColor: 'green',
      date: '2025-02-10',
      cardMarkdown:
        'Mechanism writeup for the Reefscape robot: elevator, hand, and climb. It won its first regional, won its division at worlds, and finished third overall.',
      mediaType: 'image',
      mediaSrc: 'images/rmain.png',
      mediaAlt: '2025 Robot',
      bodyMarkdown: `
This is the 2025 FRC Robot my team and I designed for the FIRST Robotics Competition game, Reefscape. This page is a writeup on each of the mechanisms I focused on. The goal of this robot was to pick up 4" diameter pipes off of the ground and score them on a "reef," a tree of steel pipes acting as branches. Additionally, this robot could pick up 16" playground style balls and shoot them up into a large trough around 9 feet in the air. We had a group of 4 students working to design this, and below are the mechanisms I designed for this robot.

## The elevator

The elevator's goal was simple: extend linearly up to 6 feet. Although this task sounds basic, integrating it onto an off-centered pivot, as well as accounting for wiring, was not an easy job. The elevator uses 2 Kraken x60 motors to power the first stage with #25 chain. The second stage of the elevator is rigged off of the first stage with dyneema rope, a strong nylon string, which allows both stages of the elevator to extend simultaneously. In order to optimize the scoring of the entire robot itself, the elevator needed to be light. I spent tons of time taking weight out of the mechanism through pocketing the plates and removing any unnecessary material. In total, the elevator weighed a mere 18lbs.

![The elevator](images/relevator.png)

## The hand

The hand was by far the most difficult mechanism on the robot due to its weight budget and size restrictions. This hand is made out of a combination of machined aluminum and polycarbonate. Its rotation is powered by a Kraken x60, as well as the rotation of the wheels and rollers. The biggest issue with this hand was keeping the MOI (moment of inertia) low to reduce backlash.

![The hand](images/rhand.png)

## The climb

This is my favorite mechanism I have ever designed. It is simple, effective, robust, and reliable. Essentially, the wheels are powered by a Kraken x60 and spin to suck in a steel bar called the cage. The wheels bring the steel bar into a narrow slot, where it passes through a set of spring-powered latches. Once it passes the latches, it locks in place, allowing us to pivot our elevator and get the robot off the ground.

![The climb](images/rclimb.png)
      `,
      sortOrder: 4
    },
    {
      id: 'misc-projects',
      title: 'misc projects',
      status: 'paused',
      statusColor: 'gray',
      date: '2024-08-01',
      cardMarkdown:
        'Small mechanical experiments: a 3D-printed differential and a capstan pivot, built to try out gears, packaging, and cord-driven motion.',
      mediaType: 'image',
      mediaSrc: 'images/rdiffy.png',
      mediaAlt: '3D-printed differential from misc projects',
      hideHeroMedia: true,
      bodyMarkdown: `
A collection of smaller projects I built to learn a mechanism or try an idea.

## Intro to Differential

![Differential assembly](images/rdiffy.png)

This is my first, extremely basic, differential project. Due to my limited resources, it is mostly 3D printed, and I scrapped the bearings from an old pinball machine my brother made, but it works just fine. The main goal of this project was to learn to design with custom bevel gears. Below I talk about the design, build, and programming of this project.

## The design

I used two Nema 17 Stepper motors to power it, because I wanted to use [PD Stepper](https://github.com/joshr120/PD-Stepper) for control. The design process was pretty straightforward. I started with the bevel gears using the Gear Lab FeatureScript that Onshape offers, then built the rest off of the bevel gear spacing. I initially wanted to use timing belts 3D printed out of TPU, but after a bunch of failed attempts on my Bambu A1 mini, I decided to just buy some from V-Belt guys.

![Part studio](images/rdiffyparts.png)

## The build

The diffy was assembled with 3D printed plates, gears, and axles, as well as metric bearings and bolts, and finally some HTD timing belts and stepper motors. The only issue I ran into during assembly was the tolerances on the 3D printed parts.

![Diffy build](images/diffybuild.jpg)

## Capstan Pivot

All of the different iterations of my easy capstan pivot. I wanted to pursue this type of power transmission to see if it was worth applying to FRC.

![Capstan pivot prototype](images/capstanmain.png)
      `,
      sortOrder: 5
    }
  ];

  const statusColors = {
    complete: 'green',
    live: 'blue',
    testing: 'yellow',
    paused: 'gray'
  };

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function sanitizeUrl(value) {
    const url = String(value || '').trim();
    if (!url) return '#';
    if (/^(https?:|mailto:)/i.test(url)) return url;
    if (/^(images\/|project\.html|\.\/|\/)/.test(url)) return url.replace(/^\/+/, '');
    return '#';
  }

  function renderInlineMarkdown(value) {
    let html = escapeHtml(value);

    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_match, label, href) {
      const safeHref = sanitizeUrl(href);
      const attrs = /^https?:\/\//i.test(safeHref) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeHtml(safeHref)}"${attrs}>${label}</a>`;
    });

    return html;
  }

  function renderMarkdown(markdown, { showCaptions = true } = {}) {
    const source = String(markdown || '').trim();
    if (!source) return '';

    return source
      .split(/\n{2,}/)
      .map(function (block) {
        const trimmed = block.trim();
        if (!trimmed) return '';

        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imageMatch) {
          const alt = imageMatch[1] || 'Project media';
          const src = sanitizeUrl(imageMatch[2]);
          return `
            <figure class="markdown-media">
              <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">
              ${showCaptions ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ''}
            </figure>
          `;
        }

        const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
        if (headingMatch) {
          const level = Math.min(headingMatch[1].length + 1, 4);
          return `<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`;
        }

        if (/^- /m.test(trimmed)) {
          const items = trimmed
            .split('\n')
            .filter(function (line) {
              return line.trim().startsWith('- ');
            })
            .map(function (line) {
              return `<li>${renderInlineMarkdown(line.trim().slice(2))}</li>`;
            })
            .join('');
          return `<ul>${items}</ul>`;
        }

        return `<p>${renderInlineMarkdown(trimmed.replace(/\n+/g, ' '))}</p>`;
      })
      .join('');
  }

  function projectCardHref(project) {
    return `project.html?project=${encodeURIComponent(project.id)}`;
  }

  function parseProjectDate(value) {
    if (!value) return null;
    const parsed = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function formatProjectDate(value, options) {
    const date = parseProjectDate(value);
    if (!date) return value || '';

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: options && options.includeDay ? 'numeric' : undefined,
      year: 'numeric'
    }).format(date);
  }

  function sortProjects(projects) {
    return [...projects].sort(function (a, b) {
      const orderA = Number.isFinite(a.sortOrder) ? a.sortOrder : 999;
      const orderB = Number.isFinite(b.sortOrder) ? b.sortOrder : 999;
      return orderA - orderB;
    });
  }

  function sanitizeProject(input, fallbackIndex) {
    const fallback = defaultProjects[fallbackIndex] || defaultProjects[0];
    const id = typeof input.id === 'string' && input.id.trim() ? input.id.trim() : `project-${Date.now()}-${fallbackIndex}`;
    const title = typeof input.title === 'string' && input.title.trim() ? input.title.trim() : fallback.title;
    const status = typeof input.status === 'string' && input.status.trim() ? input.status.trim().toLowerCase() : fallback.status;
    const statusColor = statusColors[status] || input.statusColor || fallback.statusColor || 'gray';
    const cardMarkdown =
      typeof input.cardMarkdown === 'string' && input.cardMarkdown.trim()
        ? input.cardMarkdown.trim()
        : typeof input.description === 'string' && input.description.trim()
          ? input.description.trim()
          : fallback.cardMarkdown;
    const bodyMarkdown =
      typeof input.bodyMarkdown === 'string' && input.bodyMarkdown.trim() ? input.bodyMarkdown.trim() : fallback.bodyMarkdown;
    const parsedSort = Number.parseInt(input.sortOrder, 10);

    return {
      id,
      title,
      status,
      statusColor,
      date: typeof input.date === 'string' && input.date.trim() ? input.date.trim() : fallback.date,
      cardMarkdown,
      externalLink: typeof input.externalLink === 'string' ? input.externalLink.trim() : '',
      mediaType: input.mediaType === 'video' ? 'video' : 'image',
      mediaSrc: typeof input.mediaSrc === 'string' ? input.mediaSrc.trim() : fallback.mediaSrc,
      mediaAlt: typeof input.mediaAlt === 'string' && input.mediaAlt.trim() ? input.mediaAlt.trim() : title,
      transparentMedia: Boolean(input.transparentMedia),
      hideHeroMedia: Boolean(input.hideHeroMedia),
      bodyMarkdown,
      sortOrder: Number.isNaN(parsedSort) ? fallbackIndex : parsedSort
    };
  }

  window.PortfolioProjects = {
    projects: sortProjects(defaultProjects),
    defaultProjects,
    escapeHtml,
    formatProjectDate,
    projectCardHref,
    renderMarkdown,
    sanitizeProject,
    sortProjects
  };
})();
