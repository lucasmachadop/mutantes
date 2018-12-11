import firebase from './firebase'

const database = new firebase()

exports.verifyAndSaveDna = async (dna) => {
    let isMutant = await module.exports.isMutant(dna)
    database.createFirestore({ collection: 'dna', doc: dna.join(''),
        payload: {dna,isMutant} })
    return isMutant
}

exports.isMutant = async (dna) => {
    var horizotalSeqs = [[],[],[],[],[],[]]
    var verticalSeqs = []

    for (let seqIndex = 0; seqIndex < dna.length; seqIndex++) {
        let verticalSeq = dna[seqIndex]
        let verticalSeqArr = []
        for (let index = 0; index < verticalSeq.length; index++) {
            let base = verticalSeq.charAt(index)
            horizotalSeqs[index].push(base)
            verticalSeqArr.push(base)
        }
        verticalSeqs.push(verticalSeqArr)
    }

    var v = verticalSeqs
    var obliqueSeqs =
        [[v[0][2],v[1][3],v[2][4],v[3][5]],
            [v[0][1],v[1][2],v[2][3],v[3][4],v[4][5]],
            [v[0][0],v[1][1],v[2][2],v[3][3],v[4][4],v[5][5]],
            [v[1][0],v[2][1],v[3][2],v[4][3],v[5][4]],
            [v[2][0],v[3][1],v[4][2],v[5][3]]]

    var mergedSeqs = horizotalSeqs.concat(obliqueSeqs).concat(verticalSeqs)
    //console.log("merged: "+JSON.stringify(mergedSeqs))

    var nrSeqsSameBase = 0
    for (let i = 0; i < mergedSeqs.length; i++) {
        let sequence = mergedSeqs[i]
        let lastBase
        let nrTimesSameBaseInSeq = 0

        for (let j = 0; j < sequence.length; j++) {
            let base = sequence[j]

            if (!lastBase || lastBase === base){
                nrTimesSameBaseInSeq++

                if (nrTimesSameBaseInSeq === 4) {
                    nrSeqsSameBase++
                    if (nrSeqsSameBase > 1) return true
                    break
                }
            }else{
                nrTimesSameBaseInSeq = 1
            }

            lastBase = base
        }
    }

    return false
}

exports.getStats = async () => {
    var dnaRef = database.getFirestore().collection('dna');
    var mutant_dna = await dnaRef.where('isMutant','==',true).get()
    var human_dna = await dnaRef.where('isMutant','==',false).get()
    return {count_mutant_dna:mutant_dna.size,count_human_dna:human_dna.size,
        ratio:(mutant_dna.size/human_dna.size)}
}