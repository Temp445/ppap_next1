import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    basePath: '/products/ace-profit-ppap',
  trailingSlash: true,
     images: {
        unoptimized: true, 
    },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);