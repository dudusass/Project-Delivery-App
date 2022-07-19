const body = {
  sellerId: 1,
  totalPrice: 100,
  deliveryAddress: 'Teste',
  deliveryNumber: 30,
  saleProducts: [{productId: 1, quantity: 1}, { productId: 2, quantity: 1}],
}

const decoded = {
  id: 1
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOjAsImlhdCI6MTY1NzkxMDM5MSwiZXhwIjoxNjU3OTI4MzkxfQ.AR5BxcXrvucc3diwMR8SUBUOAwuyPWbGhZeOS8it1Uk"


const bodyWithOutTotalPrice = {
  sellerId: 1,
  totalPrice: '',
  deliveryAddress: 'Teste',
  deliveryNumber: 30,
  saleProducts: [{productId: 1, quantity: 1}, { productId: 2, quantity: 1}],
}

const bodyWithOutDeliveryAddress = {
  sellerId: 1,
  totalPrice: 100,
  deliveryAddress: '',
  deliveryNumber: 30,
  saleProducts: [{productId: 1, quantity: 1}, { productId: 2, quantity: 1}],
}

const bodyWithOutDeliveryNumber = {
  sellerId: 1,
  totalPrice: 100,
  deliveryAddress: 'Teste',
  deliveryNumber: '',
  saleProducts: [{productId: 1, quantity: 1}, { productId: 2, quantity: 1}],
}

const bodyWithOutSaleProducts = {
  sellerId: 1,
  totalPrice: 100,
  deliveryAddress: 'Teste',
  deliveryNumber: 30,
  saleProducts: '',
}

const bodySaleProducts = {
  sellerId: 1,
  totalPrice: 100,
  deliveryAddress: 'Teste',
  deliveryNumber: 30,
  saleProducts: [],
}

const bodyWithOutProductId = {
  sellerId: 1,
  totalPrice: 100,
  deliveryAddress: 'Teste',
  deliveryNumber: 30,
  saleProducts: [{productId: '', quantity: 1}, { productId: 2, quantity: 1}],
}


const bodyWithOutQuantityId = {
  sellerId: 1,
  totalPrice: 100,
  deliveryAddress: 'Teste',
  deliveryNumber: 30,
  saleProducts: [{productId: 1, quantity: 1}, { productId: 2, quantity: ''}],
}

const bodyWithOutSellerId = {
  sellerId: '',
  totalPrice: 100,
  deliveryAddress: 'Teste',
  deliveryNumber: 30,
  saleProducts: [{productId: 1, quantity: 1}, { productId: 2, quantity: 1}],
}

module.exports = {
  body,
  decoded,
  token,
  bodyWithOutTotalPrice,
  bodyWithOutDeliveryAddress,
  bodyWithOutDeliveryNumber,
  bodyWithOutSaleProducts,
  bodySaleProducts,
  bodyWithOutProductId,
  bodyWithOutQuantityId,
  bodyWithOutSellerId,
};