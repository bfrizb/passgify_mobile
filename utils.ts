import _ from "lodash";

const getSpecialChars = () => {
    return String.fromCharCode(
        ..._.range(33, 48).concat(_.range(58, 65)).concat(_.range(91, 97))
    );
};

export const getRandomPrefix = () => {
    const chars = getSpecialChars();
    return chars[Math.floor(Math.random() * chars.length)] + 
        chars[Math.floor(Math.random() * chars.length)];
}

// "I", "l", & "O" are intentionally excluded from getDefaultPb64Map()
export const getDefaultPb64Map = () => {
    return String.fromCharCode(
      ..._.range(65, 73)
        .concat(_.range(74, 79))
        .concat(_.range(80, 91))
        .concat(_.range(97, 108))
        .concat(_.range(109, 123))
        .concat(_.range(48, 58))
        .concat(_.range(48, 53))
    );
  };
  
export const pb64Digest = (hexDigest: string, pb64Map: string, algVersion: number): string => {
  let pbDigest = "";
  _.range(3, hexDigest.length + 1, 3).forEach((i: number) => {
    let bits1: number, bits2: number;
    const twelveBits = parseInt(hexDigest.substring(i - 3, i), 16);
    if (algVersion >= 3) {
      bits1 = (twelveBits >> 6) & 0x3f; // hex(63) == 0x3f
      bits2 = twelveBits & 0x3f; // hex(63) == 0x3f
    } else if (algVersion == 2) {
      bits1 = twelveBits & 0x3f; // hex(63) == 0x3f
      bits2 = twelveBits >> 6; // 2^6 = 64
    } else {
      throw new Error("Unrecognized algorithm version");
    }
    pbDigest += pb64Map.charAt(bits1) + pb64Map.charAt(bits2);
  });
  return pbDigest;
};

export const generateHash = (hashInput: string, hashAlg: string) => {
  //return crypto.createHash(hashAlg).update(hashInput).digest('hex');
}