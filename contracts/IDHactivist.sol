// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IDHactivist is IERC721Metadata, ERC721, Ownable {
    event Whitelisted();
    event Claimed();

    using Counters for Counters.Counter;

    Counters.Counter private currentTokenId;
    mapping(uint256 => uint256) public tokenToRole;
    mapping(address => bool) public isInitialOwner;
    mapping(address => uint256) public recipientToRole;

    constructor() public ERC721("ID (H)activist", "IDH") {}

    function claim(string calldata metadataUri) public {
        require(recipientToRole[msg.sender] > 0, "Claimer not whitelisted!");
        require(
            balanceOf(msg.sender) == 0,
            "Claimer can have only one idHacktavist NFT"
        );

        currentTokenId.increment();
        uint256 tokenId = currentTokenId.current();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataUri);
        tokenToRole[tokenId] = recipientToRole[msg.sender];
        isInitialOwner[msg.sender] = true;
        emit Claimed();
    }

    function whitelistRole(uint256 role, address[] calldata recipients)
        public
        onlyOwner
    {
        require(role == 2 || role == 5 || role == 6, "Invalid role!");
        require(recipients.length <= 100, "Too many recipients");
        for (uint256 i = 0; i < recipients.length; i++) {
            recipientToRole[recipients[i]] = role;
        }
        emit Whitelisted();
    }
}
