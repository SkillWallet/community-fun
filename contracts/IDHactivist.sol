// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IDHactivist is IERC721Metadata, ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private currentTokenId;
    mapping(uint256 => uint256) public tokenToRole;
    mapping(address => bool) public isInitialOwner;

    constructor() public ERC721("ID (H)activist", "IDH") {}

    function mintTo(
        address recipient,
        uint256 role,
        string calldata metadataUri
    ) public returns (uint256) {
        // 2 Hackers
        // 5 Chaperons
        // 6 Volunteers
        require(role == 2 || role == 5 || role == 6, "Invalid role!");
        require(
            balanceOf(recipient) == 0,
            "Recipient can have only one idHacktavist NFT"
        );

        currentTokenId.increment();
        uint256 tokenId = currentTokenId.current();

        require(tokenId <= 300, "All badges are already minted!");

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, metadataUri);
        tokenToRole[tokenId] = role;
        isInitialOwner[recipient] = true;

        return tokenId;
    }
}
