const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.mineCoins = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const coins = Math.floor(Math.random() * 10) + 1;
  await admin.firestore().collection("users").doc(uid).set({
    balance: admin.firestore.FieldValue.increment(coins)
  }, { merge: true });
  return { coins };
});