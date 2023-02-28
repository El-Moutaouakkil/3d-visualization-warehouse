const getFakeProduct = () => {
    const fakerCommerce = faker.commerce;
    const product = {
        name: fakerCommerce.productName(),
        price: fakerCommerce.price(),
        description:
            fakerCommerce.productAdjective() +
            " " +
            fakerCommerce.productMaterial() +
            " " +
            fakerCommerce.product(),
        weight: faker.random.number({ min: 1, max: 50 }),
        category: fakerCommerce.department(),
    };
    return product;
};
