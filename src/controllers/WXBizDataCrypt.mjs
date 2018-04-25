import crypto from 'crypto';

class WXBizDataCrypt {
  constructor(appId, sessionKey) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }
  decryptData(encryptedData, iv) {
    // base64 decode
    const sessionKey = Buffer.from(this.sessionKey, 'base64');
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');

    let decoded;
    try {
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
      decoded = decipher.update(encryptedData, 'binary', 'utf8');

      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);

      decoded += decipher.final('utf8');

      decoded = JSON.parse(decoded);
    } catch (err) {
      throw new Error('Illegal Buffer');
    }

    if (decoded.watermark.appid !== this.appId) {
      throw new Error('Illegal Buffer');
    }

    return decoded;
  }
}

export default WXBizDataCrypt;
