//引入模块
import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";

const email = {
  user: "257286767@qq.com",
  pass: "rhtbszxhmppxcajj",
};
const transporter = nodemailer.createTransport({
  service: "QQ",
  auth: {
    user: email.user,
    pass: email.pass,
  },
});

export const sendQQemail = (mailOptions: SendMailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log(`Message: ${info.messageId}`);
    console.log(`sent: ${info.response}`);
  });
};

export const getTemplate = ({
  to,
  msg,
}: {
  to: string;
  msg: string;
}): SendMailOptions => {
  return {
    from: email.user,
    to,
    subject: "注册验证",
    text: `您的验证码为：${msg}, 10分钟内有效，请谨慎保管。`,
    html: `<span>【IconSolution】:您的注册验证码为：${msg}, 若不是本人操作请忽略。</span>`,
  };
};
