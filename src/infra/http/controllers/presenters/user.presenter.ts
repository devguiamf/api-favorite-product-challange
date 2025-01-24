import { User } from 'src/domain/enterprise/entities/user';

export type UserHttpResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export class UserPresenter {
  static toHTTP(user: User, token: string): UserHttpResponse {
    return {
      token: token,
      user: {
        id: user.id.toValue(),
        name: user.name,
        email: user.email,
      },
    };
  }
}
