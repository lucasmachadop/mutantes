const admin = require('firebase-admin')

var serviceAccount = require("../../test-ml-xmen-firebase-adminsdk-gxhzi-34ea004d3d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-ml-xmen.firebaseio.com"
});

// const databaseConfigs = require('../../../environment').firestore.database
const databaseConfigs = {
    apiKey: "AIzaSyBiFma81MN4nFrvfTg-Q1qY2ZemZ4Cd9pI",
    authDomain: "test-ml-xmen.firebaseapp.com",
    databaseURL: "https://test-ml-xmen.firebaseio.com",
    projectId: "test-ml-xmen",
    storageBucket: "test-ml-xmen.appspot.com",
    messagingSenderId: "251655188106"
};

const initDatabase = () => {

}

class Firebase{
    /**
     *
     * @param {Object} options
     * @param {string} options.db_name - Nome do banco de dados do config para ser carregado (DEFAULT => default)
     * @param {string} options.uid - usuário para override (DEFAULT => admin)
     */
    constructor(options){
        // admin.initializeApp(databaseConfigs)
        // options = options != null ? options : {}
        // this.db_name = options.db_name
        // this.uid = "admin"
    }

    /**
     * Init Firestore
     * @param {string} uid - Usuário de acesso ou NULL (admin default)
     */
    getFirestore(){
        // initDatabase()
        return admin.firestore()
    }

    /**
     * Cria um documento no Firestore ou atualiza se o options.doc já existir
     * @param {Object} options - Options parameters
     * @param {string} options.collection - Caminho da collection
     * @param {string} options.doc - Chave do documento (NULL para chave automática)
     * @param {Object} options.payload - Objeto que será gravado na colletion
     * @param {string} options.uid - Usuário de acesso ou NULL (admin default)
     * @returns {boolean} Status
     */
    createFirestore(options){
        const collection = options.collection
        const doc = options.doc
        const payload = options.payload
        const uid = options.uid || null
        const firestore = this.getFirestore(uid)
        const firestoreDocument = doc != null ?
            firestore.collection(collection).doc(doc).set(payload) : firestore.collection(collection).doc().set(payload)

        return firestoreDocument.then(response => {
            return response
        }).catch(error => {
            console.log("Create Firestore Error:")
            console.log(options)
            console.log(error)
            return false
        })
    }

    readFirestore(options) {
        const collection = options.collection;
        const doc = options.doc;
        const uid = options.uid || null;
        const firestore = this.getFirestore(uid);
        // const firestoreDocument =  firestore.collection(collection).doc(doc).get()

        return firestore.collection(collection).doc(doc).get().then(response => {
            return response.data();
        }).catch(error => {
            console.log("Read Firestore Error:");
            console.log(options);
            console.log(error);
            return false;
        });
    }

    deleteFirestore(options){
        const collection = options.collection
        const doc = options.doc
        const uid = options.uid || null
        const firestore = this.getFirestore(uid)
        const firestoreDocument = firestore.collection(collection).doc(doc).delete()

        return firestoreDocument.then(response => {
            return response
        }).catch(error => {
            console.log("Create Firestore Error:")
            console.log(options)
            console.log(error)
            return false
        })
    }

}

export default Firebase