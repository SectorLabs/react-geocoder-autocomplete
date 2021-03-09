import React, { useEffect, useRef, MutableRefObject } from "react";
import {
  GeocoderAutocomplete,
  LocationType,
  SupportedLanguage,
  GeoPosition,
  CountyCode,
  ByCountryCodeOptions,
  ByCircleOptions,
  ByRectOptions,
  ByProximityOptions,
} from "@sector-labs/geocoder-autocomplete";

export const GeoapifyApiKey = React.createContext<string>("");

export const GeoapifyContext = (props: any) => {
  return (
    <GeoapifyApiKey.Provider value={props.apiKey}>
      {props.children}
    </GeoapifyApiKey.Provider>
  );
};

export interface GeoapifyGeocoderAutocompleteOptions {
  value?: string;
  type?: LocationType;
  lang?: SupportedLanguage;
  limit?: number;
  placeholder?: string;
  filterByCountryCode?: ByCountryCodeOptions;
  filterByCircle?: ByCircleOptions;
  filterByRect?: ByRectOptions;
  biasByCountryCode?: ByCountryCodeOptions;
  biasByCircle?: ByCircleOptions;
  biasByRect?: ByRectOptions;
  biasByProximity?: ByProximityOptions;
  position?: GeoPosition;
  countryCodes?: CountyCode[];

  skipIcons?: boolean;
  skipDetails?: boolean;

  placeSelect: (value: any) => {};
  suggestionsChange: (value: any) => {};
  onFocus: (value: any) => {};
  onBlur: (value: any) => {};
}

export const GeoapifyGeocoderAutocomplete = ({
  placeholder: placeholderValue,
  type: typeValue,
  lang: langValue,
  limit: limitValue,
  value: valueValue,
  filterByCountryCode: filterByCountryCodeValue,
  filterByCircle: filterByCircleValue,
  filterByRect: filterByRectValue,
  biasByCountryCode: biasByCountryCodeValue,
  biasByCircle: biasByCircleValue,
  biasByRect: biasByRectValue,
  biasByProximity: biasByProximityValue,
  position: positionValue,
  countryCodes: countryCodesValue,
  skipIcons: skipIconsValue,
  skipDetails: skipDetailsValue,

  placeSelect: placeSelectCallback,
  suggestionsChange: suggestionsChangeCallback,
  onFocus: onFocusCallback,
  onBlur: onBlurCallback
}: GeoapifyGeocoderAutocompleteOptions) => {
  const apiKey = React.useContext<string>(GeoapifyApiKey);
  let geocoderContainer: HTMLDivElement | null;
  let initialized: boolean = false;
  let geocoderAutocomplete: MutableRefObject<
    GeocoderAutocomplete | undefined
  > = useRef<GeocoderAutocomplete>();
  const placeSelectCallbackRef: MutableRefObject<
    ((value: any) => {}) | undefined
  > = useRef<(value: any) => {}>();
  const suggestionsChangeCallbackRef: MutableRefObject<
    ((value: any) => {}) | undefined
  > = useRef<(value: any) => {}>();
  const onFocusCallbackRef: MutableRefObject<
    ((value: any) => {}) | undefined
  > = useRef<(value: any) => {}>();
  const onBlurCallbackRef: MutableRefObject<
    ((value: any) => {}) | undefined
  > = useRef<(value: any) => {}>();

  placeSelectCallbackRef.current = placeSelectCallback;
  suggestionsChangeCallbackRef.current = suggestionsChangeCallback;
  onFocusCallbackRef.current = onFocusCallback;
  onBlurCallbackRef.current = onBlurCallback;

  const onSelect = React.useCallback((value: any) => {
    if (placeSelectCallbackRef.current) {
      placeSelectCallbackRef.current(value);
    }
  }, []);

  const onSuggestions = React.useCallback((value: any) => {
    if (suggestionsChangeCallbackRef.current) {
      suggestionsChangeCallbackRef.current(value);
    }
  }, []);

  const onFocus = React.useCallback((value: any) => {
    if (onFocusCallbackRef.current) {
      onFocusCallbackRef.current(value);
    }
  }, []);

  const onBlur = React.useCallback((value: any) => {
    if (onBlurCallbackRef.current) {
      onBlurCallbackRef.current(value);
    }
  }, []);


  useEffect(() => {
    if (initialized) {
      if (geocoderAutocomplete.current) {
        geocoderAutocomplete.current.off('select', onSelect);
        geocoderAutocomplete.current.off('suggestions', onSuggestions);
        geocoderAutocomplete.current.off('focus', onFocus);
        geocoderAutocomplete.current.off('blur', onBlur);
      }

      return;
    }

    initialized = true;

    geocoderAutocomplete.current = new GeocoderAutocomplete(
      geocoderContainer as HTMLDivElement,
      apiKey,
      {
        placeholder: placeholderValue || '',
        skipDetails: skipDetailsValue,
        skipIcons: skipIconsValue
      }
    );

    geocoderAutocomplete.current.on('select', onSelect);
    geocoderAutocomplete.current.on('suggestions', onSuggestions);
    geocoderAutocomplete.current.on('focus', onFocus);
    geocoderAutocomplete.current.on('blur', onBlur);
  }, []);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setType(typeValue as LocationType);
    }
  }, [typeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLang(langValue as SupportedLanguage);
    }
  }, [langValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      console.warn(
        "WARNING! Obsolete function called. The  'position' input has been deprecated, please use the new 'biasByLocation' input instead!"
      );
      geocoderAutocomplete.current.addBiasByProximity(
        positionValue as GeoPosition
      );
    }
  }, [positionValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      console.warn(
        "WARNING! Obsolete function called. The  'countryCodes' input has been deprecated, please use the new 'filterByCountryCode' input instead!"
      );
      geocoderAutocomplete.current.addFilterByCountry(
        countryCodesValue as CountyCode[]
      );
    }
  }, [countryCodesValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setLimit(limitValue as number);
    }
  }, [limitValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.setValue((valueValue as string) || '');
    }
  }, [valueValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByCountry(
        filterByCountryCodeValue as ByCountryCodeOptions
      );
    }
  }, [filterByCountryCodeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByCircle(
        filterByCircleValue as ByCircleOptions
      );
    }
  }, [filterByCircleValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addFilterByRect(
        filterByRectValue as ByRectOptions
      );
    }
  }, [filterByRectValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByCountry(
        biasByCountryCodeValue as ByCountryCodeOptions
      );
    }
  }, [biasByCountryCodeValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByCircle(
        biasByCircleValue as ByCircleOptions
      );
    }
  }, [biasByCircleValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByRect(
        biasByRectValue as ByRectOptions
      );
    }
  }, [biasByRectValue]);

  useEffect(() => {
    if (geocoderAutocomplete.current) {
      geocoderAutocomplete.current.addBiasByProximity(
        biasByProximityValue as ByProximityOptions
      );
    }
  }, [biasByProximityValue]);

  return (
    <div
      className='geocoder-container'
      style={{ position: 'relative' }}
      ref={(el) => (geocoderContainer = el)}
    ></div>
  );
};
