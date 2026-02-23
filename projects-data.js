(function () {
  const defaultProjects = [
    {
      id: 'robot2025',
      title: '2025 FRC Robot',
      status: 'Completed',
      statusColor: 'green',
      description:
        "A brief writeup of the main mechanisms I designed on this robot. After winning its first regional, this robot went on to win its division at the world championship and placed 3rd on the world stage.",
      link: 'robot2025.html',
      mediaType: 'image',
      mediaSrc: 'images/rmain.png',
      mediaAlt: '2025 Robot',
      mediaPoster: '',
      sortOrder: 0
    },
    {
      id: 'diffy',
      title: 'Intro to Differential',
      status: 'WIP',
      statusColor: 'blue',
      description:
        'A project to familiarize myself with designing bevel gears and programming differentials. This is my first time ever programming stepper motors, and outsourcing parts from vendors.',
      link: 'diffy.html',
      mediaType: 'image',
      mediaSrc: 'images/rdiffy.png',
      mediaAlt: 'Differential preview',
      mediaPoster: '',
      sortOrder: 1
    },
    {
      id: 'capstan',
      title: 'Capstan Pivot',
      status: 'WIP',
      statusColor: 'blue',
      description:
        'All of the different iterations of my easy capstan pivot. I wanted to pursue this type of power transmission to see if it was worth applying to FRC. I am currently working on V0 (prototype) of the capstan pivot.',
      link: 'capstan.html',
      mediaType: 'image',
      mediaSrc: 'images/capstanmain.png',
      mediaAlt: 'Capstan preview',
      mediaPoster: '',
      sortOrder: 2
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

    const rawStatus = typeof input.status === 'string' && input.status.trim() ? input.status.trim() : 'WIP';
    const normalizedStatus = ['Completed', 'WIP', 'Planned'].includes(rawStatus) ? rawStatus : rawStatus;

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
      description,
      link,
      mediaType,
      mediaSrc,
      mediaAlt,
      mediaPoster,
      sortOrder: Number.isNaN(parsedSort) ? fallbackIndex : parsedSort
    };
  }

  window.PortfolioProjects = {
    defaultProjects,
    sanitizeProject
  };
})();
