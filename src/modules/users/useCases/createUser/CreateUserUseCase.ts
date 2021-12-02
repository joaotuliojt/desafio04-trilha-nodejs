import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  private userRepository: IUsersRepository;
  constructor(usersRepository: IUsersRepository) {
    this.userRepository = usersRepository;
  }

  execute({ email, name }: IRequest): User {
    const userAlreadyExists = this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Email already registered!");
    }

    const user = this.userRepository.create({ name, email });
    return user;
  }
}

export { CreateUserUseCase };
