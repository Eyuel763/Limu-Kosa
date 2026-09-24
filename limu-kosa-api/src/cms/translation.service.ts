import { Injectable, Logger } from "@nestjs/common";

export interface TranslatableMap {
  [key: string]: string | undefined | null;
}

export interface TranslationsPayload {
  am?: Record<string, string>;
  om?: Record<string, string>;
}

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);

  /**
   * Translate a single text string into target language (am or om).
   * Uses free translation API endpoint with fallback.
   */
  async translateText(text: string, targetLang: "am" | "om"): Promise<string> {
    if (!text || !text.trim()) return text;
    // Don't translate very short codes or URLs
    if (/^(http|https|ftp):\/\/[^\s]+$/.test(text) || text.length <= 1) return text;

    try {
      // Map 'om' to 'or' (Oromo ISO code in MyMemory/Google)
      const langPair = targetLang === "am" ? "en|am" : "en|or";
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 500))}&langpair=${langPair}`;

      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        const translated = data?.responseData?.translatedText;
        if (translated && typeof translated === "string" && !translated.startsWith("MYMEMORY WARNING")) {
          return translated;
        }
      }
    } catch (err) {
      this.logger.warn(`Translation failed for target ${targetLang}: ${err instanceof Error ? err.message : String(err)}`);
    }

    return text;
  }

  /**
   * Translates a dictionary of fields (e.g. { title, excerpt, body }) into 'am' and 'om'
   */
  async translateFields(fields: TranslatableMap): Promise<TranslationsPayload> {
    const amResult: Record<string, string> = {};
    const omResult: Record<string, string> = {};

    const entries = Object.entries(fields).filter(([_, val]) => typeof val === "string" && val.trim().length > 0);

    for (const [key, val] of entries) {
      if (!val) continue;
      // Truncate long body for fast API translation if needed
      const textToTranslate = val.length > 500 ? val.slice(0, 500) : val;

      const [amText, omText] = await Promise.all([
        this.translateText(textToTranslate, "am"),
        this.translateText(textToTranslate, "om"),
      ]);

      if (amText) amResult[key] = amText;
      if (omText) omResult[key] = omText;
    }

    return {
      am: amResult,
      om: omResult,
    };
  }
}
