import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'boilerplate-ionic',
  webDir: 'dist',
  android: {
    flavor: 'neosyn'
  },
  ios: {
    path: "ios",
    scheme: "Neosyn",
  }
};

export default config;
