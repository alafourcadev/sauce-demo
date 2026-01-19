import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

// Define the expected structure of a user
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}

// Simplified schema for validation
export const userSchema: JSONSchemaType<Partial<User>> = {
  type: 'object',
  properties: {
    id: { type: 'number', nullable: true },
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    email: { type: 'string', format: 'email', nullable: true },
    username: { type: 'string', nullable: true },
    gender: { type: 'string', nullable: true },
    image: { type: 'string', nullable: true },
    role: { type: 'string', nullable: true },
  },
  required: [],
  additionalProperties: true,
};

// Validate user
export function validateUser(data: any): { valid: boolean; errors?: any } {
  const validate = ajv.compile(userSchema);
  const valid = validate(data);
  return {
    valid,
    errors: validate.errors,
  };
}
