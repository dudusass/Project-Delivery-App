const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { before, after } = require('mocha');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { Sale, User, Product, SaleProduct } = require('../database/models');
const { expect } = require('chai');
const { body, decoded, token, bodyWithOutTotalPrice, bodyWithOutDeliveryAddress, bodyWithOutDeliveryNumber, bodyWithOutSaleProducts, bodySaleProducts, bodyWithOutProductId, bodyWithOutQuantityId, bodyWithOutSellerId } = require('./mocks/salesCreateMock');

chai.use(chaiHttp);


describe('POST /api/sales', () => {
  describe('201 CREATED - Sucesso', () => {
    let chaiHttpResponse;

    describe('Criando nova venda', () => {
      before(() => {
        sinon
          .stub(User, 'findOne')
          .resolves(true);
  
        sinon
          .stub(Product, 'findByPk')
          .resolves({ price: 50 });
        
        sinon
          .stub(jwt, 'verify')
          .returns(decoded);
  
        sinon
          .stub(Sale, 'create')
          .resolves({ id: 1});
        
        sinon
          .stub(SaleProduct, 'create')
          .resolves(true);
      });

      after(() => {
        User.findOne.restore();
        Product.findByPk.restore();
        jwt.verify.restore();
        Sale.create.resolves();
        SaleProduct.create.resolves();
      })

      it('Nova venda', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(body);

        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.deep.equal({ saleId: 1 })
      })
    })
  })


  describe('401 UnauthorizedError - Faltando token de autorização.', () => {
    let chaiHttpResponse;

    it('Falha quando não passa o token de autorização.', async () => {
      chaiHttpResponse = await chai.request(app).post('/api/sales').send(body);

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('missing authorization token');
    });
  });

  describe('500  Internal Error - Servidor se comportou de forma inesperada', () => {
    let chaiHttpResponse;

    before(() => {
      sinon.stub(User, 'findOne').throws({ Error: 'unexpected error.' });
      sinon.stub(jwt, 'verify').returns(decoded);
    });

    after(() => {
      User.findOne.restore();
      jwt.verify.restore();
    });

    it('trata algum erro inesperado.', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/api/sales')
        .set('authorization', token)
        .send(body);

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Internal server error' });
      expect(chaiHttpResponse.status).to.be.equal(500);
    });
  });

  describe(' 404 NOTFOUND - Falha', () => {
    let chaiHttpResponse;

    describe('Criando nova venda com produto inexistente', () => {
      before(() => {
        sinon
          .stub(User, 'findOne')
          .resolves(true);
  
        sinon
          .stub(Product, 'findByPk')
          .resolves(null);
        
        sinon
          .stub(jwt, 'verify')
          .returns(decoded);
      });

      after(() => {
        User.findOne.restore();
        Product.findByPk.restore();
        jwt.verify.restore();
      })

      it('Produto não existe', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(body);

        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'There is a product not registered in the database!' });
      })
    })

    describe('Criando nova venda com vendedor inexistente', () => {
      before(() => {
        sinon
          .stub(User, 'findOne')
          .resolves(null);
     
        sinon
          .stub(jwt, 'verify')
          .returns(decoded);
      });

      after(() => {
        User.findOne.restore();
        jwt.verify.restore();
      })

      it('Vendedor não existe', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(body);

        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Seller not found' });
      })
    })
  })

  describe('400 BADREQUEST', () => {

    describe('Total difere da soma dos produtos', () => {
      before(() => {
        sinon
          .stub(User, 'findOne')
          .resolves(true);
     
        sinon
          .stub(jwt, 'verify')
          .returns(decoded);

        sinon
          .stub(Product, 'findByPk')
          .resolves({ price: 45 })
      });

      after(() => {
        User.findOne.restore();
        Product.findByPk.restore();
        jwt.verify.restore();
      })

      it('Vendedor não existe', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(body);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'The totalPrice must equal the total of all products!' });
      })
    })

    describe('Middleware Errors', () => {
      before(() => {
        sinon
          .stub(jwt, 'verify')
          .returns(decoded);
      });

      after(() => {
        jwt.verify.restore();
      })

      it('totalPrice null', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodyWithOutTotalPrice);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

      it('deliveryAddress null', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodyWithOutDeliveryAddress);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

      it('deliveryNumber null', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodyWithOutDeliveryNumber);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

      it('saleProducts null', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodyWithOutSaleProducts);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

      it('saleProducts []', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodySaleProducts);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

      it('SaleProducts for each productId null', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodyWithOutProductId);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

      it('SaleProducts for each quantity null', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodyWithOutQuantityId);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })

      it('sellerId null', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/api/sales')
          .set('authorization', token)
          .send(bodyWithOutSellerId);

        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      })
    })
  })
})