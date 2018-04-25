import express from 'express';
import fetch from 'node-fetch';

const router = new express.Router();

router.get(
  '/jscode2session',
  async (req, res) => {
    const { appId, secret, code } = req.query;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
    const result = await fetch(url);
    res.json(await result.json());
  },
);

export default router;
