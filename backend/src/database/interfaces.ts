export interface MigrationInterface {
  title: string;
  timestamp: number;
  description?: string;
}

export interface MigrationModelInterface {
  lastRun: string;
  migrations: MigrationInterface[];
}
