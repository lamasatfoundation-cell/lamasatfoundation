export default async function handler(req, res) {
  const { code } = req.query;
  
  // نرسل الرمز إلى جيت هاب للحصول على صلاحية الدخول الرسمية
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();
  
  // إرسال النتيجة إلى لوحة التحكم لفتح الدخول
  res.status(200).json(data);
}
