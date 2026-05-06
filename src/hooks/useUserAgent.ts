import { useEffect, useState } from "react";
import { UserAgentClientHints } from "../types";
import { isBrowser } from "../utils/isBrowser";

type NavigatorWithUAData = Navigator & {
  userAgentData?: {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
  };
};

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<UserAgentClientHints | null>(null);

  useEffect(() => {
    if (!isBrowser) {
      setUserAgent(null);
      return;
    }

    const uaData = (navigator as NavigatorWithUAData).userAgentData;
    if (uaData) {
      setUserAgent({
        brands: uaData.brands,
        mobile: uaData.mobile,
        platform: uaData.platform,
      });
    }
  }, []);

  return userAgent;
};
