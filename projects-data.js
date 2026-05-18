(function () {
  // Add a new card by copying one object in this array and changing its id, title, mediaSrc, and contentBlocks.

  const defaultProjects = [
    {
      id: 'overdrive2026',
      title: '2026 FRC Robot: OVERDRIVE',
      status: 'complete',
      statusColor: 'green',
      date: '3/10/25',
      description:
        'NOMAD 2026 robot design lead work focused on the Dye Rotor and superstructure for a moving, high-throughput ball-scoring machine.',
      link: 'project.html?project=overdrive2026',
      mediaType: 'image',
      mediaSrc: 'images/overdrive-o1.png',
      mediaAlt: 'NOMAD 2026 robot OVERDRIVE',
      mediaPoster: '',
      hideHeroMedia: true,
      contentBlocks: [
        {
          id: 'overdrive2026-intro',
          type: 'text',
          text:
            '<p>Similar to 2025, I served as the Design Lead for NOMAD&apos;s 2026 robot OVERDRIVE. This robot was able to accurately score ~9 balls per second anywhere in its zone, all while constantly moving. While I jumped around with different mechanisms, my main focus this year was the Dye Rotor and superstructure.</p>'
        },
        { id: 'overdrive2026-o1', type: 'image', url: 'images/overdrive-o1.png', caption: 'OVERDRIVE' },
        {
          id: 'overdrive2026-dye-rotor',
          type: 'text',
          text:
            '<h2>The Dye Rotor</h2><p>The Dye Rotor utilizes a bunch of different packaging tricks, including twisted belts, offset gears, and thoughtfully placed tensioners. It is powered coaxially using a chain and belt underneath the brainpan of the robot. Since the wheels draw most of the current in this mechanism, we used an x60 as opposed to an x44 to get more torque for less power.</p>'
        },
        { id: 'overdrive2026-o2', type: 'image', url: 'images/overdrive-o2.png', caption: 'Dye Rotor packaging' },
        {
          id: 'overdrive2026-superstructure',
          type: 'text',
          text:
            '<h2>The superstructure</h2><p>The Dye Rotor integrates seamlessly into both the drivebase and the shooter, providing an insane amount of strength to the whole structure. We used two 4&quot; bearings for the bottom stackup, and two larger x-contact bearings for the top stackup so the balls could pass through. Although it caused tons of burnout, I&apos;m really proud of the design team for pulling off this packaging miracle, ultimately leading to a district event win.</p>'
        },
        { id: 'overdrive2026-o3', type: 'image', url: 'images/overdrive-o3.png', caption: 'Superstructure integration' },
        { id: 'overdrive2026-o4', type: 'image', url: 'images/overdrive-o4.jpg', caption: 'OVERDRIVE detail' }
      ],
      sortOrder: 0
    },
    {
      id: 'robot2025',
      title: '2025 FRC Robot',
      status: 'complete',
      statusColor: 'green',
      date: '2/10/25',
      description:
        "A brief writeup of the main mechanisms I designed on this robot. After winning its first regional, this robot went on to win its division at the world championship and placed 3rd on the world stage.",
      link: 'project.html?project=robot2025',
      mediaType: 'image',
      mediaSrc: 'images/rmain.png',
      mediaAlt: '2025 Robot',
      mediaPoster: '',
      contentBlocks: [
        {
          id: 'robot2025-intro',
          type: 'text',
          text:
            '<p>This is the 2025 FRC Robot my team and I designed for the FIRST Robotics Competition game, Reefscape. This page is a writeup on each of the mechanisms I focused on. The goal of this robot was to pick up 4&quot; diameter pipes off of the ground, and score them on a &quot;reef&quot;, a tree of steel pipes acting as branches. Additionally, this robot could pick up 16&quot; playground style balls, and shoot them up into a large trough around 9 feet in the air. We had a group of 4 students working to design this, and below are the mechanisms I designed for this robot.</p>'
        },
        {
          id: 'robot2025-elevator',
          type: 'text',
          text:
            '<h2>The elevator</h2><p>The elevator&apos;s goal was simple: extend linearly up to 6 feet. Although this task sounds basic, integrating it onto an off-centered pivot, as well as accounting for wiring was not an easy job. The elevator uses 2 Kraken x60 motors to power the first stage with #25 chain. The second stage of the elevator is rigged off of the first stage with dyneema rope, a strong nylon string, which allows both stages of the elevator to extend simultaneously. In order to optimize the scoring of the entire robot itself, the elevator needed to be light. I spent tons of time taking weight out of the mechanism through pocketing the plates, and removing any unnecessary material. In total, the elevator weighed a mere 18lbs.</p>'
        },
        { id: 'robot2025-elevator-img', type: 'image', url: 'images/relevator.png', caption: 'The elevator' },
        {
          id: 'robot2025-hand',
          type: 'text',
          text:
            '<h2>The hand</h2><p>The hand was by far the most difficult mechanism on the robot due to its weight budget and size restrictions. This hand is made out of a combination of machined aluminum and polycarbonate. Its rotation is powered by a Kraken x60, as well as the rotation of the wheels and rollers. The biggest issue with this hand was keeping the MOI (moment of inertia) low to reduce backlash.</p>'
        },
        { id: 'robot2025-hand-img', type: 'image', url: 'images/rhand.png', caption: 'The hand' },
        {
          id: 'robot2025-climb',
          type: 'text',
          text:
            '<h2>The climb</h2><p>This is my favorite mechanism I&apos;ve ever designed. It is simple, effective, and extremely robust and reliable. Essentially, the wheels are powered by a Kraken x60, and spin to suck in a steel bar (called the cage). The wheels would bring the steel bar into a narrow slot, where it would pass through a set of spring powered latches. Once it passed the latches, it would be locked in place, allowing us to pivot our elevator and get the robot off the ground.</p>'
        },
        { id: 'robot2025-climb-img', type: 'image', url: 'images/rclimb.png', caption: 'The climb' }
      ],
      sortOrder: 0
    },
    {
      id: 'diffy',
      title: 'Intro to Differential',
      status: 'hold',
      statusColor: 'gray',
      date: '8/1/24',
      description:
        'A project to familiarize myself with designing bevel gears and programming differentials. This is my first time ever programming stepper motors, and outsourcing parts from vendors.',
      link: 'project.html?project=diffy',
      mediaType: 'image',
      mediaSrc: 'images/rdiffy.png',
      mediaAlt: 'Differential preview',
      mediaPoster: '',
      contentBlocks: [
        {
          id: 'diffy-intro',
          type: 'text',
          text:
            '<p>This is my first, extremely basic, differential project. Due to my limited resources, it is mostly 3D Printed, and I scrapped the bearings from an old pinball machine my brother made, but it works just fine. The main goal of this project was to learn to design with custom bevel gears. Below I talk about the design, build, and programming of this project.</p>'
        },
        { id: 'diffy-main-img', type: 'image', url: 'images/rdiffy.png', caption: '' },
        {
          id: 'diffy-design',
          type: 'text',
          text:
            '<h2>The design</h2><p>I used two Nema 17 Stepper motors to power it, because I wanted to use <a href="https://github.com/joshr120/PD-Stepper" target="_blank" rel="noopener noreferrer">PD Stepper</a> for control. The design process was pretty straight forward. I started with the bevel gears using the Gear Lab FeatureScript that Onshape offers, then built the rest off of the bevel gear spacing. I initially wanted to use timing belts 3D printed out of TPU, but after a bunch of failed attempts on my Bambu A1 mini, I decided to just buy some from V-Belt guys.</p>'
        },
        { id: 'diffy-parts-img', type: 'image', url: 'images/rdiffyparts.png', caption: 'Part studio' },
        {
          id: 'diffy-build',
          type: 'text',
          text:
            '<h2>The build</h2><p>The diffy was assembled with 3D printed plates, gears, and axles, as well as metric bearings and bolts, and finally some HTD timing belts and stepper motors. The only issue I ran into during assembly was the tolerances on the 3D printed parts.</p>'
        },
        { id: 'diffy-build-img', type: 'image', url: 'images/diffybuild.jpg', caption: '' }
      ],
      sortOrder: 1
    },
    {
      id: 'capstan',
      title: 'Capstan Pivot',
      status: 'hold',
      statusColor: 'gray',
      date: '8/1/24',
      description:
        'All of the different iterations of my easy capstan pivot. I wanted to pursue this type of power transmission to see if it was worth applying to FRC. I am currently working on V0 (prototype) of the capstan pivot.',
      link: 'project.html?project=capstan',
      mediaType: 'image',
      mediaSrc: 'images/capstanmain.png',
      mediaAlt: 'Capstan preview',
      mediaPoster: '',
      contentBlocks: [
        {
          id: 'capstan-intro',
          type: 'text',
          text:
            '<p>All of the different iterations of my easy capstan pivot. I wanted to pursue this type of power transmission to see if it was worth applying to FRC.</p>'
        },
        { id: 'capstan-main-img', type: 'image', url: 'images/capstanmain.png', caption: '' }
      ],
      sortOrder: 2
    },
    {
      id: 'kyle',
      title: 'Kyle',
      status: 'live',
      statusColor: 'blue',
      date: '1/8/26',
      description:
        'Kyle is a web app I developed to learn more about API\'s and integrating AI into my projects. It asks for a geopolitical conflict description and returns a strategic analysis, predicted outcomes, and market impacts.',
      link: 'https://kyle-rho.vercel.app/',
      mediaType: 'image',
      mediaSrc: 'images/kyle-card.png',
      mediaAlt: 'Kyle conflict analysis app',
      mediaPoster: '',
      contentBlocks: [
        {
          id: 'kyle-intro',
          type: 'text',
          text:
            '<p>Kyle is a web app for conflict scenario analysis. Paste a conflict description and it returns strategic analysis, predicted outcomes, and market impacts.</p>'
        }
      ],
      sortOrder: 4
    }
  ];

  function sanitizeProject(input, fallbackIndex) {
    const fallback = defaultProjects[fallbackIndex] || defaultProjects[0];
    const id = typeof input.id === 'string' && input.id.trim() ? input.id.trim() : `project-${Date.now()}-${fallbackIndex}`;
    const title = typeof input.title === 'string' && input.title.trim() ? input.title.trim() : fallback.title;
    const description =
      typeof input.description === 'string' && input.description.trim() ? input.description.trim() : fallback.description;
    const link = typeof input.link === 'string' && input.link.trim() ? input.link.trim() : '#';
    const mediaType = input.mediaType === 'video' ? 'video' : 'image';
    const mediaSrc = typeof input.mediaSrc === 'string' ? input.mediaSrc.trim() : '';
    const mediaPoster = typeof input.mediaPoster === 'string' ? input.mediaPoster.trim() : '';
    const mediaAlt = typeof input.mediaAlt === 'string' && input.mediaAlt.trim() ? input.mediaAlt.trim() : title;
    const contentBlocks = Array.isArray(input.contentBlocks) ? input.contentBlocks : [];
    const date = typeof input.date === 'string' && input.date.trim() ? input.date.trim() : ''; 

    const rawStatus = typeof input.status === 'string' && input.status.trim() ? input.status.trim() : 'WIP';
    const normalizedStatus = rawStatus;

    const color = ['green', 'blue', 'yellow', 'gray', 'red'].includes(input.statusColor)
      ? input.statusColor
      : normalizedStatus === 'Completed'
        ? 'green'
        : normalizedStatus === 'Planned'
          ? 'yellow'
          : 'blue';

    const parsedSort = Number.parseInt(input.sortOrder, 10);

    return {
      id,
      title,
      status: normalizedStatus,
      statusColor: color,
      date,
      description,
      link,
      mediaType,
      mediaSrc,
      mediaAlt,
      mediaPoster,
      contentBlocks,
      sortOrder: Number.isNaN(parsedSort) ? fallbackIndex : parsedSort
    };
  }

  window.PortfolioProjects = {
    projects: defaultProjects,
    defaultProjects,
    sanitizeProject
  };
})();
