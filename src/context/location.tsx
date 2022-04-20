import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import * as Location from 'expo-location';

//[{"city": "São José dos Campos", "country": "Brasil", "district": null, "isoCountryCode": "BR", "name": "12228", "postalCode": "12228", "region": "SP", "street": null, "streetNumber": null, "subregion": null, "timezone": "America/Sao_Paulo"}]
interface ILocationData {
  latitude: number;
  longitude: number;
  city: string;
}

interface ILocationContextData {
  animatingLoader: boolean;
  animationFinished(): void;
  permissionStatus: any;
  location: ILocationData | null;
}
// Usando null para permitir a omissão de valor defaultValue no Typescript.
const LocationContext = createContext<ILocationContextData | null>(null);

const LocationProvider: React.FC<any> = ({children}) => {
  const [animatingLoader, setAnimatingLoader] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [location, setLocation] = useState(null);

  const animationFinished = useCallback(() => {
    setAnimatingLoader(false);
  }, []);

  const getLocation = async () => {
    try {
      const permission = await Location.getForegroundPermissionsAsync();

      if (permission?.status === Location.PermissionStatus.GRANTED) {
        const currentPosition = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });

        if (!currentPosition) {
          return;
        }
        const {coords} = currentPosition;

        const reverseGeo = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        const city = reverseGeo[0]?.city || reverseGeo[0]?.subregion;

        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
          city: city || '',
        });
      }
      setPermissionStatus(permission);
    } catch (error) {}
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        animatingLoader,
        animationFinished,
        permissionStatus,
        location,
        setPermissionStatus,
        setLocation,
        getLocation,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocationContext = () => {
  return useContext(LocationContext);
};

export {LocationContext, LocationProvider, useLocationContext};
