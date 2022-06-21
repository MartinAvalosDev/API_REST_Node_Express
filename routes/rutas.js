const express = require('express');
const {
    Router
} = express;
const router = Router();

let products = [{
        "title": "Cafetera Nespresso",
        "id": 2,
        "price": 20000,
        "thumbnail": "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_93111735/fee_786_587_png"
    },
    {
        "title": "Pelota adidas",
        "id": 3,
        "price": 5000,
        "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_874847-MLA49566978164_042022-O.webp"
    }
]


router.get('/', (req, res) => {
    res.json(products);
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);
    if (product === undefined) {
        throw new Error("Product not found");
    }
    res.json(product);
})

router.post('/', (req, res) => {
    let data = req.body;
    let ids = products.map(product => product.id)
    let maxId = Math.max(...ids)
    let newProduct = {
        "title": data.title,
        "id": maxId + 1,
        "price": data.price || null,
        "thumbnail": data.thumbnail || false
    }
    products.push(newProduct);

    // res.send(newProduct);
    res.redirect('/index.html');
})


router.put('/:id', (req, res) => {
    let id = Number(req.params.id);
    let data = req.body;
    let newProducts = products.map(p =>
        p.id === id ?
        {
            ...p,
            title: data.title,
            price: data.price ?? null,
            thumbnail: data.thumbnail || null
        } :
        p
    );
    products = newProducts
    // elementIndex = products.findIndex((obj => obj.id == id));
    // products[elementIndex].title = data.title;
    // // products[elementIndex].id = id;
    // products[elementIndex].price = data.price || null;
    // products[elementIndex].thumbnail = data.thumbnail || null;
    res.send(products)
});

router.delete('/:id', (req, res) => {
    let id = Number(req.params.id);
    products = products.filter((obj) => obj.id != id)
    res.send(products)
})

module.exports = router;