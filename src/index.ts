import { AuthApiClient, ChatBuilder, KnownChatType, MentionContent, ReplyContent, TalkClient } from 'node-kakao';

// Supply env variables or replace to value.
const DEVICE_UUID = process.env['LOCO_uuid'] as string;
const DEVICE_NAME = process.env['LOCO_device'] as string;

const EMAIL = process.env['LOCO_email'] as string;
const PASSWORD = process.env['LOCO_pwd'] as string;

const CLIENT = new TalkClient();

console.log(DEVICE_UUID,DEVICE_NAME,EMAIL,PASSWORD)

CLIENT.on('chat', (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;

  if (data.text === '안녕하세요') {
    // 답장 형식
    // 안녕하세요 @xxx
    channel.sendChat(
      new ChatBuilder()
      .text('안녕하세요')
      .append(new ReplyContent(data.chat))
      .text(' !')
      .build(KnownChatType.REPLY));
    // 일반 텍스트
    // channel.sendChat('안녕하세요');
  }
});

async function main() {
  const api = await AuthApiClient.create(DEVICE_NAME, DEVICE_UUID);
  const loginRes = await api.login({
    email: EMAIL,
    password: PASSWORD,

    // This option force login even other devices are logon
    forced: true,
  });
  if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

  console.log(`Received access token: ${loginRes.result.accessToken}`);

  const res = await CLIENT.login(loginRes.result);
  if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

  console.log('Login success');
}
main().then();