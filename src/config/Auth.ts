export default {
  jwt: {
    wordSecret: process.env.APP_WORD_SECRET,
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '1d',
  },
};
