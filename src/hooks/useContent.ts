import { useState, useEffect } from 'react';

// Types for our content data
export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    packages: {
        name: string;
        price: string;
        duration: string;
        features: string[];
    }[];
}

export interface CaseStudy {
    id: string;
    title: string;
    client: string;
    industry: string;
    duration: string;
    budget: string;
    category: string;
    image: string;
    video?: string;
    excerpt: string;
    problem: string;
    solution: string;
    results: string[];
    technologies: string[];
    metrics: Record<string, string>;
    testimonial: {
        text: string;
        author: string;
        position: string;
    };
}

export interface Testimonial {
    id: string;
    name: string;
    position: string;
    company: string;
    image: string;
    rating: number;
    text: string;
    service: string;
    project: string;
}

export interface TeamMember {
    id: string;
    name: string;
    position: string;
    image: string;
    bio: string;
    specialties: string[];
    experience: string;
    education: string;
    social: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        dribbble?: string;
        email: string;
    };
    quote: string;
}

export interface CompanyInfo {
    name: string;
    founded: string;
    mission: string;
    vision: string;
    values: string[];
    culture: string;
    achievements: string[];
}

export interface TeamData {
    team: TeamMember[];
    company: CompanyInfo;
}

// Hook for loading services data
export const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const response = await fetch('/content/services.json');
                if (!response.ok) {
                    throw new Error(`Failed to load services data: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setServices(data.services || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    return { services, loading, error };
};

// Hook for loading case studies data
export const useCaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCaseStudies = async () => {
            try {
                const response = await fetch('/content/case-studies.json');
                if (!response.ok) {
                    throw new Error(`Failed to load case studies data: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setCaseStudies(data.caseStudies || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load case studies');
            } finally {
                setLoading(false);
            }
        };

        loadCaseStudies();
    }, []);

    return { caseStudies, loading, error };
};

// Hook for loading testimonials data
export const useTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTestimonials = async () => {
            try {
                const response = await fetch('/content/testimonials.json');
                if (!response.ok) {
                    throw new Error(`Failed to load testimonials data: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setTestimonials(data.testimonials || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };

        loadTestimonials();
    }, []);

    return { testimonials, loading, error };
};

// Hook for loading team data
export const useTeam = () => {
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeam = async () => {
            try {
                const response = await fetch('/content/team.json');
                if (!response.ok) {
                    throw new Error(`Failed to load team data: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setTeamData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load team data');
            } finally {
                setLoading(false);
            }
        };

        loadTeam();
    }, []);

    return { teamData, loading, error };
};

// Utility function to get service by ID
export const getServiceById = (services: Service[], id: string): Service | undefined => {
    return services.find(service => service.id === id);
};

// Utility function to get case study by ID
export const getCaseStudyById = (caseStudies: CaseStudy[], id: string): CaseStudy | undefined => {
    return caseStudies.find(caseStudy => caseStudy.id === id);
};

// Utility function to filter case studies by category
export const filterCaseStudiesByCategory = (caseStudies: CaseStudy[], category: string): CaseStudy[] => {
    if (category === 'all') return caseStudies;
    return caseStudies.filter(caseStudy => caseStudy.category === category);
};

// Utility function to get testimonials by service
export const getTestimonialsByService = (testimonials: Testimonial[], service: string): Testimonial[] => {
    return testimonials.filter(testimonial => testimonial.service === service);
}; 