import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import { MONGO_DB_CONNECTION } from '../mongodb-connection';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { CustomerRepository } from 'src/domain/application/repositories/customer-repository.interface';
import { Customer } from 'src/domain/enterprise/entities/customer';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';

export type CustomerDocument = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class MongoDbCustomerRepository implements CustomerRepository {
  
  #customerCollection: Collection<CustomerDocument>;
  
  constructor(
    @Inject(MONGO_DB_CONNECTION)
    private readonly connection: MongoClient,
  ) {
    this.#customerCollection = this.connection
      .db()
      .collection('customer');
  }

  async save(customer: Customer): Promise<void> {
    try {
      await this.#customerCollection.insertOne({
        _id: customer.id.toString(),
        name: customer.name,
        email: customer.email,
        password: customer.password,
      });
    } catch (error) {
      throw error;
    }
  }

  async existsByEmail(email: Email): Promise<boolean> {
    try {
      
      const customer = await this.#customerCollection.findOne({
        email: email.value,
      });

      if(customer){
        return true;
      }

      return false;

    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: Email): Promise<Customer> {
    try {

      const customer = await this.#customerCollection.findOne({
        email: email.value,
      });

      if(!customer){
        return null as unknown as Customer;
      }

      return Customer.restore({
        email: Email.create(customer.email),
        name: customer.name,
      }, new UniqueEntityID(customer._id));

    } catch (error) {
      throw error;
    }
  }
 
}
