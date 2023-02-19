export type userType = {
    id: number,
    login: string,
    password: string,
    name: string,
    surname: string,
};

export type bodyUserType = {
    
    login: string,
    password: string,
    name: string,
    surname: string,
    projects?: Array<string>
      /*name: string,
      username: string,
      email: string,
      address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
      lat: string,
      lng: string
      }}*/
};
