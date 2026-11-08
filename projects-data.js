(function () {
  const defaultProjects = [
    {
      id: 'potluck',
      title: 'Potluck',
      status: 'testing',
      statusColor: 'yellow',
      date: '2026-06-13',
      cardMarkdown:
        'A road-data project that pairs a dashboard-mounted IMU with iPhone GPS and video. RevA is nearing the end of PCB layout, and I’m testing an on-device comparison model against labeled road data.',
      mediaType: 'image',
      mediaSrc: 'images/potluck-reva-3d-screenshot-2026-11-08.png',
      mediaAlt: 'KiCad 3D view of the in-progress Potluck RevA PCB with the ESP32-C3, IMU, and USB-C connector',
      bodyMarkdown: `
Potluck is a work-in-progress system for detecting and mapping potholes during ordinary drives. The current prototype pairs a BNO085 inertial sensor and XIAO ESP32S3 with an iPhone that records GPS, forward-facing video, and motion data for review after the drive.

## Current state: testing

The current focus is collecting data I can actually check. The phone records video, GPS, IMU data, and detector output together. After a drive, a laptop reviewer plays the video alongside the graph and route so I can compare a spike with the road feature that caused it. The detector still needs repeatable field tests and tuning for false positives and missed events.

## November 8, 2026 · RevA PCB update

I fixed the issues from the first schematic review and have most of the RevA layout in place. The board puts a BNO086 near the center, with an ESP32-C3-MINI-1 module, USB-C, a 3.3 V regulator, and accessible test points. The screenshots above and below show the current KiCad 3D view and PCB layout.

I’m finishing the remaining traces and still need to add the Potluck logo and board text to the silkscreen. The DigiKey parts cart is complete and ready to order. I’ll run the final layout checks before sending the board out; RevA hasn’t been fabricated or tested yet. The road-test hardware is still the BNO085 and XIAO prototype.

![KiCad PCB Editor screenshot of the Potluck RevA layout with partially routed traces](images/potluck-reva-layout-screenshot-2026-11-08.png)

### RevA schematic · November 8, 2026

![Latest saved Potluck RevA schematic showing the BNO086 IMU, ESP32-C3, USB-C input, and 3.3 V regulator](images/potluck-reva-schematic-2026-11-08.png)

[Open the full-size schematic](images/potluck-reva-schematic-2026-11-08.png)

## October 2, 2026 · Mira Mesa training drive

We drove in Mira Mesa to collect real examples for the pothole classifier, including normal driving and other disturbances that can look like potholes in the acceleration trace. The October 2 phone export contains **90 recordings, four continuous model runs, and a saved sensor calibration**. The recordings include timestamped XYZ and vertical acceleration, GPS fixes, and manual labels or model-review flags. The newer export has 20 more recordings than the earlier training snapshot.

After filtering the earlier snapshot for usable human-labeled windows, **41 recordings went into v2: 17 pothole and 24 non-pothole**. Non-pothole examples include ordinary driving, freeway driving, curbs, and dips. I kept unreviewed predictions out of the training labels.

## November 8, 2026 · Jev-like comparison model

We now run the v2 comparison model on the iPhone. It scores consecutive 15-second windows using a regularized logistic regression over four features: vertical RMS, minimum and maximum vertical acceleration, and the absolute peak after low-pass filtering. GPS gives me context when I review a window; it does not feed the classifier. The model flags the window for review, so I can compare alerts and misses against human labels without guessing the exact impact time.

On the 41-clip development set, archived v1 flagged **2 of 17** pothole windows and falsely flagged **1 of 24** negatives. In location-group validation, v2 found **12 of 17**, with **6 of 24** false alerts. Catching more potholes came with more false alarms. These are development results; the next check is an independent drive on unfamiliar roads.

![Live dashboard used to inspect the IMU signal and orientation during development](images/potluck-testing-dashboard.gif)

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

Next I’ll finish routing, add the silkscreen, and check the board before ordering. Once the first boards are assembled, I’ll verify power, USB flashing, and IMU readings before revising the enclosure. On the software side, I want an independent comparison drive, more repeatable labels across vehicles, and a reliable TestFlight install path.
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
        'A 1–2 day photo booth prototype: a Raspberry Pi captures four frames from a USB camera, and a native iPhone app edits and saves the strip over local Wi-Fi.',
      mediaType: 'image',
      mediaSrc: 'images/pocketbooth-holding.jpg',
      mediaAlt: 'Holding the first PocketBooth camera in its white 3D-printed enclosure',
      bodyMarkdown: `
I made PocketBooth because I wanted to build something for fun. This was an overnight, hands-on project, with about 1–2 days spent getting a v1 together. The idea was simple: make a camera that feels like a tiny photo booth and turns a few moments into a four-photo strip.

## November 8, 2026 · Technical writeup revision

### Camera, controls, and enclosure

I built v1 around a Raspberry Pi 3B, a USB camera, two momentary buttons, and a 3D-printed enclosure. The Pi runs the capture service under systemd. It opens the camera through OpenCV and Linux V4L2, requests 1280 × 720 MJPEG at 30 fps, and keeps the latest frame available for the shutter. The camera and driver negotiate the actual frame rate.

The white button is wired to GPIO17 and captures the next frame, up to four per strip. The red button is wired to GPIO27 and archives the current strip before starting another. Both switches pull their input to ground on press. Keeping the controls on the Pi makes the camera usable without tapping the phone for each shot.

![PocketBooth enclosure assembly in CAD](images/pocketbooth-assembly.png)

![Inside the first enclosure, with the wiring and red and white buttons exposed](images/pocketbooth-inside.jpg)

### Local Wi-Fi and the iPhone app

The Pi runs its own Wi-Fi access point. The SwiftUI app joins that local camera network, pairs with a camera key stored in the iOS Keychain, and uses an HTTP API to get capture state and strip previews. The Pi keeps the original captures on disk. The phone requests a fresh preview when the capture revision changes, so the capture loop and the editing UI can run independently. The demo does not need a router, cloud service, or internet connection.

### Filters, export, and recovery

After the fourth frame, the app uses Core Image to preview Warm, Cool, Faded, or B&W, with controls for warmth, tint, grain, fade, contrast, and saturation. On submit, it renders the selected look into a 600 × 1800 JPEG and writes it through PhotoKit. The Pi keeps the archived strip if the phone disconnects. On reconnect the app can fetch it again, using a local save journal to link archive IDs to Photos assets and reduce duplicate saves after an interruption.

These strips came from the prototype. The early desk shots and later kitchen shots capture the kind of casual, imperfect photos I wanted it to make.

![An early four-photo strip from testing PocketBooth at my desk](images/pocketbooth-strip-desk.jpg)

![A later PocketBooth strip from testing around the kitchen](images/pocketbooth-strip-kitchen.jpg)

## What is next

I originally set out to make a pocket-sized version for my brother’s wedding. The next hardware work is to shrink the enclosure, add a flash, and test a print workflow with the Imation printer. The current build saves digital strips to Photos; the flash and automatic printing aren’t part of v1.
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
