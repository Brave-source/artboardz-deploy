import { Buffer } from "buffer";
import { COSESign1, COSEKey, BigNum, Label, Int } from "@emurgo/cardano-message-signing-nodejs";
import { Ed25519Signature, RewardAddress, PublicKey, Address } from "@emurgo/cardano-serialization-lib-nodejs";
import dbConnect from "../../../utils/mongo";
import Collector from "../../../models/Collector";

const registeredUsers = [
    "stake1u9upumasn3h8cg6ke7ltfw3r3g2r7u36j5yxfyd2en98rxqzytjc3",
    "stake1u8k7mwu8gdqyvgved89996cy6g8d9vw36w7j05qy2etanxgmgl5s7",
    "stake1uxaauyex6ke9qe9c8tkj2gn50dlzpynwh6uqpgppnwqmm4cw5kk7d",
    "stake1uynpv0vlulhufm8txwry0da9qq6tn9wn42mxltq65pw403qvdcveh",
    "stake1ux3z54xtearr89w4vcgvhl3zp87sj2kngqurrja764gzpvsj23e49",
    "stake1uzxtve77gvu44y0q0h4p8y0ag4wjsc7pxhm2gtyjpgftdyg85gad0",
    "stake1u9ax8rjlq7wc5s9w5r3jzjlps277urh5fx9h200zglwgz0sve6npv",
    "stake1u9ygt5v0zlpv6aadcyf3exrucv2ysljv9820kncjralc4dqxps9c6"
]

export default async function handler (req, res) {
    const {method} = req;

    dbConnect();

    if(method === "GET") {
        try {
            const collectors = await Collector.find().sort({createdAt: -1});
            res.status(200).json(collectors);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    if(method === "POST") {
        const sigData = req.body;
        const decoded = COSESign1.from_bytes( Buffer.from(sigData.signature, "hex") );
        const headermap = decoded.headers().protected().deserialized_headers();
        const addressHex = Buffer.from( headermap.header( Label.new_text("address") ).to_bytes() )
            .toString("hex")
            .substring(4);
        const address = Address.from_bytes( Buffer.from(addressHex, "hex") );

        const key = COSEKey.from_bytes( Buffer.from(sigData.key, "hex") );
        const pubKeyBytes = key.header( Label.new_int( Int.new_negative(BigNum.from_str("2")) ) ).as_bytes();
        const publicKey = PublicKey.from_bytes(pubKeyBytes);

        const payload = decoded.payload();
        const signature = Ed25519Signature.from_bytes(decoded.signature());
        const receivedData = decoded.signed_data().to_bytes();

        const signerStakeAddrBech32 = RewardAddress.from_address(address).to_address().to_bech32();
        const utf8Payload = Buffer.from(payload).toString("utf8");
        const expectedPayload = `account: ${signerStakeAddrBech32}`; // reconstructed message

        // verify:
        const isVerified = publicKey.verify(receivedData, signature);
        const payloadAsExpected = utf8Payload == expectedPayload;
        const signerIsRegistered = registeredUsers.includes(signerStakeAddrBech32);

        const isAuthSuccess = isVerified && payloadAsExpected && signerIsRegistered;

        res.send({
            success: isAuthSuccess,
            message: isAuthSuccess ? "✅ Authentication success!" : "❌ Authentication failed."
        })
        }
}

