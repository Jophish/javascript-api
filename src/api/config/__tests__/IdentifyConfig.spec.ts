import IdentifyConfig from '../IdentifyConfig';

const defaultSettings = {
  endpoint: 'https://api.split.io',
  connectionTimeout: 15000,
  debugEnabled: false
};

test('should be a class (function)', () => {
  expect(typeof IdentifyConfig).toBe('function');
});

test('instances should expose an API', () => {
  const config = new IdentifyConfig();

  expect(config.endpoint).toBeDefined();
  expect(config.connectionTimeout).toBeDefined();
  expect(config.debugEnabled).toBeDefined();
});

test('should have configurations by default', () => {
  const config = new IdentifyConfig();  

  expect(config.endpoint).toBe(defaultSettings.endpoint);
  expect(config.connectionTimeout).toBe(defaultSettings.connectionTimeout);
  expect(config.debugEnabled).toBe(defaultSettings.debugEnabled);
});

test('should be able to receive settings on creation', () => {
  const settings = {
    endpoint: 'test_url',
    connectionTimeout: 1010,
    debugEnabled: true
  };
  const config = new IdentifyConfig(settings);

  expect(config.endpoint).toBe(settings.endpoint);
  expect(config.connectionTimeout).toBe(settings.connectionTimeout);
  expect(config.debugEnabled).toBe(settings.debugEnabled);
});

test('should be able to receive partial settings', () => {
  const config = new IdentifyConfig({
    endpoint: 'test_url'
  });

  expect(config.endpoint).toBe('test_url');
  expect(config.connectionTimeout).toBe(defaultSettings.connectionTimeout);
  expect(config.debugEnabled).toBe(defaultSettings.debugEnabled);
});


