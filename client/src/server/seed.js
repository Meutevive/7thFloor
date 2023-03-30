const {faker} = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;

const _ = require("lodash");
async function main() {
    const uri = "mongodb+srv://kayeromy:PVmU1M1K8RBYBXoz@cinematheque.fcftxs4.mongodb.net/test";
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const articleCollection = client.db("Cinematheque").collection("article");

        articleCollection.drop();
        let cover = [
            'https://ik.imagekit.io/vjh9patwm/pizza/uiGArWE8nUjAoA1fA1um98ykL2I.jpg?updatedAt=1680191481494',
            'https://ik.imagekit.io/vjh9patwm/pizza/hSfuKPtyEryeFzapZ8UgZd4aESu.jpg?updatedAt=1680191582183',
            'https://ik.imagekit.io/vjh9patwm/pizza/kO35BwoKHyP1VRulxZJVeEl5dvS.jpg?updatedAt=1680191722092',
            'https://ik.imagekit.io/vjh9patwm/pizza/hYeB9GpFaT7ysabBoGG5rbo9mF4.jpg?updatedAt=1680191721946',
            'https://ik.imagekit.io/vjh9patwm/pizza/yZsrBgOgz59cCGCltv02DVzmOtA.jpg?updatedAt=1680191721954'
        ]

        let titles = ['avengers', 'narnia au monde englouti','john wick','fast and furious','creed']

        let article = [];
        for (let i = 0; i < 10; i+=1){
            let newArticle = {
                title: _.sample(titles),
                description: faker.lorem.sentence(),
                content: faker.lorem.sentence(),
                cover: _.sample(cover),
                created_at: faker.date.recent(),
            };
            article.push(newArticle);
        }
        await articleCollection.insertMany(article);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();