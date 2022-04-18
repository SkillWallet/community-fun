const idHacktavistAddress = "0x24142CfDaAdA1D619530ea568c795EBCb24c3435";
const { assert } = require("chai");
var ethers = require("ethers");

var abi =
  require("../artifacts/contracts/IDHactivist.sol/IDHactivist.json").abi;
const fs = require("fs");

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    console.log(e);
  }
  return "";
}

const provider = new ethers.providers.JsonRpcProvider(
  // 'https://polygon-rpc.com/'
  "https://rpc-mumbai.matic.today/"
);

// Wallet connected to a provider
const senderWalletMnemonic = ethers.Wallet.fromMnemonic(
  mnemonic(),
  "m/44'/60'/0'/0/0"
);

let signer = senderWalletMnemonic.connect(provider);
const wallet = ethers.Wallet.createRandom();

const idHacktavistContract = new ethers.Contract(
  idHacktavistAddress,
  abi,
  signer
);

async function whitelist() {
  const url =
    "https://hub.textile.io/ipfs/bafkreicezefuc6einewxdqhlpefelzjponwdqt4vmp2byosq5uwpn7hgoq";
  const whitelistTx = await idHacktavistContract.whitelistRole(2, [
    "0x463D93b4d864fa1D9F70DaC4876Ca55d2a310543",
    "0xCa05bcE175e9c39Fe015A5fC1E98d2B735fF51d9",
    "0xb2D69997CcD1c432AbfE8923F917efa4Fae74A60",
    signer.address
  ], {gasLimit: 25000000});
  const whitelistTxResult = await whitelistTx.wait();
  const { events } = whitelistTxResult;
  const memberAddedEventEmitted = events.find((e) => e.event === "Whitelisted");

  assert.isOk(memberAddedEventEmitted, "Whitelisted event emitted");
  console.log("[whitelist]:", "Whitelisted event emitted");
}
async function claim() {
  const url =
    "https://hub.textile.io/ipfs/bafkreicezefuc6einewxdqhlpefelzjponwdqt4vmp2byosq5uwpn7hgoq";
  const whitelistTx = await idHacktavistContract.claim(url);
  const whitelistTxResult = await whitelistTx.wait();
  const { events } = whitelistTxResult;
  const memberAddedEventEmitted = events.find((e) => e.event === "Claimed");

  assert.isOk(memberAddedEventEmitted, "Claimed event emitted");
  console.log("[claim]:", "Claimed event emitted");

  const balance = await idHacktavistContract.balanceOf(signer.address);
  console.log("[claim]:", "balance", balance.toString());

}

async function test() {
    await whitelist()
    await claim();
}

test();
