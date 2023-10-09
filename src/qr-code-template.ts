import * as QRCode from 'qrcode';

async function qrCodeTemplate(slug: string, url: string) {
  const newURL = new URL(`/${slug}`, url);
  const shorLinkCode = await QRCode.toString(newURL.href, {
    type: 'svg',
  });
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>QR Code for ${slug}</title>
      <style>
        h1 {
          text-align: center;
        }
        #qr-code {
          margin: auto;
          max-width: 450px;
        }
        @media (max-width: 825px) {
          #qr-code {
            max-width: 300px;
          }
        }
      </style>
    </head>
    <body>
    <main>
      <h1>QR Code for ${slug}</h1>
      <div id="qr-code">${shorLinkCode}</div>
    </main>
    </body>
    </html>`;
}

export default qrCodeTemplate;
