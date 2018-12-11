const admin = require('firebase-admin')

var serviceAccount = require("../../test-ml-xmen-firebase-adminsdk-gxhzi-34ea004d3d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-ml-xmen.firebaseio.com"
});

class Firebase{
    getFirestore(){
        return admin.firestore()
    }

    createDoc(options){
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
}

export default Firebase