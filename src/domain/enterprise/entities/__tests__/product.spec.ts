import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Product } from '../product';

describe('Product', () => {
  it('should create a valid product', () => {
    const product = Product.create({
      title: 'Product',
      price: 10,
      image: 'image',
      description: 'description',
      category: 'category',
      productApiId: 1,
    });

    expect(product.title).toBe('Product');
    expect(product.price).toBe(10);
    expect(product.image).toBe('image');
    expect(product.description).toBe('description');
    expect(product.category).toBe('category');
    expect(product.productApiId).toBe(1);
  });

  it('should restore a product', () => {
    const product = Product.restore(
      {
        title: 'Product',
        price: 10,
        image: 'image',
        description: 'description',
        category: 'category',
        productApiId: 1,
      },
      new UniqueEntityID(),
    );

    expect(product.title).toBe('Product');
    expect(product.price).toBe(10);
    expect(product.image).toBe('image');
    expect(product.description).toBe('description');
    expect(product.category).toBe('category');
    expect(product.productApiId).toBe(1);
    expect(product.id).toBeDefined();
  });
});
