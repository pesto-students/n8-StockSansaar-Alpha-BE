module.exports = {
  type: "service_account",
  project_id: "stocksansaar",
  private_key_id: "7e3c9a748a529227e887e485a61fe9e80944e735",
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: "firebase-adminsdk-qzkrr@stocksansaar.iam.gserviceaccount.com",
  client_id: "102808643088511199248",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qzkrr%40stocksansaar.iam.gserviceaccount.com",
};
