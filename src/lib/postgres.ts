import pgPromise from 'pg-promise';

const pgp =
  pgPromise(/*{
  receive(e) {
    const template = e.data[0];
    for (var prop in template) {
      let camel = pgPromise.utils.camelize(prop);
      if (!(camel in template)) {
        for (var i = 0; i < e.data.length; i++) {
          let d = e.data[i];
          d[camel] = d[prop];
          delete d[prop];
        }
      }
    }
  },
}*/);

export const pg = pgp({
  connectionString: process.env.POSTGRES_URI,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
