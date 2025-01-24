import { Entity } from "src/core/entity/entity";
import { UniqueEntityID } from "src/core/entity/unique-entity-id";

export type ProductProps = {
  productApiId: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export class Product extends Entity<ProductProps> {
  public static create(
    props: ProductProps
  ): Product {
    return new Product(props);
  }

  public static restore(
    props: ProductProps,
    id: UniqueEntityID,
  ): Product {
    return new Product(props, id);
  }

  get title(): string {
    return this.props.title;
  }

  get price(): number {
    return this.props.price;
  }

  get image(): string {
    return this.props.image;
  }

  get description(): string {
    return this.props.description;
  }

  get category(): string {
    return this.props.category;
  }

  get productApiId(): number {
    return this.props.productApiId;
  }
}
