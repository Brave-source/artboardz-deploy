const test_api = "preprodrcir5G91CfvybwxV81ovVgRG51u50xh0" ;
const test_url = "https://cardano-preprod.blockfrost.io/api/v0";
const API_URL = 'https://cardano-mainnet.blockfrost.io/api/v0';
import axios from 'axios';

export async function getNFTsForAddress(address: string) {
  try {
    const response = await axios.get(`${API_URL}/addresses/${address}`, {
      headers: { 'project_id': process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY }
    });
    const data = response.data;

    // Check if the address has any UTXOs (unspent transaction outputs)
    // if (!data.utxo.length) {
    //   return [];
    // }

    // // Filter out any tokens that are not NFTs
    // const nfts = data.utxo.flatMap((utxo: any) =>
    //   utxo.output.amount
    //     .filter((amt: any) => amt.unit === 'lovelace' && amt.quantity === '0')
    //     .flatMap((amt: any) =>
    //       amt.multiasset
    //         ? Object.keys(amt.multiasset).filter((asset: any) => Object.keys(amt.multiasset[asset]).length === 1)
    //         : []
    //     )
    // );

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getNFTById(address: string, nftId: string) {
    try {
      const response = await axios.get(`${API_URL}/addresses/${address}`, {
        headers: { 'project_id': process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY }
      });
      const data = response.data;
      console.log(data)
  
      // Check if the address has any UTXOs (unspent transaction outputs)
      if (!data.utxo.length) {
        throw new Error('No UTXOs found for the specified address');
      }
  
      // Find the specified NFT by ID
      const nft = data.utxo.flatMap((utxo: any) =>
        utxo.output.amount
          .filter((amt: any) => amt.unit === 'lovelace' && amt.quantity === '0')
          .flatMap((amt: any) =>
            amt.multiasset
              ? Object.keys(amt.multiasset).filter((asset: any) => asset === nftId && Object.keys(amt.multiasset[asset]).length === 1)
              : []
          )
      );
  
      if (!nft.length) {
        throw new Error(`NFT with ID ${nftId} not found for the specified address`);
      }
  
      return nft[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error searching for NFT');
    }
  }
//   console.log(getNFTsForAddress("addr_test1qpd6h6ttn9ktyd9vs75j9gwhrddktnhzrt2lxw7y6d983hadrr2zf0whzt4quk03egdn4yaesm29288k0t56uz2qavtsdejkxa"))