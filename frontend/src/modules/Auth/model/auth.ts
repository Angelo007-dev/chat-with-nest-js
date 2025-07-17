export interface IRegister {
    email: string;
    firstname: string;
    password: string;
}

export interface ISignIn {
    email: string;
    password: string;
}

/*interface IUser {
    id: string;
    email: string;
    firstname: string;
  }
  const [user, setUser] = useState<IUser | null>(null);*/