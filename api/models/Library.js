/**
 * Library.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    address: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string',
      required: true
    },
    state: {
      type: 'string',
      required: true
    },
    zip: {
      type: 'integer',
      required: true
    },
    lat: {
      type: 'float',
      required: true
    },
    lon: {
      type: 'float',
      required: true
    }
  }
}