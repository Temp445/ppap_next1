import { ZodSchema } from 'zod';
import { templateMeta as enquiryTemplateMeta } from './enquiry.template';
import { templateMeta as enquiryGreetingsTemplate } from './enquiry_greetings.template';

export type ComponentType = 'body' | 'header';

type ComponentParam = {
  key: string;
  type: 'text' | 'date_time' | 'image';
  component: ComponentType;
};

export type TemplateMeta<T extends object> = {
  templateId: string;
  name: string;
  description?: string;
  language?: string;
  placeholders: (keyof T)[];
  schema: ZodSchema<T>;
  componentsMap: ComponentParam[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedRegistry: Record<string, TemplateMeta<any>> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTemplateRegistry(): Record<string, TemplateMeta<any>> {
  if (cachedRegistry) return cachedRegistry;
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registry: Record<string, TemplateMeta<any>> = {};

  // Manually register each template
  const templates = [
    enquiryTemplateMeta,
  enquiryGreetingsTemplate,
  ];

  for (const template of templates) {
    registry[template.templateId] = template;
    console.log(`[Registry] Registered: ${template.templateId}`);
  }

  cachedRegistry = registry;
  return cachedRegistry;
}
