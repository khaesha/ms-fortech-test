import Joi from 'joi';

export default () => {
  return Joi.object().keys({
    productId: Joi.number().required()
  });
};
