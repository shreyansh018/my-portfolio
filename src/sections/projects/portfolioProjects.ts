import { type PortfolioProject } from './portfolioConstellation';
import { preloadImage } from '../../utils/assetLoaders';
import { portfolioSkills } from './portfolioSkills';
import {
    PROJECT_DETAILS_IMAGE_SIZES,
    PROJECT_PREVIEW_IMAGE_SIZES,
    projectImagesById,
} from './projectImageAssets';

const withProjectScreenshots = (projects: PortfolioProject[]): PortfolioProject[] =>
    projects.map((project) => ({
        ...project,
        screenshot: projectImagesById[project.id]?.preview,
        detailsScreenshot: projectImagesById[project.id]?.details,
        skills: project.skills.map(
            (skill) =>
                portfolioSkills[portfolioSkills.findIndex((s) => s.id === skill)]?.label ?? skill,
        ),
    }));

const getAdjacentProjects = (
    project: PortfolioProject,
    projects: PortfolioProject[],
): PortfolioProject[] => {
    const index = projects.findIndex((candidate) => candidate.id === project.id);
    if (index < 0 || projects.length < 2) {
        return [];
    }

    return [
        projects[(index - 1 + projects.length) % projects.length],
        projects[(index + 1) % projects.length],
    ];
};

export const preloadAdjacentProjectScreenshots = (project: PortfolioProject): void => {
    const constellationProjects = portfolioProjects.filter(
        (candidate) => candidate.constellation.id === project.constellation.id,
    );
    const adjacentProjects = new Set([
        ...getAdjacentProjects(project, portfolioProjects),
        ...getAdjacentProjects(project, constellationProjects),
    ]);

    adjacentProjects.forEach((candidate) => {
        if (candidate.screenshot) {
            preloadImage(candidate.screenshot, PROJECT_PREVIEW_IMAGE_SIZES);
        }
    });
};

export const preloadAdjacentProjectDetails = async (project: PortfolioProject): Promise<void> => {
    const adjacentScreenshots = getAdjacentProjects(project, portfolioProjects).flatMap(
        (candidate) => (candidate.detailsScreenshot ? [candidate.detailsScreenshot] : []),
    );

    await Promise.allSettled(
        adjacentScreenshots.map((source) => preloadImage(source, PROJECT_DETAILS_IMAGE_SIZES)),
    );
};

const aiProjects: PortfolioProject[] = [
    {
        id: 'shreyansh-prep-ai',
        title: 'ShreyanshPrepAI',
        label: 'PrepAI',
        description:
            'A full-stack AI-powered interview preparation platform with microservices backend (auth, resume, interview, billing, roadmap). Integrates Groq-hosted LLMs via LangChain for PDF resume analysis, ATS feedback, personalized interview questions and learning roadmaps.',
        period: '2024 - Present',
        role: 'Independent Project',
        skills: ['full-stack', 'react', 'node-js', 'mongodb', 'redis', 'langchain', 'langgraph', 'llm', 'docker', 'firebase'],
        domain: 'AI / Career Tech',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'full-stack', position: [0.4, 0.6, 0], links: [] },
    },
    {
        id: 'enterprise-rag-application',
        title: 'Enterprise RAG Application',
        label: 'Agentic RAG',
        description:
            'Agentic RAG pipeline using LangGraph for multi-step reasoning, history-aware query planning, conversational routing and persistent memory. Document ingestion and semantic retrieval with Qdrant Cloud and Gemini embeddings, FlashRank reranking, NVIDIA NeMo Guardrails, Portkey gateway, FastAPI backend.',
        period: '2024 - Present',
        role: 'Independent Project',
        skills: ['back-end', 'python', 'fastapi', 'langchain', 'langgraph', 'rag', 'qdrant', 'llm'],
        domain: 'AI / Enterprise Search',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'back-end', position: [-0.5, -0.4, 0], links: [] },
    },
    {
        id: 'freshersjob-radar',
        title: 'FreshersJob Radar',
        label: 'Job Radar',
        description:
            'A Python application that aggregates and surfaces fresher job opportunities, helping candidates discover relevant openings faster.',
        period: '2024',
        role: 'Independent Project',
        skills: ['back-end', 'python'],
        domain: 'Career Tech / Automation',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'back-end', position: [0.2, 0.3, 0], links: [] },
    },
    {
        id: 'zoom-clone',
        title: 'Zoom Clone',
        label: 'Zoom Clone',
        description:
            'A real-time video conferencing clone built with TypeScript, featuring authentication, meetings, and live video rooms.',
        period: '2025',
        role: 'Independent Project',
        skills: ['full-stack', 'typescript', 'react'],
        domain: 'Real-time Communication',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'full-stack', position: [-0.3, -0.5, 0], links: [] },
    },
    {
        id: 'storage-web-application',
        title: 'Storage Web Application',
        label: 'Storage App',
        description:
            'A TypeScript-based storage management web application with a modern frontend and cloud-ready architecture.',
        period: '2025',
        role: 'Independent Project',
        skills: ['front-end', 'typescript', 'react'],
        domain: 'Web Applications',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'front-end', position: [0.6, -0.2, 0], links: [] },
    },
    {
        id: 'ecommerce-sales-dashboard',
        title: 'Ecommerce Sales Dashboard',
        label: 'Sales Dashboard',
        description:
            'An interactive HTML dashboard for visualizing ecommerce sales metrics and trends.',
        period: '2024',
        role: 'Independent Project',
        skills: ['front-end', 'html', 'css', 'javascript'],
        domain: 'Data Visualization',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'front-end', position: [-0.7, 0.4, 0], links: [] },
    },
    {
        id: 'sweety-glucose-tracker-app',
        title: 'Sweety Glucose Tracker App',
        label: 'Glucose Tracker',
        description:
            'A JavaScript application for tracking glucose levels, helping users monitor health metrics over time.',
        period: '2025',
        role: 'Independent Project',
        skills: ['front-end', 'javascript'],
        domain: 'Health Tech',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'front-end', position: [0.1, -0.6, 0], links: [] },
    },
    {
        id: 'website-review',
        title: 'Website Review',
        label: 'Website Review',
        description:
            'A Python tool for reviewing and analyzing websites, providing automated insights and feedback.',
        period: '2025',
        role: 'Independent Project',
        skills: ['back-end', 'python'],
        domain: 'Web Analysis',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'back-end', position: [0.5, 0.1, 0], links: [] },
    },
    {
        id: 'my-portfolio',
        title: 'Interactive 3D Portfolio',
        label: 'My Portfolio',
        description:
            'A cinematic, interactive 3D portfolio built with Three.js, GSAP, TypeScript, and Vite. Features a WebGL constellation of projects, scroll-driven storytelling, responsive rendering, and a contact flow.',
        period: '2026',
        role: 'Independent Project',
        skills: ['front-end', 'typescript', 'vite', 'three-js', 'webgl', 'glsl', 'gsap', 'scroll-trigger', 'scroll-smoother', 'split-text', 'html', 'scss', 'responsive-design', 'shader-development', '3d-interaction', 'motion-design', 'performance-optimization'],
        domain: 'Creative Web Development / Interactive 3D',
        owner: 'Shreyansh Rajput',
        constellation: { id: 'front-end', position: [-0.2, 0.9, 0], links: [] },
    },
];

const constellationScrollOrder = {
    'front-end': 0,
    'full-stack': 1,
    'back-end': 2,
} satisfies Record<PortfolioProject['constellation']['id'], number>;

const compareProjectScrollOrder = (a: PortfolioProject, b: PortfolioProject): number =>
    constellationScrollOrder[a.constellation.id] - constellationScrollOrder[b.constellation.id] ||
    a.constellation.position[0] - b.constellation.position[0] ||
    b.constellation.position[1] - a.constellation.position[1];

const portfolioProjectsWithoutScreenshots: PortfolioProject[] = [...aiProjects].sort(
    compareProjectScrollOrder,
);

export const portfolioProjects: PortfolioProject[] = withProjectScreenshots(
    portfolioProjectsWithoutScreenshots,
);