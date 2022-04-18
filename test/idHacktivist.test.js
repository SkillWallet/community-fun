const { expect } = require("chai");
const { ethers } = require("hardhat");
const truffleAssert = require("truffle-assertions");

let idHactavist;

const metadataUrl =
  "https://hub.textile.io/thread/bafkwfcy3l745x57c7vy3z2ss6ndokatjllz5iftciq4kpr4ez2pqg3i/buckets/bafzbeiaorr5jomvdpeqnqwfbmn72kdu7vgigxvseenjgwshoij22vopice";

contract("IDHactivist", (accounts) => {
  before(async () => {
    [signer, whitelisted, whitelisted2, notWhitelisted, ...accounts] =
      await ethers.getSigners();

    const IDHactivist = await ethers.getContractFactory("IDHactivist");
    idHactavist = await IDHactivist.deploy();
    await idHactavist.deployed();
  });

  describe("IDHactivist", async () => {
    it("Should fail whitelisting if role is invalid", async () => {
      await truffleAssert.reverts(
        idHactavist.whitelistRole(1, [
          whitelisted.address,
          whitelisted2.address,
          ethers.Wallet.createRandom().address,
        ]),
        "Invalid role!"
      );
    });
    it("Should fail if whitelisting addresses are > 100", async () => {
      await truffleAssert.reverts(
        idHactavist.whitelistRole(2, [
          whitelisted.address,
          whitelisted2.address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
          ethers.Wallet.createRandom().address,
        ]),
        "Too many recipients"
      );
    });
    it("Should whitelist some addresses", async () => {
      await idHactavist.whitelistRole(2, [
        whitelisted.address,
        whitelisted2.address,
        ethers.Wallet.createRandom().address,
      ]);
    });

    it("Should fail if claimer is not whitelisted", async () => {
      await truffleAssert.reverts(
        idHactavist.connect(notWhitelisted).claim(metadataUrl),
        "Claimer not whitelisted!"
      );
    });
    it("Should claim", async () => {
      await idHactavist.connect(whitelisted).claim(metadataUrl);
      expect(
        (await idHactavist.balanceOf(whitelisted.address)).toString()
      ).to.eq("1");
      expect(await idHactavist.tokenURI(1)).to.eq(metadataUrl);
      expect(await idHactavist.isInitialOwner(whitelisted.address)).to.be.true;
      expect((await idHactavist.tokenToRole("1")).toString()).to.eq("2");
      expect(await idHactavist.ownerOf("1")).to.eq(whitelisted.address);
    });
    it("Should fail claiming twice", async () => {
      await truffleAssert.reverts(
        idHactavist.connect(whitelisted).claim(metadataUrl),
        "Claimer can have only one idHacktavist NFT"
      );
    });
    it("After transfer the new owner should not be initial owner", async () => {
      await idHactavist
        .connect(whitelisted)
        .transferFrom(whitelisted.address, whitelisted2.address, 1);

      const balanceInitialOwner = (
        await idHactavist.balanceOf(whitelisted.address)
      ).toString();
      const balanceNewOwner = (
        await idHactavist.balanceOf(whitelisted2.address)
      ).toString();
      const isInitialOwnerOld = await idHactavist.isInitialOwner(
        whitelisted.address
      );
      const isInitialOwnerNew = await idHactavist.isInitialOwner(
        whitelisted2.address
      );

      expect(balanceInitialOwner).to.eq("0");
      expect(balanceNewOwner).to.eq("1");
      expect(isInitialOwnerOld).to.be.true;
      expect(isInitialOwnerNew).to.be.false;
    });
  });
});
