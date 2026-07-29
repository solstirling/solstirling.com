(function () {
  const defaultProjects = [
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
      sortOrder: 0
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
      sortOrder: 1
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
      sortOrder: 2
    },
    {
      id: 'diffy',
      title: 'Intro to Differential',
      status: 'paused',
      statusColor: 'gray',
      date: '2024-08-01',
      cardMarkdown:
        'A small differential project for learning bevel gears, stepper motors, and vendor-sourced parts with mostly 3D-printed hardware.',
      mediaType: 'image',
      mediaSrc: 'images/rdiffy.png',
      mediaAlt: 'Differential preview',
      bodyMarkdown: `
This is my first, extremely basic, differential project. Due to my limited resources, it is mostly 3D printed, and I scrapped the bearings from an old pinball machine my brother made, but it works just fine. The main goal of this project was to learn to design with custom bevel gears. Below I talk about the design, build, and programming of this project.

![Differential](images/rdiffy.png)

## The design

I used two Nema 17 Stepper motors to power it, because I wanted to use [PD Stepper](https://github.com/joshr120/PD-Stepper) for control. The design process was pretty straightforward. I started with the bevel gears using the Gear Lab FeatureScript that Onshape offers, then built the rest off of the bevel gear spacing. I initially wanted to use timing belts 3D printed out of TPU, but after a bunch of failed attempts on my Bambu A1 mini, I decided to just buy some from V-Belt guys.

![Part studio](images/rdiffyparts.png)

## The build

The diffy was assembled with 3D printed plates, gears, and axles, as well as metric bearings and bolts, and finally some HTD timing belts and stepper motors. The only issue I ran into during assembly was the tolerances on the 3D printed parts.

![Diffy build](images/diffybuild.jpg)
      `,
      sortOrder: 3
    },
    {
      id: 'capstan',
      title: 'Capstan Pivot',
      status: 'paused',
      statusColor: 'gray',
      date: '2024-08-01',
      cardMarkdown:
        'A capstan-pivot prototype exploring whether cord-based power transmission is useful for FRC mechanisms.',
      mediaType: 'image',
      mediaSrc: 'images/capstanmain.png',
      mediaAlt: 'Capstan preview',
      bodyMarkdown: `
All of the different iterations of my easy capstan pivot. I wanted to pursue this type of power transmission to see if it was worth applying to FRC.

![Capstan pivot](images/capstanmain.png)
      `,
      sortOrder: 4
    }
  ];

  const statusColors = {
    complete: 'green',
    live: 'blue',
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
