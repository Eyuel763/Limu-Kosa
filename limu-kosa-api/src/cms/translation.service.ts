import { Injectable } from "@nestjs/common";

export interface TranslatableMap {
  [key: string]: string | undefined | null;
}

export interface TranslationsPayload {
  am?: Record<string, string>;
  om?: Record<string, string>;
}

@Injectable()
export class TranslationService {
  /**
   * No longer calls external APIs.
   * Simply returns admin-provided translations or empty payload.
   */
  async translateFields(fields: TranslatableMap, existingTranslations?: TranslationsPayload): Promise<TranslationsPayload> {
    return existingTranslations ?? { am: {}, om: {} };
  }
}
