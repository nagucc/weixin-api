import express from 'express';
import WXBizDataCrypt from './WXBizDataCrypt';

const router = new express.Router();

router.post(
  '/decrypt',
  (req, res) => {
    const {
      appId, sessionKey, encryptedData, iv,
    } = req.body;
    const pc = new WXBizDataCrypt(appId, sessionKey);
    const data = pc.decryptData(encryptedData, iv);
    res.json({
      ret: 0,
      data,
    });
  },
);

export default router;
