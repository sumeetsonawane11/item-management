const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/auth-interceptor');
const ItemController = require('../controllers/item.controller');

router.post('/create',
    checkAuth,
    ItemController.CreateItem
);
router.get('/getItems',
    checkAuth,
    ItemController.GetItems
);

router.delete(
    '/deleteItems',
    checkAuth,
    ItemController.DeleteItems
);

router.get(
    '/:id',
    checkAuth,
    ItemController.GetItem
);

module.exports = router;