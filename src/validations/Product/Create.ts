import Joi from 'joi';

export default () => {
  return Joi.object().keys({
    productName: Joi.string().required()
  });
};
