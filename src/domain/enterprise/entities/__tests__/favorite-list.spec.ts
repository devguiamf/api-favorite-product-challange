import { UniqueEntityID } from "src/core/entity/unique-entity-id";
import { FavoriteList } from "../favorite-list";
import { Product } from "../product";

describe('Favorite List', () => {

    it('should create a valid favorite list', () => {
        const favoriteList = FavoriteList.create({
            title: 'Favorite List',
            userId: '1',
            products: [],
        });

        expect(favoriteList.title).toBe('Favorite List');
        expect(favoriteList.userId).toBe('1');
        expect(favoriteList.products).toEqual([]);
        expect(favoriteList.id).toBeDefined();
    });

    it('should restore a favorite list', () => {
        const favoriteList = FavoriteList.restore(
            {
                title: 'Favorite List',
                userId: '1',
                products: [],
            },
            new UniqueEntityID(),
        );

        expect(favoriteList.title).toBe('Favorite List');
        expect(favoriteList.userId).toBe('1');
        expect(favoriteList.products).toEqual([]);
        expect(favoriteList.id).toBeDefined();
    });

    it('should favorite a product', () => {
        const favoriteList = FavoriteList.create({
            title: 'Favorite List',
            userId: '1',
            products: [],
        });

        const product = Product.create({
            title: 'Product',
            price: 10,
            image: 'image',
            description: 'description',
            category: 'category',
            productApiId: 1,
        });

        favoriteList.favoriteProduct(product, favoriteList);

        expect(favoriteList.products).toEqual([product]);
        expect(favoriteList.products.length).toBe(1);
    });

    it('should unfavorite a product', () => {
        const favoriteList = FavoriteList.create({
            title: 'Favorite List',
            userId: '1',
            products: [],
        });

        const product = Product.create({
            title: 'Product',
            price: 10,
            image: 'image',
            description: 'description',
            category: 'category',
            productApiId: 1,
        });

        favoriteList.favoriteProduct(product, favoriteList);
        expect(favoriteList.products).toEqual([product]);
        expect(favoriteList.products.length).toBe(1);

        favoriteList.unfavoriteProduct(1, favoriteList.products);

        expect(favoriteList.products).toEqual([]);
        expect(favoriteList.products.length).toBe(0);
    });



})