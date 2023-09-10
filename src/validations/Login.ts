import Joi from 'joi';

export default () => {
  return Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
};
