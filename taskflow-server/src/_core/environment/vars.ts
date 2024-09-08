import { ZodError } from 'zod';
import 'dotenv/config';
import { TEnvVars, envVarsSchema } from './vars.schema';

class EnvVars {
  private envs: TEnvVars;

  constructor() {
    try {
      this.envs = envVarsSchema.parse(process.env);
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((erro) => ({
          mensagem: erro.message,
          variavel: erro.path,
        }));

        console.error(issues);
        process.exit(1);
      }

      throw error;
    }
  }

  get(variableName: keyof TEnvVars) {
    const env = this.envs[variableName];
    if (!env) {
      throw new Error(
        `A variável ${variableName} é necessária para o que você está tentando realizar`,
      );
    }

    return env;
  }
}

export const envs = new EnvVars();
