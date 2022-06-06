import {createConnection, getManager} from "typeorm";
import {Product} from "../entity/product.entity";
import { faker } from '@faker-js/faker';
import {randomInt} from "crypto";

createConnection().then(async () =>{

    const repository = getManager().getRepository(Product);

    for(let i=0; i<30; i++) {
        // @ts-ignore
        await repository.save({
            "title": faker.name.findName(),
            "description": faker.lorem.words(2),
            "image": faker.image.imageUrl(200, 200, '', true),
            "price": randomInt(10, 100)
        })
    }

    process.exit(8)
})