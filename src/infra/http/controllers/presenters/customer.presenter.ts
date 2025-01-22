import { Customer } from 'src/domain/enterprise/entities/customer';

export type CustomerHttpResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export class CustomerPresenter {
  static toHTTP(customer: Customer, token: string): CustomerHttpResponse {
    return {
      token: token,
      user: {
        id: customer.id.toValue(),
        name: customer.name,
        email: customer.email,
      },
    };
  }
}
