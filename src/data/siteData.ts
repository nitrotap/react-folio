// 1. Define all sections at the top
const sections = {
  hero: {
    id: "hero",
    type: "hero",
    variant: "showcase",
    title: "Kartik Jevaji",
    subtitle: "Full Stack Web Developer | AI/LLM associate | Denver, CO",
    highlights: [
      "Innovative full-stack developer with expertise in modern web technologies, AI/LLM integration, and cross-platform development.",
      "Proven track record of delivering end-to-end solutions from requirements gathering to production deployment.",
      "Specialized experience in legacy system modernization and mental health applications."
    ],
    animation: "hero-animation",
    metadata: {
      title: "Kartik Jevaji - Full Stack Developer",
      description: "Innovative full-stack developer and AI/LLM associate based in Denver, CO.",
      image: "/file.svg"
    }
  },
  aboutShort: {
    id: "about-short",
    type: "about",
    variant: 'split',
    title: "Profile",
    paragraphs: [
      "Innovative full-stack developer with expertise in modern web technologies, AI/LLM integration, and cross-platform development. Proven track record of delivering end-to-end solutions from requirements gathering to production deployment, with specialized experience in legacy system modernization and mental health applications.",
      "Combines strong technical skills with excellent communication abilities and a passion for creating meaningful impact through technology."
    ],
    highlights: [
      "2+ years experience",
      "AI/LLM associate",
      "Denver, CO"
    ],
    metadata: {
      title: "About Kartik Jevaji",
      description: "Professional profile and summary of Kartik Jevaji, full stack developer and AI/LLM associate.",
    }
  },
  aboutFull: {
    id: "about-full",
    type: "about",
    title: "Professional Profile",
    paragraphs: [
      "Innovative full-stack developer with expertise in modern web technologies, AI/LLM integration, and cross-platform development. Proven track record of delivering end-to-end solutions from requirements gathering to production deployment, with specialized experience in legacy system modernization and mental health applications.",
      "Combines strong technical skills with excellent communication abilities and a passion for creating meaningful impact through technology."
    ],
    metadata: {
      title: "About Kartik Jevaji",
      description: "Professional profile and summary of Kartik Jevaji, full stack developer and AI/LLM associate.",
    }
  },
  techSkills: {
    id: "tech-skills",
    type: "skills",
    variant: "table",
    title: "Technical Expertise",
    lists: [
      { title: "Languages", items: ["JavaScript", "TypeScript", "PHP", "HTML", "CSS", "SQL", "Java", "Python", "R", "SAS", "OCaml", "ReasonML"] },
      { title: "Frameworks & Libraries", items: ["React", "ReasonReact", "Next.js", "Angular", "Ionic", "jQuery", "Material UI", "Chart.js", "HTML5", "CSS3", "Materialize", "Handlebars.js", "Service Workers", "PWAs", "Capacitor", "Cordova"] },
      { title: "Backend & DevOps", items: ["Node.js/npm", "Express.js", "Apache Server", "PHP", "Composer", "Apollo Server", "GraphQL", "RESTful APIs", "Jest", "Docker", "WordPress", "Custom Plugin Development", "COBOL", "Regex Parsing"] },
      { title: "Design & UI/UX", items: ["Figma", "Sketch", "Wireframing", "UI/UX Design", "Style Guide Development"] },
      { title: "Testing", items: ["Jest", "Playwright", "End-to-End Testing", "Unit Testing", "Integration Testing"] },
      { title: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Mongoose", "Sequelize", "MariaDB", "NoSQL", "JAWSDB"] },
      { title: "Cloud & Deployment", items: ["AWS", "Heroku", "Vercel", "Ubuntu Linux", "CI/CD Pipelines"] },
      { title: "AI/LLM & Data Science", items: ["Anthropic Claude", "OpenAI GPT-4o", "OpenAI Assistants API", "Qwen 2.5 Coder", "Llama", "Hugging Face", "LangChain", "RAG", "Model Fine-tuning", "Synthetic Data Generation", "Prompt Engineering", "LLM Tracing", "Generative UI", "Kaggle"] },
      { title: "Analytics & SEO", items: ["Google Analytics", "Google Search Console", "Bing Web Tools", "SEO Optimization"] },
      { title: "Productivity & Workflow", items: ["Git/GitHub", "GitLab", "Jupyter", "Jira", "Confluence", "Notion", "Agile & Waterfall workflows", "Functional & OOP paradigms", "Microsoft Office Suite", "Google Workspace & APIs"] },
      { title: "Platforms", items: ["Web Applications", "Android", "iOS", "Progressive Web Apps (PWAs)"] }
    ],
    metadata: {
      title: "Technical Skills - Kartik Jevaji",
      description: "Technical skills and expertise of Kartik Jevaji, including programming languages, frameworks, databases, and more."
    }
  },
  techSkillsProjectBadges: {
    id: "tech-skills-project-badges",
    type: "skills",
    variant: "project-badges",
    title: "Project Tech Stacks",
    projects: [] as import("./types").Project[],
    metadata: {
      title: "Project Tech Stacks - Kartik Jevaji",
      description: "Badges for technologies used in featured projects by Kartik Jevaji."
    }
  },
  projects: {
    id: "projects",
    type: "project",
    title: "Featured Projects",
    projects: [
      {
        name: "Mental Health Check",
        description: "Comprehensive mental health quiz progressive web app that helps users track their moods and check-in with their mental wellness.",
        url: "https://www.mhcheck.app/",
        github: "https://github.com/nitrotap/mental-health-check",
        techStack: ["MongoDB", "Express.js", "Node.js", "Apollo Server", "GraphQL", "React", "Material UI", "Chart.js", "Heroku"],
        screenshot: "/public/ai-mhcheck-placeholder.png"
      },
      {
        name: "Brain Lift",
        description: "Full-stack cross-platform application to help users learn, measure, and track their cognitive load using the NASA Task Load Index. Available on web, iOS, and Android platforms.",
        url: "https://www.brain-lift.org/",
        github: "https://github.com/nitrotap/brain-lift",
        techStack: ["MariaDB", "PHP", "Apache Server", "Angular", "Ionic", "Capacitor", "Cordova", "Ubuntu Linux"],
        screenshot: "/public/ai-brainlift-placeholder.png"
      }
    ],
    metadata: {
      title: "Projects - Kartik Jevaji",
      description: "Featured projects by Kartik Jevaji, including Mental Health Check and Brain Lift."
    }
  },
  experience: {
    id: "experience",
    type: "experience",
    title: "Professional Experience",
    experiences: [
      {
        company: "Phase Change Software",
        title: "Junior Software Engineer",
        period: "2022 – Present",
        location: "Denver, CO",
        highlights: [
          "Developed customer and software administration platform using Angular.",
          "Built LLM Agent prototypes using GPT-4o, OpenAI Assistants API, and RAG implementation.",
          "Created LLM-based generative UI systems and interfaces.",
          "Implemented prompt engineering and tracing capabilities.",
          "Contributed to engineering team testing initiatives using ReasonReact.",
          "Full-cycle website development, custom plugin creation, and release management.",
          "Implemented Google Analytics, Google Search Console, and Bing Web Tools.",
          "Created wireframes and designs using Figma and Sketch.",
          "Developed LLM-powered COBOL documentation and test writing tools.",
          "Implemented regex-based COBOL parsing solutions.",
          "Worked with GPT-4o, Claude Sonnet 3.5, and Qwen 2.5 Coder models.",
          "Fine-tuned Qwen 2.5 Coder for specialized applications.",
          "Created training datasets for COBOL and CMS Pricer systems.",
          "Developed comprehensive style guides and technical documentation.",
          "Handled MacBook deployment and system updates.",
          "Earned CompTIA A+ certification."
        ]
      },
      {
        company: "Uber (Independent Contractor)",
        title: "Driver",
        period: "2022",
        location: "Denver, CO",
        highlights: [
          "Provided excellent service to a diverse passenger base.",
          "Maintained an impeccable safety record by strictly following traffic rules.",
          "Successfully operated as an independent contractor, balancing finances and customer satisfaction."
        ]
      },
      {
        company: "Alzheimer's Association",
        title: "Volunteer - Data Entry/Tech Support",
        period: "2017 – 2022",
        location: "Denver, CO",
        highlights: [
          "Applied critical thinking to ensure accuracy of key database identifiers.",
          "Delivered quick problem-solving during education classes, providing on-demand tech support virtually.",
          "Provided excellent customer service to increase volunteer engagement.",
          "Implemented Google Sheets API to automate business processes."
        ]
      }
    ],
    metadata: {
      title: "Experience - Kartik Jevaji",
      description: "Professional experience of Kartik Jevaji, including roles at Phase Change Software, Uber, and Alzheimer's Association."
    }
  },
  education: {
    id: "education",
    type: "education",
    title: "Education & Certifications",
    education: [
      {
        institution: "CompTIA A+",
        degree: "IT Fundamentals Certification",
        year: "2024"
      },
      {
        institution: "Regis University",
        degree: "Certificate in Full Stack Web Development - LAMP Stack",
        year: "2023"
      },
      {
        institution: "University of Minnesota",
        degree: "Certificate in Full Stack Web Development - MERN Stack",
        year: "2022"
      },
      {
        institution: "University of Pittsburgh",
        degree: "Master's in Statistics",
        year: "2011"
      },
      {
        institution: "University of Pittsburgh",
        degree: "Bachelor's in Statistics",
        year: "2011"
      }
    ],
    metadata: {
      title: "Education - Kartik Jevaji",
      description: "Education and certifications of Kartik Jevaji."
    }
  },
  contact: {
    id: "contact",
    type: "contact",
    title: "Contact",
    contactMethods: [
      { type: "Email", value: "kartikinpublic@gmail.com" },
      { type: "GitHub", value: "@nitrotap", url: "https://github.com/nitrotap" },
      { type: "LinkedIn", value: "kjevaji", url: "https://www.linkedin.com/in/kjevaji/" },
      { type: "Portfolio", value: "nitrotap.dev", url: "https://www.nitrotap.dev" }
    ],
    metadata: {
      title: "Contact - Kartik Jevaji",
      description: "Contact information for Kartik Jevaji."
    }
  }
};

// After defining sections.projects, assign its projects to techSkillsProjectBadges.projects
sections.techSkillsProjectBadges.projects = sections.projects.projects;

// 2. Reference sections in pages
export const siteData = {
  name: "Kartik Jevaji",
  gitHubUserName: "nitrotap",
  pages: [
    {
      slug: "home",
      title: "Home",
      metadata: {
        title: "Kartik Jevaji | Full Stack Web Developer",
        description: "Portfolio of Kartik Jevaji (@nitrotap), Full Stack Web Developer, AI/LLM associate, and cross-platform engineer.",
        keywords: ["Kartik Jevaji", "Full Stack Developer", "AI", "LLM", "Portfolio", "Denver"],
        image: "/file.svg"
      },
      sections: [
        { ...sections.hero },
        { ...sections.aboutShort },
        { ...sections.experience },
        { ...sections.techSkills },
        { ...sections.techSkillsProjectBadges }, // Add here
      ]
    },
    {
      slug: "about",
      title: "About",
      metadata: {
        title: "About Kartik Jevaji",
        description: "Professional profile, technical expertise, and skills of Kartik Jevaji.",
        keywords: ["About", "Profile", "Skills", "Kartik Jevaji", "Full Stack Developer"],
        image: "/file.svg"
      },
      sections: [
        { ...sections.aboutFull },
        { ...sections.techSkills }
      ]
    },
    {
      slug: "projects",
      title: "Projects",
      metadata: {
        title: "Projects - Kartik Jevaji",
        description: "Featured projects by Kartik Jevaji, including Mental Health Check and Brain Lift.",
        keywords: ["Projects", "Portfolio", "Kartik Jevaji", "Full Stack Developer"],
        image: "/file.svg"
      },
      sections: [
        { ...sections.projects }
      ]
    },
    {
      slug: "experience",
      title: "Experience",
      metadata: {
        title: "Experience - Kartik Jevaji",
        description: "Professional experience of Kartik Jevaji, including roles at Phase Change Software, Uber, and Alzheimer's Association.",
        keywords: ["Experience", "Work", "Career", "Kartik Jevaji", "Full Stack Developer"],
        image: "/file.svg"
      },
      sections: [
        { ...sections.experience }
      ]
    },
    {
      slug: "education",
      title: "Education",
      metadata: {
        title: "Education - Kartik Jevaji",
        description: "Education and certifications of Kartik Jevaji.",
        keywords: ["Education", "Certifications", "Kartik Jevaji", "Full Stack Developer"],
        image: "/file.svg"
      },
      sections: [
        { ...sections.education }
      ]
    },
    {
      slug: "contact",
      title: "Contact",
      metadata: {
        title: "Contact - Kartik Jevaji",
        description: "Contact information for Kartik Jevaji.",
        keywords: ["Contact", "Email", "LinkedIn", "GitHub", "Kartik Jevaji"],
        image: "/file.svg"
      },
      sections: [
        { ...sections.contact }
      ]
    }
  ]
};

