import Schema from 'async-validator';

const validate = async (rule, values) => {
  const validator = new Schema(rule);
  try {
    await validator.validate(values, { first: true });
    return { error: null };
  } catch (e) {
    const { errors } = e;
    return { error: errors[0].message };
  }
};

export default validate;
