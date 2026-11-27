export interface Experience {
  company: string;
  period: string;
  titleLines: [string, string];
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: 'MentorTechSolutions',
    period: 'MAY 2020 — PRESENT',
    titleLines: ['Senior Full-Stack', '& AI Engineer'],
    summary:
      'Architecting AI-powered solutions across React, Node.js, Python, and AWS, with a focus on efficient inference, dependable APIs, and automated delivery.',
    highlights: [
      'Increased data-processing throughput by 30% and reduced inference latency by 45%.',
      'Built a natural-language analytics platform that reduced manual reporting effort by more than 70%.',
      'Reduced deployment time by 60% through CI/CD, Docker, and Kubernetes.',
      'Redesigned computer-vision microservices to reduce infrastructure costs by 30%.',
      'Mentored three junior engineers and established reusable patterns across 12+ services.',
    ],
    technologies: ['Python', 'React', 'AWS', 'LangChain', 'FastAPI', 'Kubernetes'],
  },
  {
    company: 'Upwork · Freelancer',
    period: 'AUG 2016 — AUG 2019',
    titleLines: ['Full-Stack &', 'AI Developer'],
    summary:
      'Partnered with clients, designers, and product teams to deliver web applications and AI workflows across financial services and document processing.',
    highlights: [
      'Delivered 10+ AI-driven applications covering OCR, speech, computer vision, and document workflows.',
      'Built applications supporting workflows serving 25,000+ users.',
      'Reduced administrative effort by approximately 70% with a digital document-processing platform.',
      'Containerized applications and improved AWS pipelines, shortening deployment cycles by approximately 40%.',
    ],
    technologies: ['Next.js', 'Flask', 'Angular', 'Node.js', 'MongoDB', 'Docker'],
  },
];
