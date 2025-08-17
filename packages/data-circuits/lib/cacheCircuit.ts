import Client from 'ioredis';

/**
 * @param {object} options
 * @param {Client} options.redisClient 
 */
export const getFactory = ({ redisClient }) => {
  if (!(redisClient instanceof Client)) throw new Error('redisClient required');
  const pub = redisClient;
  const sub = redisClient.duplicate();


  
  return 
  /**
   * 
   * @param {object} options
   * @param {string} options.name
   * @param {import('./CircuitOptions.js').CircuitOptions} options.circuitOptions
   */
  ({ name, circuitOptions }) => {

  }
}