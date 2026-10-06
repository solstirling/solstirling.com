(function () {
  const defaultProjects = [
    {
      id: 'potluck',
      title: 'Potluck',
      status: 'testing',
      statusColor: 'yellow',
      date: '2026-06-13',
      cardMarkdown:
        'A road-data project pairing a dashboard-mounted IMU with iPhone GPS and video, with synchronized review and a custom PCB in progress.',
      mediaType: 'image',
      mediaSrc: 'images/potluck-schematic.png',
      mediaAlt: 'Potluck custom PCB schematic in progress',
      bodyMarkdown: `
Potluck is a work-in-progress system for detecting and mapping potholes during ordinary drives. The current prototype pairs a BNO085 inertial sensor and XIAO ESP32S3 with an iPhone that records GPS, forward-facing video, and motion data for review after the drive.

## Current state: testing

The current focus is collecting data I can actually check. The phone records video, GPS, IMU data, and detector output together. After a drive, a laptop reviewer plays the video alongside the graph and route so I can compare a spike with the road feature that caused it. The detector still needs repeatable field tests and tuning for false positives and missed events.

## Moving toward a custom board

The cover is my in-progress KiCad schematic for the next hardware revision. The current local design uses a BNO086, an ESP32-C3-MINI-1 module, USB-C, and a 3.3 V regulator to replace the breakout-board wiring. I am also planning around rigid mounting, a compact enclosure, and accessible test points so the hardware is easier to assemble and repeat. This is a design step toward a compact PCB, not a finished or validated board. The road-test hardware below is still the BNO085 and XIAO prototype.

![Live dashboard used to inspect the IMU signal and orientation during development](images/potluck-testing-dashboard.gif)

## October update: more road data

The latest repository update adds 90 iPhone recordings, four continuous model runs, and a saved sensor calibration from October 2. That gives us more real road data to review against the classifier. The newer export includes 20 recordings beyond the earlier backup used for v2; those extra recordings were not part of its 41-example training set. Model predictions and unreviewed labels still need to be checked before treating them as training evidence.

## From breadboard to road test

The close-up below is the first version of the hardware. It used an older IMU that would not produce reliable data, even after I tried step-up conversion. I replaced that sensor and rebuilt the sensing stack around a BNO085, which is the version now being tested.

![First hardware revision with the original IMU that failed even after step-up attempts](images/potluck-02-breadboard-closeup.jpg)

![The breadboard prototype mounted on the dashboard for an early road test](images/potluck-03-dashboard-road-test.jpg)

The current electronics use a Seeed Studio XIAO ESP32S3 and BNO085 IMU. The sensor reads linear acceleration and rotation at 100 Hz, compensates for vehicle orientation, filters ordinary vibration, and looks for the drop-and-rebound pattern of a pothole.

## Building the testing loop

I started with a desktop logger so I could see the raw motion signal inside the car and iterate on the detector. The newer workflow moves detailed labeling to the laptop after the drive. I can mark potholes, drain covers, dips, and speed bumps, or label stretches of smooth, medium, and rough road. Timestamp-based playback keeps the video and motion data together, with a manual correction when the alignment needs adjustment.

The field setup now uses a more secure printed enclosure and a rigid dashboard mount. Mounting matters because a loose sensor can create motion that looks like a road impact.

![Enclosed Potluck sensor mounted for field testing](images/potluck-05-enclosed-sensor.jpg)

## From an impact to a map

The phone handles GPS, background recording, session storage, and map rendering. The board handles detection and writes every event to LittleFS flash. If Bluetooth drops, the app requests the missed events after reconnecting and deduplicates them using the device and event IDs.

The route view combines a provisional road-condition score with individual impact markers. The shallow, medium, and deep labels in the earlier map below describe impact severity, not literal pothole depth. The newer reviewer uses a provisional Potluck Impact Index alongside the motion measurements. Both need calibration across vehicles, speeds, tire pressures, and mounting positions.

![Potluck iPhone route map showing detected deep impacts during a test drive](images/potluck-06-route-map.jpg)

## Reviewing the evidence

A saved run contains the video, motion and GPS data, and a sync manifest. The reviewer lets me export labels alongside that run so I can keep the observations separate from the automatic detector output. It also has an evidence-image and post-draft workflow for human-confirmed potholes, with a final manual review before publishing. That workflow is part of the beta; it does not make the detector a verified depth sensor.

## Technical details

- BNO085 linear acceleration and rotation sampled at 100 Hz
- Orientation compensation, adaptive thresholds, and drop/rebound detection on the ESP32S3
- Custom Bluetooth Low Energy protocol with a 50 Hz binary IMU stream during active tests
- LittleFS JSONL backup and replay after disconnects
- Native iOS app built with SwiftUI, SwiftData, Core Bluetooth, Core Location, and MapKit
- Synchronized video, JSONL motion/GPS data, and a session manifest
- Laptop video, graph, and map review with portable label exports

## What is next

The next hardware step is finishing and checking the schematic, laying out the PCB, and revising the enclosure around it. On the software side, I want more repeatable labeled drives and a reliable install path for beta testers through TestFlight. The priority is comparing detections with real road features across more vehicles before calling Potluck finished.
      `,
      sortOrder: 0
    },
    {
      id: 'pocketbooth',
      title: 'PocketBooth',
      status: 'v1 prototype',
      statusColor: 'yellow',
      date: '2026-09-20',
      cardMarkdown:
        'An overnight, hands-on camera build for fun. A 1–2 day v1 that makes photo strips, with a pocket-sized version, flash, and Imation printing as the next goal.',
      mediaType: 'image',
      mediaSrc: 'images/pocketbooth-holding.jpg',
      mediaAlt: 'Holding the first PocketBooth camera in its white 3D-printed enclosure',
      bodyMarkdown: `
I made PocketBooth because I wanted to build something for fun. This was an overnight, hands-on project, with about 1–2 days spent getting a v1 together. The idea was simple: make a camera that feels like a tiny photo booth and turns a few moments into a four-photo strip.

## A quick first version

The v1 brings a camera, Raspberry Pi, physical buttons, and a 3D-printed enclosure together. I wanted something I could hold and actually use, then improve from there. It is still a rough prototype, but getting from CAD to a physical camera was the fun part.

![PocketBooth enclosure assembly in CAD](images/pocketbooth-assembly.png)

![Inside the first enclosure, with the wiring and red and white buttons exposed](images/pocketbooth-inside.jpg)

## What comes out of it

These are actual photo strips from the prototype. The early desk shots and later kitchen shots capture the kind of casual, imperfect photos I wanted it to make. The software assembles four images into a strip, with filters and a phone workflow for saving the result.

![An early four-photo strip from testing PocketBooth at my desk](images/pocketbooth-strip-desk.jpg)

![A later PocketBooth strip from testing around the kitchen](images/pocketbooth-strip-kitchen.jpg)

## Before my brother's wedding

The goal is to make a pocket-sized version with a flash and printing through the Imation printer before my brother's wedding. The current enclosure is the first pass, and flash and printer integration are still next steps. For now, v1 gives me something tangible to test while I work out the smaller packaging and print workflow.
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

  function renderMarkdown(markdown) {
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
              ${alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ''}
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
