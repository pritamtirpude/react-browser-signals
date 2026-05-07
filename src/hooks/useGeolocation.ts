import { useEffect, useState } from "react";

import type { GeolocationData } from "../types";
import { isBrowser } from "../utils/isBrowser";

const EMPTY_GEOLOCATION_STATE: GeolocationData = {
  supported: false,
  loading: false,
  error: null,
  latitude: null,
  longitude: null,
  accuracy: null,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
  timestamp: null,
};

export const useGeolocation = (options?: PositionOptions): GeolocationData => {
  const [state, setState] = useState<GeolocationData>({
    ...EMPTY_GEOLOCATION_STATE,
    loading: isBrowser,
  });

  useEffect(() => {
    if (!isBrowser) {
      setState(EMPTY_GEOLOCATION_STATE);
      return;
    }

    if (!navigator.geolocation) {
      setState(EMPTY_GEOLOCATION_STATE);
      return;
    }

    let isMounted = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isMounted) {
          return;
        }

        setState({
          supported: true,
          loading: false,
          error: null,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        if (!isMounted) {
          return;
        }

        setState({
          ...EMPTY_GEOLOCATION_STATE,
          supported: true,
          loading: false,
          error: error.message,
        });
      },
      options,
    );

    return () => {
      isMounted = false;
    };
  }, [options]);

  return state;
};
