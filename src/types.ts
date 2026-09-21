export type ProjectType = 'landing' | 'corporate' | 'ecommerce' | 'service' | 'lms';

export type DesignTier = 'custom_ui' | 'premium_3d' | 'redesign';

export type ExtraModuleId = 
  | 'mobile_adaptive'
  | 'telegram_bot'
  | 'payment'
  | 'crm'
  | 'multilang'
  | 'seo_copy'
  | 'quiz_cro'
  | 'analytics_tracking'
  | 'speed_optimization'
  | 'branding'
  | 'support_30d'
  | 'client_portal';

export interface ExtraModule {
  id: ExtraModuleId;
  name: string;
  description: string;
  price: number;
  percentage?: number;
  days: number;
  category: string;
}

export interface CalculatorState {
  projectType: ProjectType;
  designTier: DesignTier;
  selectedModules: ExtraModuleId[];
  urgency: 'standard' | 'fast';
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'ecommerce' | 'corporate' | 'lms' | 'landing';
  categoryLabel: string;
  summary: string;
  highlightMetric: string;
  highlightLabel: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  duration: string;
}

export interface PainPoint {
  id: string;
  title: string;
  clientPain: string;
  consequences: string;
  studioSolution: string;
  guaranteeBadge: string;
}

export interface SolutionFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  metric: string;
  metricDesc: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  deliverables: string[];
  clientRole: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
