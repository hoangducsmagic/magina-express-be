import Joi from 'joi';
import { SortOrder } from 'mongoose';

export const mockDataValidator = Joi.object({
  'x-mock-data': Joi.string().optional()
})
  .default('false')
  .options({ allowUnknown: true });

export const GET_LIST_DEFAULT_LIMIT = 25;
export const GET_LIST_DEFAULT_PAGE = 1;
export const GET_LIST_DEFAULT_SORT_FIELD = 'createdAt';
export const GET_LIST_DEFAULT_SORT_TYPE: SortOrder = -1;

export const RESOURCES = Object.freeze({
  CANDIDATES: 'candidates',
  USERS: 'users',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
  COMPANIES: 'companies',
  INVITATIONS: 'invitations',
  FORMS: 'forms',
  FORM_TEMPLATES: 'form-templates',
  WORKFLOWS: 'workflows',
  DEPARTMENTS: 'departments',
  POSITIONS: 'positions',
  BACKGROUND_SERVICES: 'background-services',
  THIRD_PARTY: 'third-party',
  API_KEYS: 'api-keys',
  IMPORT: 'import'
});

export const commonErrorResponse = {
  messages: ['Authorization Token not found'],
  codes: ['AUTHORIZATION_TOKEN_NOT_FOUND']
};

export const MESSAGES = Object.freeze({
  IMPORT_KEY_NAME: 'Access from Skeeled',
  EXPORT_KEY_NAME: 'Access for external',
  IMPORT_KEY_DESCRIPTION: 'Receive candidate data of company from Skeeled.',
  EXPORT_KEY_DESCRIPTION: 'Send onboardee profile data to external system.'
});
