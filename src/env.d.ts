/// <reference types="astro/client" />

declare global {
  namespace App {
    interface Locals {
      runtime: {
        env: {
          GITHUB_TOKEN?: string;
        };
      };
    }
  }
}

export {};
