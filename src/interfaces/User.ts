export interface ICar {
  brand: string;
  color: string;
}

export interface IUserContext {
  name: string;
  lastName: string;
  isLoggedIn: boolean;
  cars: ICar[];
  addCar?: () => void;
  updateCar?: () => void;
  removeCar?: () => void;
}
