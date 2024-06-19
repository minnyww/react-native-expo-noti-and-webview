const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 2000;

require("dotenv").config();

const NATIVE_TOKEN =
  "ewRcxny8SRKwEUeNAAJAhZ:APA91bGW6MfHeuiwJmu0cYqX709eDeQYFJM4-bPMxBKAU-Tn-0bFpCWjH2di8Os5o0zN75Z2dj6E8xDCm4GpaDqF72YWJXnnHyRED3-xJiYL1-fgiN8yt79sSex8alrWnfaoyXltHA_P";

app.get("/send-notification", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: process.env.FCM_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${process.env.FCM_SERVER_KEY}`,
      },
      data: JSON.stringify({
        to: NATIVE_TOKEN,
        priority: "normal",
        data: {
          experienceId: `${process.env.EXPO_USERNAME}/${process.env.EXPO_SLUG}`,
          title: "blog.me-idea.in.th",
          message:
            "ทดสอบส่ง message ผ่าน server โดยใช้ Firebase Cloud Messaging",
          body: JSON.stringify({ photoId: 42 }),
        },
      }),
    });

    console.log("==>", response.data);

    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
