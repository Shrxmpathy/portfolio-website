/**
 * ============================================================================
 *  PORTFOLIO CONTENT — this is the only file you need to edit.
 * ============================================================================
 *
 *  Everything the site displays lives here. The layout components read from
 *  this file, so you can change text, projects, images, skills and links
 *  without touching any component code.
 *
 *  PLACEHOLDER CONVENTION
 *  ----------------------
 *  Any text wrapped in double square brackets renders on the page as a
 *  visibly marked placeholder chip, e.g.  "[[ADD YOUR GPA]]".
 *  That makes unfinished content impossible to miss. Delete the brackets
 *  once you have replaced the text with a verified detail.
 *
 *  Run `npm run todo` to list everything still outstanding.
 *
 *  SOURCE OF TRUTH
 *  ---------------
 *  Fields marked "from résumé" below were taken from
 *  Resumes/Keough_General_Resume.docx. Nothing here was invented. Where the
 *  résumé is silent, a placeholder is used instead of a guess.
 */

/* ------------------------------------------------------------------ types */

export type ImageSlot = {
  /** Path under /public, e.g. "/images/brace-render.png". null = show placeholder frame. */
  src: string | null
  /** Set instead of `src` to play a clip in this slot. `poster` is its still frame. */
  video?: string
  poster?: string
  /**
   * 'cover' (default) fills the frame and crops. 'contain' fits the whole
   * thing inside it, which is what wide plots and charts need so their axes
   * and legends are not cut off.
   */
  fit?: 'cover' | 'contain'
  /** Spans the full width of the gallery grid, in a wide frame rather than 4:3. */
  wide?: boolean
  /** What to add here. Shown inside the placeholder frame. */
  placeholder: string
  /** Descriptive alt text used once `src` is filled in. Required for accessibility. */
  alt: string
  caption: string
}

export type Project = {
  slug: string
  title: string
  category: string
  /** Short label shown near the title. Keep it honest. */
  status: string
  summary: string
  overview: string
  /** Optional: omit and the section is skipped rather than rendered empty. */
  context?: string
  objective: string
  requirements: string[]
  constraints: string[]
  role: string
  process: string[]
  tools: string[]
  /** Optional: omit and the section is skipped rather than rendered empty. */
  challenges?: string[]
  result?: string
  lessons: string[]
  /** Confidentiality / approval reminders. Rendered as a bordered note. */
  notes?: string[]
  links?: { label: string; href: string }[]
  images: ImageSlot[]
}

export type Organization = {
  name: string
  role: string
  dates: string
  description: string
  body: string
  details: { label: string; value: string }[]
  notes?: string[]
  images: ImageSlot[]
}

export type SkillGroup = {
  title: string
  items: string[]
}

/* ---------------------------------------------------------------- profile */

export const profile = {
  name: 'Christian Keough',
  title: 'Mechanical Engineering Student',
  headline: 'Mechanical Design, Code, and Biomechanics',
  supporting:
    'I’m a junior in mechanical engineering working toward prosthetics and assistive technology, combining biomechanical design, 3D modeling, and programming. Ultimately I want to design and build prosthetics for the kids and animals who need them.',
  /** One-line positioning statement. Used in the footer and meta tags. */
  positioning:
    'Combining mechanical design and computation to contribute to better prosthetic and assistive devices.',
  university: 'University of Florida',
  degree: 'B.S. Mechanical Engineering', // from résumé
  minor: 'Minor in Computer Science', // from résumé
  standing: 'Junior',
  expectedGraduation: 'May 2028', // from résumé
  location: 'Gainesville, FL', // from résumé
  /** Optional headshot. Leave as null to omit it entirely. */
  headshot: null as string | null,
  headshotAlt: 'Christian Keough',
  /**
   * Nav logo. null shows a dashed "LOGO" placeholder that still links home.
   * Drop a file in public/ and set this to e.g. '/logo.svg' when you have one.
   */
  logo: '/images/logo.png' as string | null,

  /**
   * Full-width banner at the top of the home page.
   *
   * Put a file in public/ and set `heroMedia` to it — e.g. '/hero.jpg' or
   * '/hero.mp4'. Video is detected by extension (.mp4 / .webm / .mov) and plays
   * muted, looped, and inline; it is skipped entirely for anyone who has
   * reduced motion turned on, so always set `heroPoster` as its still fallback.
   *
   * Until `heroMedia` is set, the banner shows a drafting-style placeholder.
   * Aim for a wide, landscape shot — it is cropped to a letterbox band.
   */
  heroMedia: '/lab-printing.mp4',
  heroPoster: '/lab-printing-poster.jpg',
  heroMediaAlt:
    'A direct ink write printer extruding material onto a substrate, with previously printed samples on the build plate below.',
  heroEyebrow: 'Mechanical Engineering Portfolio',
}

export const contact = {
  email: 'christiankeough1@gmail.com', // from résumé — matches the address recruiters already have
  linkedin: 'https://www.linkedin.com/in/christian-keough/', // from résumé
  // No GitHub link for now. To add one later, set the URL here and re-add the
  // button in Contact.tsx (GithubIcon is still in ui/BrandIcons.tsx).
  github: '',
  /** Put your PDF at public/resume.pdf so this path resolves. */
  resume: '/resume.pdf',
  availability:
    'I’m looking for opportunities where I can continue developing my CAD, programming, research, and biomechanical design skills while contributing to meaningful engineering work.',
  seeking: [
    'Prosthetics',
    'Biomechanics',
    'Assistive technology',
    'Medical devices',
    'Mechanical design',
    'Computational engineering',
    'Research and development',
  ],
}

export const seo = {
  title: 'Christian Keough | Mechanical Engineering, Prosthetic Design & Python',
  description:
    'Mechanical engineering student portfolio featuring SolidWorks design, prosthetics involvement, aerospace CAD, Python research tools, and an interest in computational biomechanics.',
  /** Absolute URL once deployed — Open Graph tags need a full URL, not a relative path. */
  siteUrl: '[[ADD DEPLOYED SITE URL]]',
  ogImage: '/og-image.jpg',
}

/* ------------------------------------------------------------------ about */

export const about = {
  body: [
    'I’m a mechanical engineering student interested in the connection between biomechanical design and programming. Through prosthetics involvement, CAD projects, and undergraduate research I have begun building that experience, and I want to keep improving on it.',
  ],
  facts: [
    { label: 'Program', value: 'B.S. Mechanical Engineering' },
    { label: 'Minor', value: 'Computer Science' },
    { label: 'Institution', value: 'University of Florida' },
    { label: 'Standing', value: 'Junior · May 2028' },
    { label: 'GPA', value: '3.86' },
    { label: 'Primary tools', value: 'SolidWorks, Python' },
    {
      label: 'Seeking',
      value: 'Internships, co-ops, and part-time work in engineering or programming',
    },
  ],
}

/* -------------------------------------------------------- projects banner */

/**
 * Full-width video band that heads the projects section on the home page.
 * Set `src` to null to drop the video and keep a plain title band.
 *
 * Confirm this footage is approved for public sharing before publishing —
 * lab equipment, samples and in-progress work may be your PI's to release.
 */
export const projectsBanner = {
  src: '/microscope.mp4' as string | null,
  poster: '/microscope-poster.jpg',
  alt: 'Christian Keough at a stereo microscope in the lab, adjusting a sample under magnification with the live view shown on the monitor beside him.',
  title: 'Projects',
  /**
   * Which part of the frame survives the crop. The band is far wider than the
   * footage, so a lot of the top and bottom is cut; 'center bottom' keeps the
   * microscope stage and slide in view instead of centring on the wall.
   *
   * Any CSS object-position value works — 'center 70%' to lift it slightly,
   * 'center bottom' to sit right on the stage.
   */
  objectPosition: 'center bottom',
}

/* ----------------------------------------------------------- focus areas */

export const focusAreas = [
  {
    index: '01',
    title: 'Prosthetic and Assistive Design',
    body: 'The part of engineering I keep coming back to is designing something that has to fit one specific person. Geometry stops being abstract when it has to sit against a body that moves. Working from CT data on the canine brace, and on a child’s bike pedal prosthetic with GRiP, has made the trade-off concrete: the more support you add, the more motion you take away, and the right answer depends on the individual rather than on a spec.',
    points: [
      'Human-centered design',
      'Fit and comfort',
      'Anatomy-derived geometry',
      'Movement and function',
      'Customization for an individual user',
      'Practical design constraints',
    ],
  },
  {
    index: '02',
    title: 'Computational Engineering',
    body: 'Building the Hansen solubility interface changed how I think about code in an engineering context. It isn’t a separate discipline from design. It’s a way of handling the parts of engineering that are too repetitive or too data-heavy to do by hand. Screening solvents one at a time was the bottleneck; writing the tool removed it. I’m interested in extending that to parametric and automated CAD, where you explore a design space instead of drawing one instance of it.',
    points: [
      'Engineering calculations',
      'Data analysis and organization',
      'Scientific visualization',
      'Parametric design and design exploration',
      'CAD automation',
      'Supporting engineering decisions',
    ],
  },
  {
    index: '03',
    title: 'Mechanical Design',
    body: 'Most of my hands-on experience is in SolidWorks: modeling parts, building assemblies, and producing drawings. The canine brace pushed me toward anatomy-aware geometry, where the reference surfaces come from a CT scan rather than a sketch. The aileron skin was the opposite problem: a part defined almost entirely by what it wraps and what it has to be built from. Both taught me that translating a requirement into a manufacturable form is where most of the real decisions happen.',
    points: [
      'SolidWorks',
      '3D part modeling',
      'Assembly modeling',
      'Engineering drawings',
      'Iterative design',
      'Anatomy-aware and aircraft geometry',
    ],
  },
]

/* --------------------------------------------------------------- projects */

export const projects: Project[] = [
  /* -------------------------------------------------- 01 — canine brace -- */
  {
    slug: 'canine-pelvic-brace-hip-socket',
    title: 'Canine Pelvic Brace with Hip Socket',
    category: 'Biomechanical Design · SolidWorks · Abaqus',
    // Analysis was run in simulation. Do not upgrade this to "manufactured"
    // or "tested" unless the device is physically built and fitted.
    status: 'CAD and simulation, not manufactured or fitted',
    summary:
      'A canine pelvic brace built from CT scan data in SolidWorks, with an integrated hip socket assistive device, joint articulation, and structural analysis in Abaqus.',
    overview:
      'A single project in two connected halves: a pelvic brace whose geometry is derived from CT scans, and a hip socket assistive device integrated into it with joint articulation. The brace and the socket could not be designed independently. The socket has to sit inside a structure that is itself following anatomy, so both halves are constrained by the same reference geometry. Most of the real work happened before any surface was drawn: building an anatomical coordinate system on the scan so that every later feature had a defensible reference instead of being placed by eye.',
    context:
      'Spring 2026. A personal project. I want to work on prosthetics for animals, both amputees and those born with congenital limb loss, and putting a prosthetic on an animal is what I would most like to do with this degree. This was my first step in learning that process.',
    objective:
      'Produce a CAD brace that follows the animal’s pelvic anatomy accurately enough to be a credible starting point for an assistive device, and integrate a hip socket that permits joint articulation rather than locking it out.',
    requirements: [
      'Geometry had to follow anatomy captured from CT scans rather than idealised primitives.',
      'The integrated hip socket had to allow joint articulation, not immobilise the joint.',
    ],
    constraints: [
      'The controlling surfaces came from scan data, so the reference geometry was organic and approximate, with no clean datum to build from.',
      'Support and mobility pull against each other: every increase in structural coverage costs range of motion.',
    ],
    role: 'Completely solo work. I modeled and analysed the entire thing myself.',
    process: [
      'Sourced a usable CT scan first, working through Embody3D veterinary scans and The Cancer Imaging Archive (TCIA) to find one I could build from.',
      'Brought the scan into Blender to reduce the polygon count, since the raw mesh was heavy enough to crash SolidWorks.',
      'Imported the CT-derived pelvis mesh into SolidWorks as the base reference geometry.',
      'Built an anatomical coordinate system before modeling anything: three named axes (iliac crest, acetabular, and ischial) with matched coronal, sagittal and transverse planes keyed to those landmarks, so every downstream feature referenced anatomy rather than an arbitrary origin.',
      'Traced 3D splines over the scan mesh to pull clean, buildable surfaces off noisy scan data, capturing roughly 25 anatomical reference points.',
      'Thickened the resulting surface into the brace shell rather than modeling a solid from the start, which kept the anatomical surface as the controlling geometry.',
      'Designed the hip socket as a ball-and-socket assembly of slotted cup, liner, ball, and articulating stem, seated on the acetabular axis, so the joint centre came from the anatomy instead of being positioned by eye.',
      'Ran structural analysis in Abaqus, completing three simulation validations on the design.',
      'Iterated the model, revising geometry where the analysis or the fit exposed a problem.',
    ],
    tools: ['SolidWorks', 'Abaqus', 'Blender', 'CT scan data (Embody3D, TCIA)'],
    challenges: [
      'Designing against scan-derived surfaces: unlike a machined part, the geometry is organic and every reference is an interpretation of the data.',
      'Scan meshes are noisy, so the splines had to follow the anatomy without inheriting the artefacts in the mesh. Smoothing too aggressively loses the landmark, and not enough leaves the surface unusable.',
      'The brace and socket are coupled, so changing one to improve fit moved the interface the other depended on.',
    ],
    result:
      'CAD model complete, with three Abaqus simulation validations. Analysis was performed in simulation only, and the design has not been printed as of yet.',
    lessons: [
      'Designing around a human body is fairly similar to designing around a canine one. The planes line up in much the same way; the geometry is just slightly different.',
      'Now I can hopefully use this knowledge to scan an actual animal’s issue area and model a prosthetic for it.',
    ],
    // Save the six screenshots into public/images/ using exactly these filenames.
    images: [
      {
        src: '/images/canine-brace-assembly.png',
        placeholder: 'Add final render of the brace and socket',
        alt: 'Rendered view of the canine pelvic brace with the integrated hip socket, showing the iliac crest, acetabular and ischial reference axes',
        caption:
          'Completed brace with the integrated socket, shown against the three anatomical reference axes the model was built on.',
      },
      {
        src: '/images/canine-ct-mesh-splines.png',
        placeholder: 'Add CT mesh with spline construction',
        alt: 'CT-derived pelvis mesh with boundary splines traced over the anatomy to define the brace surface',
        caption:
          'Boundary splines traced over the CT mesh. Pulling clean, buildable surfaces off noisy scan data was the slowest part of the project.',
      },
      {
        src: '/images/canine-reference-frame.png',
        placeholder: 'Add the anatomical reference frame construction',
        alt: 'Reference planes and axes constructed on the canine pelvis mesh in SolidWorks, labelled coronal iliac crest, coronal acetabular, ischial, sagittal and transverse',
        caption:
          'The anatomical coordinate system: coronal, sagittal and transverse planes keyed to the iliac crest, acetabular and ischial landmarks. Every later feature references this frame.',
      },
      {
        src: '/images/canine-socket-assembly.png',
        placeholder: 'Add the hip socket assembly',
        alt: 'Cutaway of the hip socket assembly showing the slotted cup, liner, ball and articulating stem',
        caption:
          'Socket assembly in section: slotted cup, liner, ball, and the articulating stem that carries the joint motion.',
      },
    ],
  },

  /* ------------------------------------------------------- 02 — hansen -- */
  {
    slug: 'hansen-solubility-interface',
    title: 'Hansen Solubility Material Selection Interface',
    category: 'Python · Research Computing',
    status: 'In use in the lab · Spring 2026 – present',
    summary:
      'A Python tool that parses solvent data and generates RED plots, built to speed up solvent selection for Vapor Induced Phase Separation work in my undergraduate research lab (FAMSIL).',
    overview:
      'I built this for my undergraduate research lab (FAMSIL), which studies Vapor Induced Phase Separation (VIPS). Solvent screening was being done by hand calculations, which take about two minutes each time, and longer once three components are involved. My tool parses solvent data from a CSV, computes RED values, which are essentially a compatibility radius, and plots them in 2D and 3D so a candidate can be judged by looking at a plot instead of working through calculations. The time of each calculation adds up in the long scheme of things.',
    context:
      'The laboratory studies Vapor Induced Phase Separation (VIPS) applied to direct ink write (DIW) printing of biomaterials. Solvent choice drives phase separation behaviour, so screening candidates quickly matters to the experimental work.',
    objective:
      'Replace manual RED calculation with a tool that screens a solvent set quickly and presents the result visually, so solvent selection stops being the slow step in the experimental loop.',
    requirements: [
      'Parse solvent data from CSV so the lab can extend the dataset without touching the code.',
      'Compute RED values across the solvent set, roughly 30 solvents screened.',
      'Generate 2D and 3D RED plots for visual comparison.',
      'Run in Google Colab so other lab members could open it without a local setup.',
    ],
    constraints: [
      'Had to be usable by lab members who did not write it.',
      'Had to stay editable and reproducible as the solvent dataset grew.',
      'Had to show each of the three graphs, since those are the parameters that decide compatibility.',
      'Had to be able to mix three components together, which meant taking in another CSV. The user then decides whether to keep the new combination and add it to the master sheet.',
    ],
    role:
      'I developed the tool entirely myself. It did not exist before. I had planned to work off an existing GitHub repository, but once I found it relied on machine learning, which I did not want in this, I wrote the whole thing from scratch.',
    process: [
      'Started from the research need, since solvent screening was slow, and worked out what the workflow had to do before writing code.',
      'Built CSV parsing so the solvent dataset lives outside the code and the lab can extend it.',
      'Sourced Hansen parameter values from several accepted datasets, including Wolfram Alpha, Steven Abbott’s tables, and the original Hansen solubility parameter list.',
      'Implemented the RED calculation and screened roughly 30 solvents, running 30 comparisons for material compatibility.',
      'Added 2D and 3D RED plots so candidates could be compared visually rather than from a table.',
      'Applied the interface to DIW VIPS solvent selection in the lab’s actual experimental work.',
    ],
    tools: [
      'Python',
      'Google Colab',
      'HSPiPy',
      'NumPy',
      'pandas',
      'Matplotlib',
      'Plotly',
      'ipywidgets',
    ],
    challenges: [
      'Making the tool usable by people who did not write it. That mattered more than anything else, because it has to keep working after I leave the lab.',
      'Sourcing values. There are thousands upon thousands of datasets out there, and picking trustworthy ones took real work.',
      'The graphing was a steep learning curve for me.',
      'Learning how Hansen solubility values are actually calculated. The maths behind them is involved.',
    ],
    result:
      'The interface is used for DIW VIPS solvent selection in the lab, cutting RED calculation time by about 95%.',
    lessons: [
      'Programming turned out to be most useful as a way of supporting engineering and research decisions, not as a separate skill sitting next to CAD.',
      'A tool other people can run is worth more than a faster one only you can operate.',
    ],
    images: [
      {
        src: '/images/hansen-3d-sphere.png',
        placeholder: 'Add a 3D RED plot',
        alt: 'Three-dimensional Hansen space plot showing the solubility sphere with the polymer at its centre and solvent points inside and outside the boundary',
        caption:
          'Hansen space in 3D. The sphere is the solubility boundary: a solvent inside it is compatible (shown blue), one outside it is not (shown red), and the polymer sits at the center (green).',
      },
      {
        src: '/images/hansen-2d-projection.png',
        wide: true,
        placeholder: 'Add a 2D RED projection',
        alt: 'Two-dimensional plot of delta D against delta H with the R-nought boundary circle and labelled solvent points',
        caption:
          'The same comparison projected into two dimensions. This plot is repeated three times, once for each pair of the three parameters, and every solvent’s RED value is labelled.',
      },
      {
        src: null,
        video: '/hansen-tool.mp4',
        poster: '/hansen-tool-poster.jpg',
        wide: true,
        fit: 'contain',
        placeholder: 'Add a screen recording of the tool',
        alt: 'Screen recording of the Hansen solubility interface running in Google Colab',
        caption:
          'The tool running in Colab. This is what the user sees after inputting their CSV file of mixtures. Only a few mixtures are shown here to keep the plots readable and less cluttered.',
      },
    ],
  },

  /* ---------------------------------------------------------- 04 — chair -- */
  {
    slug: 'adjustable-chair',
    title: 'Adjustable Chair Design',
    category: 'Ergonomic Design · SolidWorks',
    status: 'CAD concept · Fall 2025',
    summary:
      'An adjustable chair supporting knee-sitting and leaning postures, designed around ergonomic constraints and mechanical alignment.',
    overview:
      'A CAD project for a chair that supports more than one sitting posture, knee-sitting and leaning, rather than a single fixed position. Designing for two postures means the mechanism and the ergonomics have to be solved together: the adjustment has to be usable, and both end positions have to actually support a body.',
    // Context omitted: the date already appears in `status` above.
    context: '',
    objective:
      'Design a chair that transitions between knee-sitting and leaning positions while remaining ergonomically sound and mechanically buildable in both.',
    requirements: [
      'Support both a knee-sitting posture and a leaning posture.',
      'Maintain ergonomic support across the adjustment range, not just at the endpoints.',
    ],
    constraints: [
      'Screw alignment and mechanical constraints had to work across the full adjustment range.',
    ],
    role: 'Solo project. I modeled every part of the assembly myself.',
    process: [
      'Worked the ergonomics and the mechanism together, since a comfortable position that cannot be reached is not a design.',
      'Used CAD constraints and mates to check that the geometry held through the adjustment rather than only in one pose.',
      'Resolved screw alignment across the adjustment range, using McMaster-Carr screw parts so the fasteners matched real hardware rather than being approximated.',
    ],
    tools: ['SolidWorks', 'McMaster-Carr part library'],
    result: 'A 3D model design only. Nothing was printed or built.',
    lessons: [
      'This was my first time making a large assembly with multiple parts coming together. It was great to see every part I spent hours on become one large functioning object.',
    ],
    images: [
      {
        src: '/images/chair-assembly.png',
        placeholder: 'Add chair CAD render',
        alt: 'SolidWorks render of the adjustable chair showing the seat, knee rest, headrest, arm supports and castered base',
        caption:
          'Full assembly. The seat and knee rest carry the two postures between them, and the scissor linkage below sets how it moves.',
      },
      {
        src: '/images/chair-mechanism.png',
        placeholder: 'Add mechanism or alignment detail',
        alt: 'Detail view of the chair headrest mount and seat frame from above',
        caption: 'Headrest mount and seat frame, from above.',
      },
    ],
  },
  /* --------------------------------------------------- 03 — aileron skin -- */
  {
    slug: 'aircraft-aileron-skin',
    title: 'Aircraft Aileron Skin',
    category: 'Aerospace Design · SolidWorks · Design Build Fly',
    status: 'Component model, team aircraft project · Fall 2025',
    summary:
      'A SolidWorks model of the aileron skin geometry, developed on the Structures subteam of a Design Build Fly team.',
    overview:
      'On the Structures subteam of Design Build Fly, I modeled the aileron skin geometry and iterated roughly five designs, working with the wing subteam on fit and manufacturability. I want to be precise about scope: I modeled the skin. I did not design the aircraft, the wing, or the control system. What made it useful was that the part was defined almost entirely by what it wrapped and what it had to be built from.',
    context: 'Design Build Fly, Structures subteam, Fall 2025.',
    objective:
      'Produce aileron skin geometry that matched the wing subteam’s surface, fit the surrounding structure, and could actually be manufactured by the team.',
    requirements: [
      'Skin geometry had to match the profile the wing subteam had defined.',
      'The part had to be manufacturable with the methods available to the team.',
    ],
    constraints: [
      'Geometry was constrained from the outside in, since most of it was set by the wing surface and surrounding structure.',
    ],
    role:
      'I modeled the aileron skin geometry in SolidWorks and iterated approximately five designs. I also assisted with fabrication preparation and maintaining the workshop.',
    process: [
      'Worked on a single component inside a larger mechanical system, so the part could not be designed in isolation.',
      'Iterated roughly five designs rather than committing to the first geometry that closed.',
      'Collaborated with the wing subteam on fit and manufacturability, revising the skin against their surface.',
      'Assisted in fabrication preparation and kept the workshop organised.',
    ],
    tools: ['SolidWorks'],
    lessons: [
      'Working with other teams is one of the best parts of the engineering process. You learn how to be part of a bigger picture, and you get insight from people considering things you never would have.',
    ],
    notes: [
      'I modeled the aileron skin. This project does not represent the design of the full aircraft, wing, or control system.',
    ],
    images: [
      {
        src: '/images/aileron-skin-structure.png',
        placeholder: 'Add aileron skin SolidWorks render',
        alt: 'SolidWorks views of the aileron: the skin surface alongside the internal rib and spar structure it wraps',
        caption:
          'The skin surface beside the rib and spar structure it wraps. Most of the geometry was set by what it had to close over.',
      },
      {
        src: '/images/aileron-wing-top.png',
        placeholder: 'Add the wing viewed from above',
        alt: 'Full wing assembly viewed from above, with the internal rib structure visible through the skin',
        caption: 'Top of the full wing, with the rib bays visible through the skin the aileron section joins onto.',
      },
      {
        src: '/images/aileron-wing-bottom.png',
        placeholder: 'Add the wing viewed from below',
        alt: 'Full wing assembly viewed from below, showing the underside skin and spar line',
        caption: 'Underside of the same assembly, showing the spar line the skin is anchored to.',
      },
    ],
  },

]

/* --------------------------------------------------------------- research */

export const research = {
  lab: 'Florida Advanced Manufacturing and Systems Integration Laboratory', // from résumé
  shortName: 'FAMSIL',
  university: 'University of Florida',
  role: 'Undergraduate Lab Assistant', // from résumé
  dates: 'March 2026 – Present', // from résumé
  area: 'Vapor Induced Phase Separation (VIPS) · Direct Ink Write printing',
  body:
    'I run experiments modeling phase separation, using non-solvent induced phase separation alongside vapor induced phase separation. I also 3D print designs that make the lab run better, and I built a material compatibility model in Python that lets us decide quickly which inks to use in an experiment.',
}

/* ---------------------------------------------------------- organizations */

export const organizations: Organization[] = [
  {
    name: 'Generational Relief in Prosthetics (GRiP)',
    role: 'Production Design Team & 3D Printing Subteam Member', // from résumé
    dates: 'Spring 2026 – Present', // from résumé
    description: 'A student organization that works on prosthetic devices for children.',
    body:
      'I work on the Production Design and 3D Printing subteams, currently addressing stability needs for a child’s bike pedal prosthetic in SolidWorks for prototyping in TPU and PLA. A lot of the work is getting the geometry right before anything is printed. I extracted 15+ critical dimensions using ImageJ to drive the CAD rather than estimating them. This is the involvement that moved prosthetics from an interest to the direction I want my work to take.',
    details: [
      { label: 'Subteams', value: 'Production Design Team; 3D Printing Subteam' },
      { label: 'Current project', value: 'Child’s bike pedal prosthetic, stability design' },
      { label: 'CAD contributions', value: 'SolidWorks modeling; 15+ dimensions extracted via ImageJ' },
      { label: 'Fabrication', value: 'TPU and PLA 3D printing for prototyping' },
      { label: 'Tools used', value: 'SolidWorks, ImageJ, FDM 3D printing' },
    ],
    images: [
      {
        src: '/images/grip-brace.png',
        placeholder: 'Add approved GRiP image with no identifying information',
        alt: 'SolidWorks render of a slotted oval brace component modeled for Generational Relief in Prosthetics',
        caption: 'Brace component modeled in SolidWorks.',
      },
    ],
  },
  {
    name: 'Design Build Fly (DBF)',
    role: 'Structures Subteam Member', // from résumé
    dates: 'Fall 2025', // from résumé
    description:
      'A student aerospace design team that develops an aircraft for the Design Build Fly competition.',
    body:
      'On the Structures subteam I modeled the aileron skin geometry in SolidWorks, iterating roughly five designs and working with the wing subteam on fit and manufacturability. I also assisted with fabrication preparation. Working on one component inside a larger assembly meant following shared design requirements and thinking carefully about interfaces.',
    details: [
      { label: 'Subteam', value: 'Structures' },
      { label: 'Contribution', value: 'Aileron skin geometry, ~5 design iterations' },
      { label: 'Collaboration', value: 'Wing subteam, fit and manufacturability' },
      { label: 'Fabrication', value: 'Assisted fabrication preparation; workshop upkeep' },
    ],
    images: [
      {
        src: '/images/aileron-wing-top.png',
        placeholder: 'Add a Design Build Fly team or aircraft image',
        alt: 'Full wing assembly from the Design Build Fly aircraft, rib structure visible through the skin',
        caption: 'The wing assembly my aileron skin work sat inside.',
      },
    ],
  },
  {
    name: 'FIRST Robotics Competition & VEX Robotics',
    role: 'Mechanical Lead / Vice President', // from résumé
    dates: 'Fall 2020 – Spring 2022', // from résumé
    description: 'Competitive student robotics: mechanical design, assembly, and team leadership.',
    body:
      'I coordinated design and assembly across two VEX robot iterations. As lead engineer I integrated the sensors and drivetrain for both autonomous and driver-controlled operation, and I was also the lead driver in competition. This is where I first led a technical team rather than just contributing to one, and it is where my engineering passion actually came from: I found that I love working hands on with tools and making things come to life.',
    details: [
      { label: 'Role', value: 'Lead Engineer; Mechanical Lead; Vice President' },
      { label: 'Scope', value: '2 robot iterations, autonomous and driver-controlled' },
      { label: 'Contribution', value: 'Design and assembly coordination; sensor and drivetrain integration' },
      { label: 'Competition', value: 'Lead driver' },
    ],
    images: [],
  },
]

/* ------------------------------------------------------------ connections */

export const connections = {
  title: 'Where My Experience Connects',
  body: 'My undergraduate research lab is where I get handed problems every day that are not necessarily in my field, but that I can apply engineering solutions to. It is also where my programming experience lets me be a dual threat and a genuinely valuable part of the team. GRiP is what gave me experience working with a team to bring a project to life, and it introduced me to human-centered engineering problems at the same time. My SolidWorks projects taught me to think about geometry, interfaces, and design constraints, and Design Build Fly showed me what it takes to model one component inside a larger mechanical system. I want to bring these together in prosthetic and assistive-device design.',
  strands: [
    { from: 'Undergraduate research', to: 'Engineering solutions outside my own field' },
    { from: 'GRiP prosthetics work', to: 'Bringing a project to life with a team' },
    { from: 'Canine brace and socket', to: 'Anatomy-derived geometry and interfaces' },
    { from: 'Design Build Fly', to: 'Component design within a larger system' },
  ],
}

/* ----------------------------------------------------------------- skills */

// Only skills backed by the résumé appear here.
//
// NOTE: Abaqus and FEA are deliberately NOT listed, by your decision — the
// Abaqus analysis is described in the canine project write-up instead. If you
// later want it as a skill, add it to Programming & Analysis below.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Mechanical Design',
    items: [
      'SolidWorks',
      'Onshape',
      'Autodesk Inventor',
      '3D CAD',
      'Part and assembly modeling',
      'Engineering drawings',
      'Design iteration',
      'Component integration',
      '3D printing (TPU, PLA)',
    ],
  },
  {
    title: 'Programming and Computation',
    items: [
      'Python',
      'MATLAB',
      'C++',
      'Google Colab',
      'Engineering calculations',
      'Data analysis',
      'Scientific visualization',
    ],
  },
  {
    title: 'Research',
    items: [
      'Undergraduate research',
      'Hansen solubility parameters',
      'Vapor Induced Phase Separation',
      'Direct ink write (DIW) printing',
      'G-code',
      'Literature review',
      'Technical documentation',
      'Research communication',
    ],
  },
  {
    title: 'Team Experience',
    items: [
      'Generational Relief in Prosthetics',
      'Design Build Fly',
      'FIRST / VEX Robotics leadership',
      'Collaborative engineering',
      'Design communication',
      'Component-level design',
      'ImageJ',
    ],
  },
]

/** Credentials. Rendered separately from skills because they are verifiable. */
export const certifications = [
  { name: 'SolidWorks CAD Design Associate (CSWA)', issuer: 'Dassault Systèmes', year: '' },
  { name: 'Autodesk Inventor', issuer: 'Autodesk', year: '2022' },
]


/**
 * STAGING AREA — not rendered anywhere on the site.
 *
 * Deliberately withheld because they are not on your résumé. Move an entry
 * into `skillGroups` only once you can point to where you used it.
 */
export const skillsNotYetClaimed = [
  'ANSYS',
  'GD&T',
  'CNC machining',
  'Machine learning',
  'OpenSim',
  'Medical-device regulation',
  'Human-subject research',
  'Aerodynamic analysis',
  'Composite manufacturing',
]

/* ------------------------------------------------------ current projects */

/** Work in progress. Kept separate from `projects` so nothing here reads as finished. */
export const exploring = {
  title: 'Current Projects',
  intro: 'What I’m working on now. Not finished projects or qualifications yet.',
  topics: ['Prosthetic arm'],
}

/* -------------------------------------------------------------- navigation */

/** Top-level pages. `path` is a route, not an anchor — see src/lib/router.ts. */
export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Résumé', path: '/resume' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]
