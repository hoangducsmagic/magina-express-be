import { config } from '.';

export const environment = () => {
  return {
    email: {
      transport: {
        host: config.SMTP_HOST || 'localhost',
        port: config.SMTP_PORT ? parseInt(config.SMTP_PORT, 10) : 1025,
        auth:
          config.SMTP_USER && config.SMTP_PASSWORD
            ? {
                user: config.SMTP_USER,
                pass: config.SMTP_PASSWORD
              }
            : null
      },
      defaults: {
        from: config.EMAIL_FROM
      },
      templateDir:
        config.MODE !== 'development'
          ? '/dist/src/assets/email-templates'
          : '/src/assets/email-templates'
    },
    jwt: {
      expiration: 24 * 60 * 60 * 7, // 7 days
      rememberMe: 24 * 60 * 60 * 30, // 30 days
      issuer: process.env.SERVER_HOST || 'localhost',
      audience: 'Joonied',
      secretKey:
        process.env.JWT_SECRET_KEY || '2a4Xj9vQjfxV3rw2Usi2qMKEiMlOIjN5',
      refreshTokenTTL: 3600 * 24 * 90, // 90 days
      refreshTokenKeyPrefix: 'refresh_token'
    },
    appUrl: {
      frontendUrl: process.env.FRONTEND_URL || 'localhost',
      backendUrl: process.env.BACKEND_URL || 'localhost'
    },
    chatPlatform: {
      appId:
        process.env.SENDBIRD_APP_ID || 'E4A83F61-BCAB-4765-A984-0BA5614EAB76',
      apiToken:
        process.env.SENDBIRD_API_TOKEN ||
        '3ce31f11c710a30f4d70ebb7fb50c1d97a62447a'
    },
    aws: {
      uploads: {
        companyLogo: {
          accessKeyId: process.env.UPLOAD_COMPANY_LOGO_AWS_ACCESS_KEY_ID,
          secretAccessKey:
            process.env.UPLOAD_COMPANY_LOGO_AWS_SECRET_ACCESS_KEY,
          bucket: process.env.UPLOAD_COMPANY_LOGO_AWS_BUCKET,
          directory: process.env.UPLOAD_COMPANY_LOGO_AWS_FOLDER,
          region: process.env.UPLOAD_COMPANY_LOGO_AWS_REGION
        },
        // TODO: Update later
        userAvatar: {
          accessKeyId: process.env.UPLOAD_COMPANY_LOGO_AWS_ACCESS_KEY_ID,
          secretAccessKey:
            process.env.UPLOAD_COMPANY_LOGO_AWS_SECRET_ACCESS_KEY,
          bucket: process.env.UPLOAD_COMPANY_LOGO_AWS_BUCKET,
          directory: process.env.UPLOAD_COMPANY_LOGO_AWS_FOLDER,
          region: process.env.UPLOAD_COMPANY_LOGO_AWS_REGION
        },
        documentUpload: {
          accessKeyId: process.env.UPLOAD_DOCUMENT_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.UPLOAD_DOCUMENT_AWS_SECRET_ACCESS_KEY,
          bucket: process.env.UPLOAD_DOCUMENT_AWS_BUCKET,
          directory: process.env.UPLOAD_DOCUMENT_AWS_FOLDER,
          region: process.env.UPLOAD_DOCUMENT_AWS_REGION
        },
        // TODO: Update later
        public: {
          accessKeyId: process.env.UPLOAD_COMPANY_LOGO_AWS_ACCESS_KEY_ID,
          secretAccessKey:
            process.env.UPLOAD_COMPANY_LOGO_AWS_SECRET_ACCESS_KEY,
          bucket: process.env.UPLOAD_COMPANY_LOGO_AWS_BUCKET,
          directory: process.env.UPLOAD_COMPANY_LOGO_AWS_FOLDER,
          region: process.env.UPLOAD_COMPANY_LOGO_AWS_REGION
        }
      },
      sqs: {
        accessKeyId: process.env.AWS_SQS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY,
        region: process.env.AWS_SQS_REGION,
        url: process.env.AWS_SQS_URL
      }
    }
  };
};

export default environment();
