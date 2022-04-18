/* eslint no-use-before-define: "warn" */
const chalk = require("chalk");
const { ethers } = require("hardhat");

const main = async () => {

    console.log("\n\n 📡 Deploying...\n");

    const IDHactivist = await ethers.getContractFactory('IDHactivist');
    const iDHactivist = await IDHactivist.deploy();
    await iDHactivist.deployed();

    console.log('IDHactivist deployed to:', iDHactivist.address);
    console.log(
        " 💾  Artifacts (address, abi, and args) saved to: ",
        chalk.blue("packages/hardhat/artifacts/"),
        "\n\n"
    );
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
