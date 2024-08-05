import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Cart is empty'
      });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          status: 'fail',
          message: `Product with ID ${item.productId} not found`
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          status: 'fail',
          message: `Insufficient stock for product: ${product.name}`
        });
      }

      totalAmount += product.price * item.quantity;
      orderProducts.push({
        product: item.productId,
        quantity: item.quantity
      });

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      user: userId,
      products: orderProducts,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    // Fetch the full order with populated product details
    const populatedOrder = await Order.findById(savedOrder._id).populate({
      path: 'products.product',
      select: 'name price imageUrl'
    });

    // Create a response object with the desired format
    const orderResponse = {
      _id: populatedOrder._id,
      user: populatedOrder.user,
      products: populatedOrder.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        name: item.product.name,
        price: item.product.price,
        imageUrl: item.product.imageUrl
      })),
      totalAmount: populatedOrder.totalAmount,
      status: populatedOrder.status,
      createdAt: populatedOrder.createdAt
    };

    res.status(201).json({
      status: 'success',
      data: {
        order: orderResponse
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};