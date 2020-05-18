const Item = require('../models/item.model')


exports.CreateItem = (req, res) => {
    let fetchedItems;
    // console.log(`Create Item controller`)
    const item = new Item({
        name: req.body.name,
        type: req.body.type,
        provider: req.body.provider,
        availableDate: req.body.availableDate,
        qty: req.body.qty,
        location: req.body.location,
        creator: req.userData.userId
    });

    item.save()
        .then((documents) => {
            // console.log(`document  : ${documents}`)
            fetchedItems = documents;
            return Item.countDocuments({ creator: req.userData.userId });
        })
        .then((count) => {
            // console.log(`Count  : ${count}`);
            res.status(201).json({
                message: 'Item created',
                result: {
                    ...fetchedItems,
                    id: fetchedItems._id,
                    data: item,
                    maxItems: count
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Create Item failed, Authentication Error',
                error: err
            });
        });
}

exports.GetItems = (req, res) => {
    const pageSize = +req.query.pagesize
    const currentPage = +req.query.page;
    let fetchedItems;
    // const ItemQuery = Item.find({ creator: req.userData.userId });
    const ItemQuery = Item.find({ creator: req.userData.userId });

    if (pageSize && currentPage) {
        ItemQuery
            .skip(pageSize * (currentPage - 1))  // Skips the first n posts
            .limit(pageSize)
    }
    ItemQuery
        .then((documents) => {
            fetchedItems = documents;
            return Item.countDocuments({ creator: req.userData.userId });
        })
        .then((count) => {
            res.status(200).json({
                message: 'Items fetched successfully',
                data: fetchedItems,
                maxItems: count
            })
        })
        .catch(error => {
            console.log(` Error  ${error}`)
            res.status(500).json({
                message: 'Fetching Item failed!',
                error: error
            })
        });
}

exports.DeleteItems = (req, res) => {
    console.log('Delete Item function')
    Item.deleteMany({})
        .then((result => {
            res.status(200).json({
                message: 'Deleted all items successfully'
            })
        }))
        .catch(error => {
            res.status(500).json({
                message: 'Deleting Item failed!',
                error: error
            })
        });
}

exports.GetItem = (req, res) => {
    let fetchedItem;
    console.log('Get Item')
    const ItemQuery = Item.findById(req.params.id);
    ItemQuery
        .then(document => {
            fetchedItem = document;
            console.log(fetchedItem)
            res.status(200).json({
                data: {
                    ...fetchedItem._doc,
                    vendor: 'Sumeet'
                }
            })
        })
}