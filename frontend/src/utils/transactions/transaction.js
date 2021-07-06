/* global BigInt */
import {codec, transactions} from "@liskhq/lisk-client";
import {getFullAssetSchema} from "../common";

export const createTransaction = async ({
                                          moduleId,
                                          assetId,
                                          account,
                                          assets,
                                          client,
                                          getFee,
                                        }) => {
  const {publicKey} = account;
  const transactionObject = {
    moduleID: moduleId,
    assetID: assetId,
    nonce: BigInt(0),
    fee: BigInt(transactions.convertLSKToBeddows('0.01')),
    senderPublicKey: publicKey,
    asset: {
      ...assets
    }
  }
  const assetSchema = client.schemas.transactionsAssets
    .find(s => s.moduleID === moduleId && s.assetID === assetId)
  const schema = assetSchema.schema;
  console.log(schema, transactionObject)
  const fee = transactions.computeMinFee(schema, transactionObject)
  if (getFee) {
    return transactions.convertBeddowsToLSK(fee.toString())
  }
  let signedTransaction, tx;
  if (moduleId !== 6666) {
    tx = await client.transaction.create({
      moduleID: moduleId,
      assetID: assetId,
      fee: fee,
      asset: {
        ...assets
      },
    }, account.passphrase.join(" "));
  } else {

    signedTransaction = transactions.signTransaction(
      schema,
      {...transactionObject, fee},
      new Buffer.from(client._nodeInfo.networkIdentifier, 'hex'),
      account.passphrase.join(" "),
    )
  }
  let result = {
    status: false,
    message: null,
  };
  try {
    result.status = true;
    if (moduleId === 6666) {
      const {id, ...rest} = signedTransaction;
      result.message = await client.transaction.send(codec.codec.fromJSON(getFullAssetSchema(schema), rest))
    } else {
      result.message = await client.transaction.send(tx)
    }
  } catch ({message}) {
    result.status = false;
    result.message = message;
  }
  console.log(result)
  return result;
}