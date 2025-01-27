module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '6.0.5',
        skipMD5: true,
      },
      instance: {
        dbName: 'favorite-list',
      },
      autoStart: false,
    },
  };