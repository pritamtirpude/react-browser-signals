import { useEffect, useState } from "react";

import { LanguageData } from "../types";
import { isBrowser } from "../utils/isBrowser";

const EMPTY_LANGUAGE_STATE: LanguageData = {
  supported: false,
  language: null,
  languages: [],
};

export const useLanguage = (): LanguageData => {
  const [languageData, setLanguageData] =
    useState<LanguageData>(EMPTY_LANGUAGE_STATE);

  useEffect(() => {
    if (!isBrowser) {
      setLanguageData(EMPTY_LANGUAGE_STATE);
      return;
    }

    const updateLanguageData = () => {
      const hasLanguage = typeof navigator.language === "string";
      const hasLanguages = Array.isArray(navigator.languages);

      setLanguageData({
        supported: hasLanguage || hasLanguages,
        language: hasLanguage ? navigator.language : null,
        languages: hasLanguages ? [...navigator.languages] : [],
      });
    };

    updateLanguageData();

    const controller = new AbortController();
    window.addEventListener("languagechange", updateLanguageData, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, []);

  return languageData;
};
