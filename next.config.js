module.exports = {
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    optimizeFonts: true,
    trailingSlash: true,
    compiler: {
        styledComponents: true,
    },

    images: {
        // loader: "custom",
        // loaderFile: "components/CustomImageLoader/index.js",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.glamcode.in',
                port: '',
                pathname: '/**/**',
            },
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port: '',
                pathname: '/**/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**/**'
            }
        ],
        // domains: ["admin.glamcode.in"],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [320, 480, 640, 750, 828, 960, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
        minimumCacheTTL: 60,
        formats: ['image/avif', 'image/webp'],
        unoptimized: true,
        // images: {
        //   unoptimized: true,
        // },
    },

    experimental: {
        esmExternals: true,
    },
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            // Enable minification for production build
            config.optimization.minimize = true;
        }

        return config;
    },
    distDir: ".next",
};

// module.exports = {
//     trailingSlash: true,
//     reactStrictMode: true,
//     async redirects() {
//         return [
//             {
//                 source: "https://glamcode.in",
//                 destination: "https://www.glamcode.in",
//                 permanent: true,
//             },
//         ]
//     },
// }

// module.exports = {
//   distDir: ".next",
// };
