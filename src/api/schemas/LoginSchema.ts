import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

// Define the expected structure of a login response
export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken?: string;  // DummyJSON uses accessToken
  token?: string;        // Allow both for compatibility
  refreshToken: string;
}

// JSON Schema for login response validation
export const loginResponseSchema: JSONSchemaType<LoginResponse> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    gender: { type: 'string' },
    image: { type: 'string', format: 'uri' },
    accessToken: { type: 'string', nullable: true },
    token: { type: 'string', nullable: true },
    refreshToken: { type: 'string' },
  },
  required: [
    'id',
    'username',
    'email',
    'firstName',
    'lastName',
    'gender',
    'image',
    'refreshToken',
  ],
  additionalProperties: true,
  // At least one of token or accessToken must be present
  anyOf: [
    { required: ['accessToken'] },
    { required: ['token'] },
  ] as any,
};

// Validate login response
export function validateLoginResponse(data: any): {
  valid: boolean;
  errors?: any;
} {
  const validate = ajv.compile(loginResponseSchema);
  const valid = validate(data);
  return {
    valid,
    errors: validate.errors,
  };
}
