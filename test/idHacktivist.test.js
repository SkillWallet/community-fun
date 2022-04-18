const { expect } = require("chai");
const { ethers } = require("hardhat");
const truffleAssert = require("truffle-assertions");

let idHactavist;

const metadataUrl =
  "https://hub.textile.io/thread/bafkwfcy3l745x57c7vy3z2ss6ndokatjllz5iftciq4kpr4ez2pqg3i/buckets/bafzbeiaorr5jomvdpeqnqwfbmn72kdu7vgigxvseenjgwshoij22vopice";

contract("IDHactivist", (accounts) => {
  before(async () => {
    [signer, tokenHolder, tokenHolder2, ...accounts] =
      await ethers.getSigners();

    const IDHactivist = await ethers.getContractFactory("IDHactivist");
    idHactavist = await IDHactivist.deploy();
    await idHactavist.deployed();
  });

  describe("IDHactivist", async () => {
    it("Should fail if roles are wrong", async () => {
      await truffleAssert.reverts(
        idHactavist.mintTo(tokenHolder.address, 1, metadataUrl),
        "Invalid role!"
      );
      await truffleAssert.reverts(
        idHactavist.mintTo(tokenHolder.address, 7, metadataUrl),
        "Invalid role!"
      );
    });
    it("Should mint an NFT", async () => {
      await idHactavist.mintTo(tokenHolder.address, 2, metadataUrl);
      expect(
        (await idHactavist.balanceOf(tokenHolder.address)).toString()
      ).to.eq("1");
      expect(await idHactavist.tokenURI(1)).to.eq(metadataUrl);
      expect(await idHactavist.isInitialOwner(tokenHolder.address)).to.be.true;
    });
    it("Should fail minting to the same recipient", async () => {
      await truffleAssert.reverts(
        idHactavist.mintTo(tokenHolder.address, 7, metadataUrl),
        "Invalid role!"
      );
    });
    it("After transfer the new owner should not be initial owner", async () => {
      await idHactavist
        .connect(tokenHolder)
        .transferFrom(tokenHolder.address, tokenHolder2.address, 1);

        const balanceInitialOwner = (await idHactavist.balanceOf(tokenHolder.address)).toString();
        const balanceNewOwner = (await idHactavist.balanceOf(tokenHolder2.address)).toString();
        const isInitialOwnerOld = await idHactavist.isInitialOwner(tokenHolder.address);
        const isInitialOwnerNew = await idHactavist.isInitialOwner(tokenHolder2.address);

        expect(balanceInitialOwner).to.eq('0');
        expect(balanceNewOwner).to.eq('1');
        expect(isInitialOwnerOld).to.be.true;
        expect(isInitialOwnerNew).to.be.false;

    });
  });
});
