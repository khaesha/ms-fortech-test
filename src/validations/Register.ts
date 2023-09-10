import Joi from 'joi';

export default () => {
  return Joi.object().keys({
    username: Joi.string().required(),
    fullname: Joi.string().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' })
  });
};
