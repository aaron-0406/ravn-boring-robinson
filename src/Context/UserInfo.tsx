import { createContext, useContext, useReducer } from "react";
import { ICar, IUserContext } from "../interfaces/User";

const initialState = {
  name: "Gerardo",
  lastName: "Estrada",
  isLoggedIn: false,
  cars: [
    {
      brand: "Toyota",
      color: "Blue",
    },
    {
      brand: "Nissan",
      color: "Red",
    },
  ],
};

export const UserContext = createContext<IUserContext>(initialState); 

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("You can't use the themecontext outside of the provider");
  }
  return context;
};

enum ActionKind {
  Add = "ADD_TO_CAR",
  Update = "UPDATE_THE_CAR",
  Remove = "REMOVE_TO_CART",
}

type ActionCar = {
  type: ActionKind;
  payload: { newData?: ICar; oldData?: ICar };
};

const reducer = (state: IUserContext, action: ActionCar) => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.Add:
      if (payload.newData) {
        state.cars.push(payload.newData);
      }
      return state;
    case ActionKind.Update:
      if (payload.newData && payload.oldData) {
        let count = 0;
        let index = 0;
        state.cars.forEach((car) => {
          if (car.brand === payload.oldData?.brand) {
            index = count;
          }
          count++;
        });
        state.cars[index] = payload.newData;
      }
      return state;
    case ActionKind.Remove:
      if (payload.oldData) {
        state.cars = state.cars.filter((car) => {
          return car.brand !== payload.oldData?.brand;
        });
      }
      return state;
    default:
      return state;
  }
};

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [userInfo, dispatch] = useReducer(reducer, initialState);

  // Agregar un carro mas al array
  const addCar = () => {
    dispatch({
      type: ActionKind.Add,
      payload: { newData: { brand: "Tesla", color: "Red" } },
    });
    console.log("ADD CAR", userInfo.cars);
  };

  // Actualizar un carro existente
  const updateCar = () => {
    dispatch({
      type: ActionKind.Update,
      payload: {
        newData: { brand: "Skoda", color: "White" },
        oldData: { brand: "Toyota", color: "Blue" },
      },
    });
    console.log("UPDATE CAR", userInfo.cars);
  };

  // Eliminar un carro del array de carros
  const removeCar = () => {
    dispatch({
      type: ActionKind.Remove,
      payload: { oldData: { brand: "Nissan", color: "Red" } },
    });
    console.log("REMOVE CAR", userInfo.cars);
  };

  return (
    <UserContext.Provider value={{ ...userInfo, addCar, updateCar, removeCar }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
