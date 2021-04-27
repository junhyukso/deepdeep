import { AuthApiClient, ChatBuilder, KnownChatType, MentionContent, ReplyContent, TalkClient } from 'node-kakao';
const fetch = require('node-fetch');
// Supply env variables or replace to value.
const DEVICE_UUID = process.env['LOCO_uuid'] as string;
const DEVICE_NAME = process.env['LOCO_device'] as string;

const EMAIL = process.env['LOCO_email'] as string;
const PASSWORD = process.env['LOCO_pwd'] as string;

const CLIENT = new TalkClient();

console.log(DEVICE_UUID,DEVICE_NAME,EMAIL,PASSWORD)

CLIENT.on('chat', async (data, channel) => {
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

  if (data.text === '/klay'){
    //GET CEX price
    var coin_list = ['DAI','USDT','BTC','ETH','KLAY', 'KSP', 'SKLAY', 'ORC','ISR','MNR']
    var fetch_list = await Promise.all(
      coin_list.map(v=>fetch(`https://api.coinone.co.kr/ticker?currency=${v}`))
      )
    var json_list = await Promise.all(
      fetch_list.map(v=>v.json())
    )
    json_list[0].last = 1110 //DAI
    json_list[1].last = 1110 //USDT
    let coin_map :Record<string,number>= {}
    for (let i in coin_list){
      coin_map[coin_list[i]] = json_list[i].last
    }

    let tokens_name : Record<string, string> = {
      "0x0000000000000000000000000000000000000000" : "KLAY",
      "0x5c74070FDeA071359b86082bd9f9b3dEaafbe32b" : "DAI",
      "0xA323d7386b671E8799dcA3582D6658FdcDcD940A" : "SKLAY",
      "0x34d21b1e550D73cee41151c77F3c73359527a396" : "ETH",
      "0x16D0e1fBD024c600Ca0380A4C5D57Ee7a2eCBf9c" : "BTC",
      "0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167" : "USDT",
      "0xFe41102f325dEaa9F303fDd9484Eb5911a7BA557" : "ORC",
      "0x9657fb399847D85A9C1A234ECe9ca09D5c00f466" : "ISR",
      "0x275f942985503d8ce9558f8377cc526a3aba3566" : "WIKEN",
      "0xdCd62c57182E780E23d2313C4782709Da85b9D6C" : "SSX",
      "0x46f307B58bf05Ff089BA23799FAE0e518557f87C" : "ABL",
      "0x1cD3828A2B62648dbE98d6F5748a6B1df08AC7bb" : "REDi",
      "0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654" : "KSP",
      "0x588C62eD9aa7367d7cd9C2A9aaAc77e44fe8221B" : "AGOV",
      "0x4dd402A7d54eaa8147Cb6fF252AFe5BE742bDF40" : "HINT",
      "0x5096dB80B21Ef45230C9E423C373f1FC9C0198dd" : "WEMIX",
      "0x321Bc0B63EFb1e4af08Ec6D20c85D5E94dDaAa18" : "BBC",
      "0x0c1d7ce4982fd63b1bc77044be1da05c995e4463" : "TRIX",
      "0xafde910130c335fa5bd5fe991053e3e0a49dce7b" : "PIB",
      "0xc4407f7dc4b37275c9ce0f839652b393e13ff3d1" : "CLBK",
      "0x3f34671fba493ab39fbf4ecac2943ee62b654a88" : "HANDY",
      "0x4b91c67a89d4c4b2a4ed9fcde6130d7495330972" : "TRCL",
      "0x27dcd181459bcddc63c37bab1e404a313c0dfd79" : "MNR",
    }

    interface Pool {
      exchange_address : string,
      tokenA : string,
      tokenB : string
    }
    
    let pools : Array<Pool> = [
      {
         "exchange_address":"0xa3987cf6C14F1992e8b4a9E23192Eb79dC2969b8",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x5c74070FDeA071359b86082bd9f9b3dEaafbe32b",
      },
      {
         "exchange_address":"0x073FDe66B725D0eF5b54059ACa22bBFC63a929ce",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0xA323d7386b671E8799dcA3582D6658FdcDcD940A",
      },
      {
         "exchange_address":"0x2A6A4b0c96cA98eB691a5ddceE3c7b7788c1a8E3",
         "tokenA":"0x34d21b1e550D73cee41151c77F3c73359527a396",
         "tokenB":"0x16D0e1fBD024c600Ca0380A4C5D57Ee7a2eCBf9c",
      },
      {
         "exchange_address":"0x27F80731dDdb90C51cD934E9BD54bfF2D4E99e8a",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x34d21b1e550D73cee41151c77F3c73359527a396",
      },
      {
         "exchange_address":"0x029e2A1B2bb91B66bd25027E1C211E5628dbcb93",
         "tokenA":"0x34d21b1e550D73cee41151c77F3c73359527a396",
         "tokenB":"0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167",
      },
      {
         "exchange_address":"0xe9ddb7A6994bD9cDF97CF11774A72894597D878B",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0xFe41102f325dEaa9F303fDd9484Eb5911a7BA557",
      },
      {
         "exchange_address":"0x869440673a24E3C3F18C173D8A964b2F2621245b",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x9657fb399847D85A9C1A234ECe9ca09D5c00f466",
      },
      {
         "exchange_address":"0x6119b1540AA3BeA20518f5e239f64d98EBe9AafF",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x275F942985503d8CE9558f8377cC526A3aBa3566",
      },
      {
         "exchange_address":"0x01D71c376425b4fECCB7b8719a760110091b3eB9",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0xdCd62c57182E780E23d2313C4782709Da85b9D6C",
      },
      {
         "exchange_address":"0x9609861EEC1DC15756fD0F5429FB96E475790920",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x46f307B58bf05Ff089BA23799FAE0e518557f87C",
      },
      {
         "exchange_address":"0x5e9BC710d817aFfA64e0fD93f3f7602E9f4dD396",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x1cD3828A2B62648dbE98d6F5748a6B1df08AC7bb",
      },
      {
         "exchange_address":"0x9103Beb39283dA9C49B020D6546FD7C39f9bbc5b",
         "tokenA":"0x16D0e1fBD024c600Ca0380A4C5D57Ee7a2eCBf9c",
         "tokenB":"0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167",
      },
      {
         "exchange_address":"0x6dc6bd65638B18057F7E6a2e8f136F3E77CC2038",
         "tokenA":"0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654",
         "tokenB":"0xFe41102f325dEaa9F303fDd9484Eb5911a7BA557",
      },
      {
         "exchange_address":"0x34cF46c21539e03dEb26E4FA406618650766f3b9",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654",
      },
      {
         "exchange_address":"0x5C6795E72c47D7FA2B0C7A6446D671Aa2e381D1e",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x588C62eD9aa7367d7cd9C2A9aaAc77e44fe8221B",
      },
      {
         "exchange_address":"0x194896a1FBd33A13d71E0A2053d4f8129f435e31",
         "tokenA":"0x588C62eD9aa7367d7cd9C2A9aaAc77e44fe8221B",
         "tokenB":"0x4dd402A7d54eaa8147Cb6fF252AFe5BE742bDF40",
      },
      {
         "exchange_address":"0x917EeD7ae9E7D3b0D875dd393Af93fFf3Fc301F8",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x5096dB80B21Ef45230C9E423C373f1FC9C0198dd",
      },
      {
         "exchange_address":"0x9d9De38C473D769D76034200F122995d8b6550Ea",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x321Bc0B63EFb1e4af08Ec6D20c85D5E94dDaAa18",
      },
      {
         "exchange_address":"0xc320066b25b731a11767834839fe57f9b2186f84",
         "tokenA":"0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
         "tokenB":"0x5c74070fdea071359b86082bd9f9b3deaafbe32b",
      },
      {
         "exchange_address":"0xd83f1b074d81869eff2c46c530d7308ffec18036",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
      },
      {
         "exchange_address":"0x0b8f6200597a3b75f4d1bf0668b8ecba2dc77afb",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x0c1d7ce4982fd63b1bc77044be1da05c995e4463",
      },
      {
         "exchange_address":"0x2ecdf3088488a8e91c332b9ee86bb87d4e9cce82",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0xafde910130c335fa5bd5fe991053e3e0a49dce7b",
      },
      {
         "exchange_address":"0x55a5dcc23a7a697052ab5d881530849ca0efad34",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0xc4407f7dc4b37275c9ce0f839652b393e13ff3d1",
      },
      {
         "exchange_address":"0xce28f9330658b6b4871c081e0a9a332ae8a7d8c1",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x3f34671fba493ab39fbf4ecac2943ee62b654a88",
      },
      {
         "exchange_address":"0x8e4e386950f6c03b25d0f9aa8bd89c1b159e8aee",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x4b91c67a89d4c4b2a4ed9fcde6130d7495330972",
      },
      {
         "exchange_address":"0xe641811d4a0c80d1260d4036df54d90559b9ab54",
         "tokenA":"0x0000000000000000000000000000000000000000",
         "tokenB":"0x27dcd181459bcddc63c37bab1e404a313c0dfd79",
      },
      {
         "exchange_address":"0x587a01f81e5c078cd7c03f09f45705530ffb7b94",
         "tokenA":"0xfe41102f325deaa9f303fdd9484eb5911a7ba557",
         "tokenB":"0x5c74070fdea071359b86082bd9f9b3deaafbe32b",
      },
      {
         "exchange_address":"0x94f390a8438b5de00b868d3ae47863db90fb92c3",
         "tokenA":"0xfe41102f325deaa9f303fdd9484eb5911a7ba557",
         "tokenB":"0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167",
      }
   ]
   async function get_pool_info(pool:Pool){ //FIXME MUST HANDLE ERROR CASE!!!!! ERROR POOL NOT CONSIDERNG!!!!
      console.log("Finding Pool INFO!")
      let main_url = `https://api-cypress.scope.klaytn.com/v1/accounts/${pool.exchange_address}`
      let balance_url = `https://api-cypress.scope.klaytn.com/v1/accounts/${pool.exchange_address}/balances`

      let klay_balance = (await (await fetch(main_url)).json()).result.balance / Math.pow(10,18)
      let {result, tokens} = (await (await fetch(balance_url)).json())
      console.log("This Pool Has "+klay_balance)
      console.log("This pool Has Balances ...")
      console.log(result)

      let tokenA_name :string = tokens_name[pool.tokenA]
      let tokenB_name :string = tokens_name[pool.tokenB]
      let tokenA_volume : number;
      let tokenB_volume : number;

      function _find_from_res(token_addr:string) : number{
        token_addr = token_addr.toLowerCase()
        let decimal = tokens[token_addr].decimals
        for (let token of result){
          if (token.tokenAddress == token_addr){
            return token.amount /Math.pow(10,decimal)
          }
        }
        return 0 //ERROR CASE !!! EXTREMEELY CAUTION!!! FIXME FIXME FIXME
      }
      console.log("Finidng "+pool.tokenA)
      tokenA_volume =  (tokenA_name=='KLAY') ? klay_balance : _find_from_res(pool.tokenA)
      console.log("Amount : "+tokenA_volume)
      console.log("Finding "+pool.tokenB)
      tokenB_volume =  (tokenB_name=='KLAY') ? klay_balance : _find_from_res(pool.tokenB)
      console.log("Amount : "+tokenB_volume)
      console.log("\n\n")
      return [tokenA_volume, tokenB_volume]
   }

    var txt = "클레이 관련 코인 정보" + String.fromCharCode(8237).repeat(500)
    txt+="\n중앙거래소 시세(코인원) [ COIN/KRW ]\n=================\n"
    for(var i in coin_list){
      txt += `${coin_list[i]} : ${json_list[i].last}\n`
    }
    txt += "=====디파이 시세 =========\n 풀이름 | 디파이 비율 | 중앙거래소원화가치비율 | 상대이득\n"
    for (let pool of pools){
      let tokenA_name :string = tokens_name[pool.tokenA]
      let tokenB_name :string = tokens_name[pool.tokenB]
      if ( coin_list.includes(tokenA_name) && coin_list.includes(tokenB_name)){
          let[tokenA_amount, tokenB_amount] = await get_pool_info(pool)
          let pool_name : string = `${tokenA_name}-${tokenB_name}`
          let defi_ratio = tokenB_amount/tokenA_amount
          let cex_ratio = coin_map[tokenA_name] / coin_map[tokenB_name]
          let delta = cex_ratio/defi_ratio
          txt += `${pool_name} |  ${defi_ratio} | ${cex_ratio } | ${delta}\n`
      }
    }

    console.log(txt)
    channel.sendChat(
      new ChatBuilder()
      .text(txt)
      .build(KnownChatType.TEXT));
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