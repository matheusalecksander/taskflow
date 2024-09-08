import { z } from 'zod';
import 'dotenv/config';

export const envVarsSchema = z.object({
  JWT_SECRET: z.string({
    message: 'Informe JWT_SECRET',
  }),
  JWT_PRIVATE_SECRET: z.string({
    message: 'Informe JWT_PRIVATE_SECRET',
  }),
});

export type TEnvVars = z.infer<typeof envVarsSchema>;
