export const siteData = {
  name: "Kartik Jevaji",
  gitHubUserName: "nitrotap",
  pages: [
    {
      slug: "home",
      title: "Home",
      metadata: {
        title: "Kartik Jevaji | Full Stack Web Developer",
        description: "Portfolio of Kartik Jevaji (@nitrotap), Full Stack Web Developer, AI/LLM specialist, and cross-platform engineer.",
        keywords: ["Kartik Jevaji", "Full Stack Developer", "AI", "LLM", "Portfolio", "Denver"],
        image: "/file.svg"
      },
      sections: [
        {
          id: "hero",
          type: "hero",
          title: "Kartik Jevaji",
          subtitle: "Full Stack Web Developer | AI/LLM Specialist | Denver, CO",
          highlights: [
            "Innovative full-stack developer with expertise in modern web technologies, AI/LLM integration, and cross-platform development.",
            "Proven track record of delivering end-to-end solutions from requirements gathering to production deployment.",
            "Specialized experience in legacy system modernization and mental health applications."
          ],
          animation: "hero-animation",
          metadata: {
            title: "Kartik Jevaji - Full Stack Developer",
            description: "Innovative full-stack developer and AI/LLM specialist based in Denver, CO.",
            image: "/file.svg"
          }
        },
        {
          id: "about-short",
          type: "about",
          title: "Professional Profile",
          paragraphs: [
            "Innovative full-stack developer with expertise in modern web technologies, AI/LLM integration, and cross-platform development. Proven track record of delivering end-to-end solutions from requirements gathering to production deployment, with specialized experience in legacy system modernization and mental health applications.",
            "Combines strong technical skills with excellent communication abilities and a passion for creating meaningful impact through technology."
          ],
          metadata: {
            title: "About Kartik Jevaji",
            description: "Professional profile and summary of Kartik Jevaji, full stack developer and AI/LLM specialist.",
          }
        },
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
        {
          id: "about-full",
          type: "about",
          title: "Professional Profile",
          paragraphs: [
            "Innovative full-stack developer with expertise in modern web technologies, AI/LLM integration, and cross-platform development. Proven track record of delivering end-to-end solutions from requirements gathering to production deployment, with specialized experience in legacy system modernization and mental health applications.",
            "Combines strong technical skills with excellent communication abilities and a passion for creating meaningful impact through technology."
          ],
          metadata: {
            title: "About Kartik Jevaji",
            description: "Professional profile and summary of Kartik Jevaji, full stack developer and AI/LLM specialist.",
          }
        },
        {
          id: "tech-skills",
          type: "skills",
          title: "Technical Expertise",
          lists: [
            ["JavaScript", "TypeScript", "PHP", "HTML", "CSS", "SQL", "Java", "Python", "R", "SAS", "OCaml", "ReasonML"],
            ["React", "ReasonReact", "Next.js", "Angular", "Ionic", "jQuery", "Material UI", "Chart.js", "HTML5", "CSS3", "Materialize", "Handlebars.js", "Service Workers", "PWAs", "Capacitor", "Cordova"],
            ["Node.js/npm", "Express.js", "Apache Server", "PHP", "Composer", "Apollo Server", "GraphQL", "RESTful APIs", "Jest", "Docker", "WordPress", "Custom Plugin Development", "COBOL", "Regex Parsing"],
            ["Figma", "Sketch", "Wireframing", "UI/UX Design", "Style Guide Development"],
            ["Jest", "Playwright", "End-to-End Testing", "Unit Testing", "Integration Testing"],
            ["MySQL", "PostgreSQL", "MongoDB", "Mongoose", "Sequelize", "MariaDB", "NoSQL", "JAWSDB"],
            ["AWS", "Heroku", "Vercel", "Ubuntu Linux", "CI/CD Pipelines"],
            ["Anthropic Claude", "OpenAI GPT-4o", "OpenAI Assistants API", "Qwen 2.5 Coder", "Llama", "Hugging Face", "LangChain", "RAG", "Model Fine-tuning", "Synthetic Data Generation", "Prompt Engineering", "LLM Tracing", "Generative UI", "Kaggle"],
            ["Google Analytics", "Google Search Console", "Bing Web Tools", "SEO Optimization"],
            ["Git/GitHub", "GitLab", "Jupyter", "Jira", "Confluence", "Notion", "Agile & Waterfall workflows", "Functional & OOP paradigms", "Microsoft Office Suite", "Google Workspace & APIs"],
            ["Web Applications", "Android", "iOS", "Progressive Web Apps (PWAs)"]
          ],
          metadata: {
            title: "Technical Skills - Kartik Jevaji",
            description: "Technical skills and expertise of Kartik Jevaji, including programming languages, frameworks, databases, and more."
          }
        }
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
        {
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
            description: "Featured projects by Kartik Jevaji, including Mental Health Check and Brain Lift.",
          }
        }
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
        {
          id: "experience",
          type: "experience",
          title: "Professional Experience",
          experiences: [
            {
              company: "Phase Change Software",
              title: "Software Engineer",
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
              period: "Present",
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
              period: "2017 – Present",
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
        }
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
        {
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
        }
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
        {
          id: "contact",
          type: "contact",
          title: "Contact",
          contactMethods: [
            { type: "Email", value: "kjevaji@gmail.com" },
            { type: "GitHub", value: "@nitrotap", url: "https://github.com/nitrotap" },
            { type: "LinkedIn", value: "kjevaji", url: "https://www.linkedin.com/in/kjevaji/" },
            { type: "Portfolio", value: "nitrotap.dev", url: "https://www.nitrotap.dev" }
          ],
          metadata: {
            title: "Contact - Kartik Jevaji",
            description: "Contact information for Kartik Jevaji."
          }
        }
      ]
    }
  ]
};

